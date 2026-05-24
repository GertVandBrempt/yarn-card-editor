import {
  Component,
  signal,
  computed,
  inject,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────

export type CardType =
  | 'persona'
  | 'location'
  | 'character'
  | 'item'
  | 'event'
  | 'quest-main'
  | 'quest-side'
  | 'script';

export type TriggerType =
  | 'on-reveal'
  | 'on-enter'
  | 'on-leave'
  | 'character-phase'
  | 'on-complete'
  | 'on-flow-marker';

export type TrackType =
  | 'basic'
  | 'multi-turn'
  | 'multi-use'
  | 'and'
  | 'or'
  | 'use';

export interface TriggerEntry {
  id: string;
  triggerType: TriggerType;
  effect: string; // raw effect syntax string
}

export interface ActionEntry {
  id: string;
  trackType: TrackType;
  effect: string; // raw effect syntax string
}

export interface Card {
  id: string;
  type: CardType;
  tier: string;
  title: string;
  subtitle: string;
  flavourText: string;
  imageUrl: string; // base64 data URI or empty
  createdAt: string;
  updatedAt: string;
  // Type-specific
  passiveEffect?: string;
  alignment?: string;
  initiative?: number;
  act?: number;
  mandatory?: boolean;
  scriptMode?: string;
  role?: string;
  triggers?: TriggerEntry[];
  actions?: ActionEntry[];
}

// ──────────────────────────────────────────────
// Constants
// ──────────────────────────────────────────────

const CARD_TYPES = [
  {
    value: 'location' as CardType,
    label: 'Location',
    tiers: [
      { value: 'generic', label: 'Generic' },
      { value: 'setpiece', label: 'Setpiece' },
    ],
  },
  {
    value: 'character' as CardType,
    label: 'Character',
    tiers: [
      { value: 'friendly', label: 'Friendly / Neutral' },
      { value: 'enemy', label: 'Enemy' },
      { value: 'main', label: 'Main Character' },
    ],
  },
  {
    value: 'item' as CardType,
    label: 'Item',
    tiers: [
      { value: 'generic', label: 'Generic' },
      { value: 'key', label: 'Key Item' },
    ],
  },
  {
    value: 'event' as CardType,
    label: 'Event',
    tiers: [
      { value: 'generic', label: 'Generic' },
      { value: 'fated', label: 'Fated Event' },
    ],
  },
  {
    value: 'quest-main' as CardType,
    label: 'Quest — Main',
    tiers: [],
  },
  {
    value: 'quest-side' as CardType,
    label: 'Quest — Side',
    tiers: [
      { value: 'side', label: 'Side Quest' },
      { value: 'key', label: 'Key Quest' },
    ],
  },
  {
    value: 'persona' as CardType,
    label: 'Persona',
    tiers: [
      { value: 'generic', label: 'Non-Core' },
      { value: 'core', label: 'Core Persona' },
    ],
  },
  {
    value: 'script' as CardType,
    label: 'Script',
    tiers: [],
  },
] as const;

const TRIGGER_TYPES: { value: TriggerType; label: string }[] = [
  { value: 'on-reveal', label: 'On Reveal' },
  { value: 'on-enter', label: 'On Enter' },
  { value: 'on-leave', label: 'On Leave' },
  { value: 'character-phase', label: 'Character Phase' },
  { value: 'on-complete', label: 'On Complete' },
  { value: 'on-flow-marker', label: 'On Flow Marker' },
];

const TRACK_TYPES: { value: TrackType; label: string }[] = [
  { value: 'basic', label: 'Basic' },
  { value: 'multi-turn', label: 'Multi-turn' },
  { value: 'multi-use', label: 'Multi-use' },
  { value: 'and', label: 'AND' },
  { value: 'or', label: 'OR' },
  { value: 'use', label: 'Use' },
];

// Card types that support triggers
const TRIGGER_TYPES_FOR: Partial<Record<CardType, true>> = {
  location: true,
  character: true,
  event: true,
  item: true,
  'quest-main': true,
  'quest-side': true,
};

// Card types that support actions
const ACTION_TYPES_FOR: Partial<Record<CardType, true>> = {
  location: true,
  character: true,
  item: true,
  persona: true,
};

const BASELINE_MAP: Partial<Record<CardType, Record<string, string>>> = {
  location: {
    generic: 'design/variants/location-v01.html',
    setpiece: 'design/variants/location-setpiece-v01.html',
  },
  character: {
    friendly: 'design/variants/char-friendly-v02.html',
    enemy: 'design/variants/char-enemy-v01.html',
    main: 'design/variants/char-main-v01.html',
  },
  item: {
    generic: 'design/variants/item-v01.html',
    key: 'design/variants/item-key-v01.html',
  },
  event: {
    generic: 'design/variants/event-v01.html',
    fated: 'design/variants/event-fated-v01.html',
  },
  'quest-main': { '': 'design/variants/quest-main-v02.html' },
  'quest-side': {
    side: 'design/variants/quest-side-v01.html',
    key: 'design/variants/quest-side-v01.html',
  },
  persona: {
    generic: 'design/BASELINE.html',
    core: 'design/BASELINE.html',
  },
  // script: no baseline yet
};

// Inline icon SVG symbol definitions (self-contained, no external file needed)
const ICON_SYMBOLS = `
<symbol id="icon-damage" viewBox="0 0 24 24">
  <polygon points="12,2 13.4,8.2 17.8,4.5 15.6,10.3 22,10.8 16.9,14.2 19.6,20.1 13.2,17 12,23 10.5,17.1 4.2,20.5 6.7,14.4 1,11.2 7.5,10.2 5,4.8 10.7,8.1"
    fill="#f0c030" stroke="#a08000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</symbol>
<symbol id="icon-shield" viewBox="0 0 24 24">
  <path d="M12 2 L20 5 L20 12 Q20 19 12 22 Q4 19 4 12 L4 5 Z"
    fill="#4090e0" stroke="#205098" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</symbol>
<symbol id="icon-heal" viewBox="0 0 24 24">
  <path d="M12,21.5 C12,21.5 2,14 2,8 C2,4.5 4.5,2 7.5,2 C9.5,2 11,3 12,4.5 C13,3 14.5,2 16.5,2 C19.5,2 22,4.5 22,8 C22,14 12,21.5 12,21.5 Z"
    fill="#e84020" stroke="#901808" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</symbol>
<symbol id="icon-scout" viewBox="0 0 24 24">
  <path d="M2,12 C5,6 19,6 22,12 C19,18 5,18 2,12 Z M12,12 m-3,0 a3,3 0 1,0 6,0 a3,3 0 1,0 -6,0"
    fill="#40c8d0" fill-rule="evenodd" stroke="#207880" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="12" cy="12" r="3" fill="#1a0e04"/>
</symbol>
<symbol id="icon-gain-action" viewBox="0 0 24 24">
  <polygon points="14,2 8,13 13,13 10,22 16,11 11,11"
    fill="#f0c030" stroke="#b08000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</symbol>
<symbol id="icon-reveal-character" viewBox="0 0 24 24">
  <rect x="6" y="5" width="13" height="16" rx="1.5" fill="#a89e18" stroke="#807800" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>
  <rect x="2" y="2" width="13" height="16" rx="1.5" fill="#d4cc30" stroke="#807800" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>
  <circle cx="8.5" cy="7.5" r="1.8" fill="#1a0e04"/>
  <path d="M5.5 14.5 Q5.5 11 8.5 11 Q11.5 11 11.5 14.5" fill="#1a0e04" stroke="none"/>
</symbol>
<symbol id="icon-reveal-item" viewBox="0 0 24 24">
  <rect x="6" y="5" width="13" height="16" rx="1.5" fill="#206070" stroke="#186080" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>
  <rect x="2" y="2" width="13" height="16" rx="1.5" fill="#40a0c0" stroke="#186080" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>
  <polygon points="8.5,6.5 11,10 8.5,14 6,10" fill="#1a0e04" stroke="none"/>
</symbol>
`;

function getBaselineUrl(type: CardType, tier: string): string | null {
  const typeMap = BASELINE_MAP[type];
  if (!typeMap) return null;
  return typeMap[tier] ?? typeMap[''] ?? null;
}

function getTypeDisplayLabel(type: CardType, tier: string): string {
  switch (type) {
    case 'persona':
      return 'Persona';
    case 'location':
      return tier === 'setpiece' ? 'Setpiece' : 'Location';
    case 'character':
      if (tier === 'enemy') return 'Enemy';
      if (tier === 'main') return 'Main Character';
      return 'Character';
    case 'item':
      return tier === 'key' ? 'Key Item' : 'Item';
    case 'event':
      return tier === 'fated' ? 'Fated Event' : 'Event';
    case 'quest-main':
      return 'Main Quest';
    case 'quest-side':
      return tier === 'key' ? 'Key Quest' : 'Side Quest';
    case 'script':
      return 'Script';
  }
}

const STORAGE_KEY = 'yarn-cards-v1';

// ──────────────────────────────────────────────
// Effect parsing helpers
// ──────────────────────────────────────────────

const ICON_IDS = [
  'damage',
  'shield',
  'heal',
  'scout',
  'gain-action',
  'reveal-character',
  'reveal-item',
];

/**
 * Parse raw effect syntax into HTML for preview.
 * Syntax: <iconname> optionally followed by [modifier]
 * Example: "Deal <damage>[2] to each enemy" →
 *   "Deal <span class="eff-icon-group">
 *     <svg width="18" height="18"><use href="#icon-damage"/></svg>
 *     <span class="eff-mod">2</span>
 *   </span> to each enemy"
 */
function parseEffectText(raw: string): string {
  if (!raw) return '';
  // Build regex that matches <iconname> optionally followed by [modifier]
  const iconPattern = ICON_IDS.map((id) => id.replace('-', '\\-')).join('|');
  const re = new RegExp(
    `<(${iconPattern})>(?:\\[([^\\]]*)])?`,
    'gi'
  );
  const escaped = escapeHtml(raw);
  // We need to work on raw (pre-escaped) and escape pieces as we go
  let result = '';
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  re.lastIndex = 0;
  while ((match = re.exec(raw)) !== null) {
    // Text before this match — escape it
    result += escapeHtml(raw.slice(lastIndex, match.index));
    const iconId = match[1].toLowerCase();
    const modifier = match[2];
    result += `<span class="eff-icon-group"><svg width="18" height="18" style="vertical-align:middle;display:inline-block"><use href="#icon-${iconId}"/></svg>`;
    if (modifier !== undefined && modifier !== '') {
      result += `<span class="eff-mod">${escapeHtml(modifier)}</span>`;
    }
    result += `</span>`;
    lastIndex = match.index + match[0].length;
  }
  result += escapeHtml(raw.slice(lastIndex));
  return result;
  void escaped; // suppress unused warning
}

// ──────────────────────────────────────────────
// Component
// ──────────────────────────────────────────────

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, AfterViewInit {
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);

  @ViewChild('previewFrame') previewFrame!: ElementRef<HTMLIFrameElement>;
  @ViewChild('imageDropZone') imageDropZone?: ElementRef<HTMLDivElement>;

  readonly cardTypes = CARD_TYPES;
  readonly triggerTypes = TRIGGER_TYPES;
  readonly trackTypes = TRACK_TYPES;

  // ── Card list state ──
  cards = signal<Card[]>([]);
  selectedCardId = signal<string | null>(null);

  // ── Form signals — base ──
  formType = signal<CardType>('location');
  formTier = signal<string>('generic');
  formTitle = signal<string>('');
  formSubtitle = signal<string>('');
  formFlavourText = signal<string>('');
  formImageUrl = signal<string>(''); // base64 data URI

  // Type-specific base
  formPassiveEffect = signal<string>('');
  formAlignment = signal<string>('friendly');
  formInitiative = signal<number>(1);
  formAct = signal<number>(1);
  formMandatory = signal<boolean>(false);
  formScriptMode = signal<string>('timed');
  formRole = signal<string>('constitution');

  // ── Triggers & Actions ──
  formTriggers = signal<TriggerEntry[]>([]);
  formActions = signal<ActionEntry[]>([]);

  // ── Image drag state ──
  imageDragOver = signal<boolean>(false);

  // ── Preview state ──
  previewLoading = signal<boolean>(false);
  previewError = signal<string>('');
  showScriptPlaceholder = signal<boolean>(false);

  // ── Computed ──
  currentTiers = computed(() => {
    const ct = CARD_TYPES.find((t) => t.value === this.formType());
    return (ct?.tiers as ReadonlyArray<{ value: string; label: string }>) ?? [];
  });

  currentTypeLabel = computed(() =>
    getTypeDisplayLabel(this.formType(), this.formTier())
  );

  filteredCards = computed(() => this.cards());

  showTriggersSection = computed(
    () => !!TRIGGER_TYPES_FOR[this.formType()]
  );

  showActionsSection = computed(
    () => !!ACTION_TYPES_FOR[this.formType()]
  );

  // ── Internal preview state ──
  private baselineCache = new Map<string, string>();
  private currentBaselineHtml = '';
  private viewInitialized = false;
  private renderScheduled = false;

  // ──────────────────────────────────────────────
  // Lifecycle
  // ──────────────────────────────────────────────

  ngOnInit(): void {
    this.loadCards();
  }

  ngAfterViewInit(): void {
    this.viewInitialized = true;
    this.loadBaseline(this.formType(), this.formTier());
  }

  // ──────────────────────────────────────────────
  // Type / Tier selection
  // ──────────────────────────────────────────────

  setType(type: CardType): void {
    this.formType.set(type);
    const ct = CARD_TYPES.find((t) => t.value === type);
    const tiers = ct?.tiers as ReadonlyArray<{ value: string; label: string }>;
    const firstTier = tiers?.[0]?.value ?? '';
    this.formTier.set(firstTier);
    this.currentBaselineHtml = '';
    this.loadBaseline(type, firstTier);
  }

  setTier(tier: string): void {
    this.formTier.set(tier);
    this.currentBaselineHtml = '';
    this.loadBaseline(this.formType(), tier);
  }

  // ──────────────────────────────────────────────
  // Form field setters — all call scheduleRender
  // ──────────────────────────────────────────────

  setTitle(v: string): void { this.formTitle.set(v); this.scheduleRender(); }
  setSubtitle(v: string): void { this.formSubtitle.set(v); this.scheduleRender(); }
  setFlavourText(v: string): void { this.formFlavourText.set(v); this.scheduleRender(); }
  setPassiveEffect(v: string): void { this.formPassiveEffect.set(v); this.scheduleRender(); }
  setAlignment(v: string): void { this.formAlignment.set(v); this.scheduleRender(); }
  setInitiative(v: string): void { this.formInitiative.set(parseInt(v, 10) || 1); this.scheduleRender(); }
  setAct(v: string): void { this.formAct.set(parseInt(v, 10) || 1); this.scheduleRender(); }
  setMandatory(v: boolean): void { this.formMandatory.set(v); this.scheduleRender(); }
  setScriptMode(v: string): void { this.formScriptMode.set(v); this.scheduleRender(); }
  setRole(v: string): void { this.formRole.set(v); this.scheduleRender(); }

  // ──────────────────────────────────────────────
  // Image upload
  // ──────────────────────────────────────────────

  onImageFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) this.readImageFile(file);
    input.value = '';
  }

  onImageDragOver(event: DragEvent): void {
    event.preventDefault();
    this.imageDragOver.set(true);
  }

  onImageDragLeave(): void {
    this.imageDragOver.set(false);
  }

  onImageDrop(event: DragEvent): void {
    event.preventDefault();
    this.imageDragOver.set(false);
    const file = event.dataTransfer?.files?.[0];
    if (file && file.type.startsWith('image/')) {
      this.readImageFile(file);
    }
  }

  clearImage(): void {
    this.formImageUrl.set('');
    this.scheduleRender();
  }

  private readImageFile(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.formImageUrl.set(e.target?.result as string);
      this.scheduleRender();
      this.cdr.detectChanges();
    };
    reader.readAsDataURL(file);
  }

  // ──────────────────────────────────────────────
  // Triggers
  // ──────────────────────────────────────────────

  addTrigger(): void {
    const entry: TriggerEntry = {
      id: generateId(),
      triggerType: 'on-reveal',
      effect: '',
    };
    this.formTriggers.update((t) => [...t, entry]);
    this.scheduleRender();
  }

  removeTrigger(id: string): void {
    this.formTriggers.update((t) => t.filter((e) => e.id !== id));
    this.scheduleRender();
  }

  setTriggerType(id: string, type: TriggerType): void {
    this.formTriggers.update((triggers) =>
      triggers.map((t) => (t.id === id ? { ...t, triggerType: type } : t))
    );
    this.scheduleRender();
  }

  setTriggerEffect(id: string, effect: string): void {
    this.formTriggers.update((triggers) =>
      triggers.map((t) => (t.id === id ? { ...t, effect } : t))
    );
    this.scheduleRender();
  }

  triggerLabel(type: TriggerType): string {
    return TRIGGER_TYPES.find((t) => t.value === type)?.label ?? type;
  }

  // ──────────────────────────────────────────────
  // Actions
  // ──────────────────────────────────────────────

  addAction(): void {
    const entry: ActionEntry = {
      id: generateId(),
      trackType: 'basic',
      effect: '',
    };
    this.formActions.update((a) => [...a, entry]);
    this.scheduleRender();
  }

  removeAction(id: string): void {
    this.formActions.update((a) => a.filter((e) => e.id !== id));
    this.scheduleRender();
  }

  setActionTrackType(id: string, type: TrackType): void {
    this.formActions.update((actions) =>
      actions.map((a) => (a.id === id ? { ...a, trackType: type } : a))
    );
    this.scheduleRender();
  }

  setActionEffect(id: string, effect: string): void {
    this.formActions.update((actions) =>
      actions.map((a) => (a.id === id ? { ...a, effect } : a))
    );
    this.scheduleRender();
  }

  trackLabel(type: TrackType): string {
    return TRACK_TYPES.find((t) => t.value === type)?.label ?? type;
  }

  // ──────────────────────────────────────────────
  // Baseline loading & preview rendering
  // ──────────────────────────────────────────────

  private loadBaseline(type: CardType, tier: string): void {
    const url = getBaselineUrl(type, tier);

    if (!url) {
      this.currentBaselineHtml = '';
      this.showScriptPlaceholder.set(true);
      this.previewError.set('');
      return;
    }

    this.showScriptPlaceholder.set(false);
    this.previewError.set('');

    if (this.baselineCache.has(url)) {
      this.currentBaselineHtml = this.baselineCache.get(url)!;
      this.scheduleRender();
      return;
    }

    this.previewLoading.set(true);

    this.http.get(url, { responseType: 'text' }).subscribe({
      next: (html) => {
        this.baselineCache.set(url, html);
        this.currentBaselineHtml = html;
        this.previewLoading.set(false);
        this.scheduleRender();
      },
      error: () => {
        this.previewLoading.set(false);
        this.previewError.set(
          `Could not load preview template (${url}). Check that the file exists.`
        );
        this.currentBaselineHtml = '';
      },
    });
  }

  /**
   * Debounced render: avoid hammering on every keystroke.
   */
  private scheduleRender(): void {
    if (this.renderScheduled) return;
    this.renderScheduled = true;
    setTimeout(() => {
      this.renderScheduled = false;
      this.renderPreview();
    }, 40);
  }

  private renderPreview(): void {
    if (!this.viewInitialized || !this.previewFrame?.nativeElement) return;
    const html = this.currentBaselineHtml;
    if (!html) return;

    const injected = this.injectCardData(html);
    this.previewFrame.nativeElement.srcdoc = injected;
  }

  /**
   * Inject all form fields into the baseline HTML.
   *
   * Strategy: parse the baseline HTML as a string, inject data into
   * known element patterns. This avoids iframe document access issues
   * with srcdoc and keeps rendering clean.
   */
  private injectCardData(html: string): string {
    let out = html;

    // ── 1. Inject icon symbol defs into the hidden SVG defs block ──
    // The baseline HTML has <svg style="display:none"><defs>...</defs></svg>
    // Insert icon symbols before the closing </defs>
    out = out.replace(
      /(<svg[^>]*style="display:none[^"]*"[^>]*>\s*<defs>)([\s\S]*?)(<\/defs>)/,
      `$1$2${ICON_SYMBOLS}$3`
    );

    // ── 2. Inject inline styles for effect rows into <style> block ──
    const effectStyles = `
/* Effect rows injected by editor */
.mech-sections { overflow: visible; }
.sec { display: flex; flex-direction: column; height: auto; min-height: 0; padding: 4px 6px; gap: 2px; }
.sec-passive { min-height: 10px; }
.sec-trigger { min-height: 10px; }
.sec-actions { min-height: 10px; }
.sec-leave   { min-height: 10px; }
.eff-row {
  display: flex; align-items: flex-start; gap: 5px;
  font-family: 'Crimson Text', Georgia, serif;
  font-size: 10.5px; line-height: 1.35;
  color: #d8c8a8;
  padding: 0 2px;
}
.eff-leading {
  flex-shrink: 0; display: flex; align-items: center;
  width: 20px; height: 20px; justify-content: center;
}
.eff-leading-pending {
  flex-shrink: 0; width: 20px; height: 20px;
  display: flex; align-items: center; justify-content: center;
  font-size: 9px; color: #7a6040; background: rgba(0,0,0,0.3);
  border-radius: 3px; border: 1px dashed #3a2410;
}
.eff-text { flex: 1; }
.eff-icon-group { display: inline-flex; align-items: center; gap: 2px; vertical-align: middle; }
.eff-mod {
  display: inline-block; font-family: 'Cinzel', serif; font-size: 9px;
  font-weight: 700; color: #dcc06a; line-height: 1;
  background: rgba(0,0,0,0.5); border-radius: 2px; padding: 0 2px;
}
.eff-passive-row { padding-left: 4px; }
.card-subtitle {
  position: absolute; left: 22.5px; right: 22.5px; top: 96px;
  text-align: center;
  font-family: 'Cinzel', Georgia, serif;
  font-size: 8.5px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;
  color: rgba(200,160,60,0.65);
}
.card-flavour {
  position: absolute; left: 28px; right: 28px;
  bottom: 262px;
  text-align: center;
  font-family: 'Crimson Text', Georgia, serif;
  font-size: 10px; font-style: italic; line-height: 1.4;
  color: rgba(200,175,130,0.55);
  z-index: 13;
}
.card-image-overlay {
  position: absolute; inset: 0; z-index: 1;
}
.card-image-overlay img {
  width: 100%; height: 100%; object-fit: cover;
}
`;
    out = out.replace(
      /(<\/style>)/,
      `${effectStyles}$1`
    );

    // ── 3. Inject title ──
    const title = this.formTitle() || 'Card Title';
    out = out.replace(
      /(<div class="card-title"[^>]*>)[^<]*/,
      `$1${escapeHtml(title)}`
    );

    // ── 4. Inject type band label ──
    const typeLabel = getTypeDisplayLabel(this.formType(), this.formTier());
    out = out.replace(
      /(<span class="type-label">)[^<]*/,
      `$1${escapeHtml(typeLabel)}`
    );

    // ── 5. Inject subtitle ──
    const subtitle = this.formSubtitle();
    if (subtitle) {
      out = out.replace(
        /(<div class="title-rule"[^>]*><\/div>)/,
        `$1<div class="card-subtitle">${escapeHtml(subtitle)}</div>`
      );
    }

    // ── 6. Inject flavour text ──
    const flavour = this.formFlavourText();
    if (flavour) {
      out = out.replace(
        /(<div class="mech-frame">)/,
        `<div class="card-flavour">${escapeHtml(flavour)}</div>$1`
      );
    }

    // ── 7. Inject image ──
    const imageUri = this.formImageUrl();
    if (imageUri) {
      // Replace the card-image div content with actual image
      out = out.replace(
        /(<div class="card-image">)[\s\S]*?(<\/div>)/,
        `$1<div class="card-image-overlay"><img src="${imageUri}" alt="card art"/></div>$2`
      );
    }

    // ── 8. Build mech-sections content ──
    out = out.replace(
      /<div class="mech-sections">[\s\S]*?<\/div>\s*(<div class="mech-rule mech-rule-bot">)/,
      `<div class="mech-sections">${this.buildMechSections()}</div>$1`
    );

    return out;
  }

  private buildMechSections(): string {
    const type = this.formType();
    const triggers = this.formTriggers();
    const actions = this.formActions();
    const passiveEffect = this.formPassiveEffect();

    // Separate triggers into entry (on-reveal, on-enter, character-phase, on-complete, on-flow-marker)
    // and exit (on-leave) groups
    const entryTriggers = triggers.filter(
      (t) => t.triggerType !== 'on-leave'
    );
    const exitTriggers = triggers.filter(
      (t) => t.triggerType === 'on-leave'
    );

    let passive = '';
    let triggerEntry = '';
    let actionsHtml = '';
    let triggerExit = '';

    // Passive section
    if (passiveEffect || type === 'persona' || type === 'item') {
      const rows = passiveEffect
        ? `<div class="eff-row eff-passive-row"><div class="eff-text">${parseEffectText(passiveEffect)}</div></div>`
        : '';
      passive = `<div class="sec sec-passive">${rows}</div>`;
    } else {
      passive = `<div class="sec sec-passive"></div>`;
    }

    // Entry trigger section
    if (entryTriggers.length > 0) {
      const rows = entryTriggers
        .map((t) => this.buildTriggerRow(t))
        .join('');
      triggerEntry = `<div class="sec sec-trigger">${rows}</div>`;
    } else {
      triggerEntry = `<div class="sec sec-trigger"></div>`;
    }

    // Actions section
    if (actions.length > 0) {
      const rows = actions
        .map((a) => this.buildActionRow(a))
        .join('');
      actionsHtml = `<div class="sec sec-actions">${rows}</div>`;
    } else {
      actionsHtml = `<div class="sec sec-actions"></div>`;
    }

    // Exit trigger section
    if (exitTriggers.length > 0) {
      const rows = exitTriggers
        .map((t) => this.buildTriggerRow(t))
        .join('');
      triggerExit = `<div class="sec sec-leave">${rows}</div>`;
    } else {
      triggerExit = `<div class="sec sec-leave"></div>`;
    }

    return passive + triggerEntry + actionsHtml + triggerExit;
  }

  private buildTriggerRow(t: TriggerEntry): string {
    const effectHtml = parseEffectText(t.effect);
    // Leading symbol: ⏳ Design pending placeholder per spec
    const leading = `<div class="eff-leading-pending" title="${escapeHtml(this.triggerLabel(t.triggerType))}">⏳</div>`;
    return `<div class="eff-row">${leading}<div class="eff-text">${effectHtml || `<span style="opacity:0.35;font-style:italic">${escapeHtml(this.triggerLabel(t.triggerType))}</span>`}</div></div>`;
  }

  private buildActionRow(a: ActionEntry): string {
    const effectHtml = parseEffectText(a.effect);
    // Leading: track placeholder per spec
    const leading = `<div class="eff-leading-pending" title="${escapeHtml(this.trackLabel(a.trackType))}">⏳</div>`;
    return `<div class="eff-row">${leading}<div class="eff-text">${effectHtml || `<span style="opacity:0.35;font-style:italic">${escapeHtml(this.trackLabel(a.trackType))}</span>`}</div></div>`;
  }

  // ──────────────────────────────────────────────
  // Card list management
  // ──────────────────────────────────────────────

  private loadCards(): void {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) this.cards.set(JSON.parse(raw));
    } catch {
      this.cards.set([]);
    }
  }

  private persistCards(cards: Card[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
    } catch {
      // storage full — silently ignore
    }
  }

  newCard(): void {
    this.selectedCardId.set(null);
    this.clearForm();
  }

  private clearForm(): void {
    this.formType.set('location');
    this.formTier.set('generic');
    this.formTitle.set('');
    this.formSubtitle.set('');
    this.formFlavourText.set('');
    this.formImageUrl.set('');
    this.formPassiveEffect.set('');
    this.formAlignment.set('friendly');
    this.formInitiative.set(1);
    this.formAct.set(1);
    this.formMandatory.set(false);
    this.formScriptMode.set('timed');
    this.formRole.set('constitution');
    this.formTriggers.set([]);
    this.formActions.set([]);
    this.currentBaselineHtml = '';
    this.loadBaseline('location', 'generic');
  }

  selectCard(id: string): void {
    const card = this.cards().find((c) => c.id === id);
    if (!card) return;
    this.selectedCardId.set(id);

    this.formType.set(card.type);
    this.formTier.set(card.tier);
    this.formTitle.set(card.title);
    this.formSubtitle.set(card.subtitle ?? '');
    this.formFlavourText.set(card.flavourText ?? '');
    this.formImageUrl.set(card.imageUrl ?? '');
    this.formPassiveEffect.set(card.passiveEffect ?? '');
    this.formAlignment.set(card.alignment ?? 'friendly');
    this.formInitiative.set(card.initiative ?? 1);
    this.formAct.set(card.act ?? 1);
    this.formMandatory.set(card.mandatory ?? false);
    this.formScriptMode.set(card.scriptMode ?? 'timed');
    this.formRole.set(card.role ?? 'constitution');
    this.formTriggers.set(card.triggers ? [...card.triggers] : []);
    this.formActions.set(card.actions ? [...card.actions] : []);

    this.currentBaselineHtml = '';
    this.loadBaseline(card.type, card.tier);
  }

  saveCard(): void {
    const now = new Date().toISOString();
    const id = this.selectedCardId() ?? generateId();
    const existing = this.cards().find((c) => c.id === id);

    const card: Card = {
      id,
      type: this.formType(),
      tier: this.formTier(),
      title: this.formTitle(),
      subtitle: this.formSubtitle(),
      flavourText: this.formFlavourText(),
      imageUrl: this.formImageUrl(),
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
      passiveEffect: this.formPassiveEffect(),
      alignment: this.formAlignment(),
      initiative: this.formInitiative(),
      act: this.formAct(),
      mandatory: this.formMandatory(),
      scriptMode: this.formScriptMode(),
      role: this.formRole(),
      triggers: this.formTriggers(),
      actions: this.formActions(),
    };

    const all = this.cards();
    const idx = all.findIndex((c) => c.id === id);
    const updated = idx >= 0 ? [...all] : [...all, card];
    if (idx >= 0) updated[idx] = card;

    this.cards.set(updated);
    this.selectedCardId.set(id);
    this.persistCards(updated);
  }

  deleteCard(id: string, event: MouseEvent): void {
    event.stopPropagation();
    const updated = this.cards().filter((c) => c.id !== id);
    this.cards.set(updated);
    this.persistCards(updated);
    if (this.selectedCardId() === id) {
      this.selectedCardId.set(null);
      this.clearForm();
    }
  }

  // ──────────────────────────────────────────────
  // Import / Export
  // ──────────────────────────────────────────────

  exportJson(): void {
    const json = JSON.stringify(this.cards(), null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `yarn-cards-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  importJson(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        if (Array.isArray(imported)) {
          const existing = this.cards();
          const existingIds = new Set(existing.map((c) => c.id));
          const newCards = (imported as Card[]).filter(
            (c) => !existingIds.has(c.id)
          );
          const merged = [...existing, ...newCards];
          this.cards.set(merged);
          this.persistCards(merged);
        }
      } catch {
        // Invalid JSON — silently ignore
      }
      input.value = '';
    };
    reader.readAsText(file);
  }

  // ──────────────────────────────────────────────
  // Helpers (exposed to template)
  // ──────────────────────────────────────────────

  typeDisplayLabel(type: CardType, tier: string): string {
    return getTypeDisplayLabel(type, tier);
  }
}

// ──────────────────────────────────────────────
// Utilities
// ──────────────────────────────────────────────

function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
