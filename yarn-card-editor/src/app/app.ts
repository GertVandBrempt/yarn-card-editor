import {
  Component,
  signal,
  computed,
  inject,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
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

export interface Card {
  id: string;
  type: CardType;
  tier: string;
  title: string;
  subtitle: string;
  flavourText: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  // Type-specific (stored flat for v1)
  onReveal?: string;
  onEnter?: string;
  onLeave?: string;
  alignment?: string;
  initiative?: number;
  characterPhaseEffect?: string;
  passiveEffect?: string;
  actionText?: string;
  act?: number;
  mandatory?: boolean;
  scriptMode?: string;
  role?: string;
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

  @ViewChild('previewFrame') previewFrame!: ElementRef<HTMLIFrameElement>;

  readonly cardTypes = CARD_TYPES;

  // ── Card list state ──
  cards = signal<Card[]>([]);
  selectedCardId = signal<string | null>(null);

  // ── Form signals ──
  formType = signal<CardType>('location');
  formTier = signal<string>('generic');
  formTitle = signal<string>('');
  formSubtitle = signal<string>('');
  formFlavourText = signal<string>('');
  formImageUrl = signal<string>('');

  // Type-specific
  formOnReveal = signal<string>('');
  formOnEnter = signal<string>('');
  formOnLeave = signal<string>('');
  formAlignment = signal<string>('friendly');
  formInitiative = signal<number>(1);
  formCharacterPhase = signal<string>('');
  formPassiveEffect = signal<string>('');
  formActionText = signal<string>('');
  formAct = signal<number>(1);
  formMandatory = signal<boolean>(false);
  formScriptMode = signal<string>('timed');
  formRole = signal<string>('constitution');

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

  // ── Internal preview state ──
  private baselineCache = new Map<string, string>();
  private currentBaselineHtml = '';
  private viewInitialized = false;
  private pendingPreviewRender = false;

  // ──────────────────────────────────────────────
  // Lifecycle
  // ──────────────────────────────────────────────

  ngOnInit(): void {
    this.loadCards();
  }

  ngAfterViewInit(): void {
    this.viewInitialized = true;
    // Trigger initial baseline load
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
  // Form field setters (all call renderPreview after)
  // ──────────────────────────────────────────────

  setTitle(v: string): void {
    this.formTitle.set(v);
    this.renderPreview();
  }
  setSubtitle(v: string): void {
    this.formSubtitle.set(v);
  }
  setFlavourText(v: string): void {
    this.formFlavourText.set(v);
  }
  setImageUrl(v: string): void {
    this.formImageUrl.set(v);
  }
  setOnReveal(v: string): void {
    this.formOnReveal.set(v);
  }
  setOnEnter(v: string): void {
    this.formOnEnter.set(v);
  }
  setOnLeave(v: string): void {
    this.formOnLeave.set(v);
  }
  setAlignment(v: string): void {
    this.formAlignment.set(v);
  }
  setInitiative(v: string): void {
    this.formInitiative.set(parseInt(v, 10) || 1);
  }
  setCharacterPhase(v: string): void {
    this.formCharacterPhase.set(v);
  }
  setPassiveEffect(v: string): void {
    this.formPassiveEffect.set(v);
  }
  setActionText(v: string): void {
    this.formActionText.set(v);
  }
  setAct(v: string): void {
    this.formAct.set(parseInt(v, 10) || 1);
  }
  setMandatory(v: boolean): void {
    this.formMandatory.set(v);
  }
  setScriptMode(v: string): void {
    this.formScriptMode.set(v);
  }
  setRole(v: string): void {
    this.formRole.set(v);
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
      this.renderPreview();
      return;
    }

    this.previewLoading.set(true);

    this.http.get(url, { responseType: 'text' }).subscribe({
      next: (html) => {
        this.baselineCache.set(url, html);
        this.currentBaselineHtml = html;
        this.previewLoading.set(false);
        this.renderPreview();
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

  private renderPreview(): void {
    if (!this.viewInitialized || !this.previewFrame?.nativeElement) {
      this.pendingPreviewRender = true;
      return;
    }

    const html = this.currentBaselineHtml;
    if (!html) return;

    let injected = html;

    // Inject title
    const title = this.formTitle() || 'Card Title';
    injected = injected.replace(
      /(<div class="card-title"[^>]*>)\s*[^<]*/,
      `$1${escapeHtml(title)}`
    );

    // Inject type band label
    const typeLabel = getTypeDisplayLabel(this.formType(), this.formTier());
    injected = injected.replace(
      /(<span class="type-label">)\s*[^<]*/,
      `$1${escapeHtml(typeLabel)}`
    );

    this.previewFrame.nativeElement.srcdoc = injected;
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
      // storage full
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
    this.formOnReveal.set('');
    this.formOnEnter.set('');
    this.formOnLeave.set('');
    this.formAlignment.set('friendly');
    this.formInitiative.set(1);
    this.formCharacterPhase.set('');
    this.formPassiveEffect.set('');
    this.formActionText.set('');
    this.formAct.set(1);
    this.formMandatory.set(false);
    this.formScriptMode.set('timed');
    this.formRole.set('constitution');
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
    this.formOnReveal.set(card.onReveal ?? '');
    this.formOnEnter.set(card.onEnter ?? '');
    this.formOnLeave.set(card.onLeave ?? '');
    this.formAlignment.set(card.alignment ?? 'friendly');
    this.formInitiative.set(card.initiative ?? 1);
    this.formCharacterPhase.set(card.characterPhaseEffect ?? '');
    this.formPassiveEffect.set(card.passiveEffect ?? '');
    this.formActionText.set(card.actionText ?? '');
    this.formAct.set(card.act ?? 1);
    this.formMandatory.set(card.mandatory ?? false);
    this.formScriptMode.set(card.scriptMode ?? 'timed');
    this.formRole.set(card.role ?? 'constitution');

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
      onReveal: this.formOnReveal(),
      onEnter: this.formOnEnter(),
      onLeave: this.formOnLeave(),
      alignment: this.formAlignment(),
      initiative: this.formInitiative(),
      characterPhaseEffect: this.formCharacterPhase(),
      passiveEffect: this.formPassiveEffect(),
      actionText: this.formActionText(),
      act: this.formAct(),
      mandatory: this.formMandatory(),
      scriptMode: this.formScriptMode(),
      role: this.formRole(),
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
      input.value = ''; // reset so same file can be re-imported
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
