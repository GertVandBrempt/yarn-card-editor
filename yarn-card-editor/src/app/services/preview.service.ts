import { Injectable } from '@angular/core';
import { AnyCard, CardType } from '../models';

/**
 * SVG symbol definitions extracted from the latest design variants.
 *
 * Trigger symbols: trigger-symbols-v02.html (highest version)
 * Activation track: activation-track-basic-v01-a.html (only basic variant exists)
 *
 * These are embedded here so the preview iframe can use <use href="#sym-id"/>.
 */
const SVG_DEFS = `
<svg style="display:none" xmlns="http://www.w3.org/2000/svg">
<defs>
  <!-- Inline effect icons (from trigger-symbols-v02) -->
  <symbol id="icon-shield" viewBox="0 0 24 24">
    <path d="M12 2 L20 5 L20 12 Q20 19 12 22 Q4 19 4 12 L4 5 Z"
          fill="#4090e0" stroke="#205098" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </symbol>
  <symbol id="icon-damage" viewBox="0 0 24 24">
    <polygon points="12,2 13.4,8.2 17.8,4.5 15.6,10.3 22,10.8 16.9,14.2 19.6,20.1 13.2,17 12,23 10.5,17.1 4.2,20.5 6.7,14.4 1,11.2 7.5,10.2 5,4.8 10.7,8.1"
             fill="#f0c030" stroke="#a08000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </symbol>
  <symbol id="icon-heal" viewBox="0 0 24 24">
    <path d="M12 21 C9 18 3 14 3 9 C3 6 5.5 4 8 5 C10 5.8 11 7.5 12 9 C13 7.5 14 5.8 16 5 C18.5 4 21 6 21 9 C21 14 15 18 12 21 Z"
          fill="#e84020" stroke="#901808" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </symbol>
  <symbol id="icon-reveal-character" viewBox="0 0 24 24">
    <rect x="6" y="5" width="13" height="16" rx="1.5"
          fill="#a89e18" stroke="#807800" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>
    <rect x="2" y="2" width="13" height="16" rx="1.5"
          fill="#d4cc30" stroke="#807800" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="8.5" cy="7.5" r="1.8" fill="#1a0e04"/>
    <path d="M5.5 14.5 Q5.5 11 8.5 11 Q11.5 11 11.5 14.5" fill="#1a0e04" stroke="none"/>
  </symbol>
  <symbol id="icon-reveal-item" viewBox="0 0 24 24">
    <rect x="5" y="3" width="14" height="18" rx="2"
          fill="#8060c0" stroke="#503888" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>
    <line x1="8" y1="8" x2="16" y2="8" stroke="#c0a0f0" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="8" y1="12" x2="16" y2="12" stroke="#c0a0f0" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="8" y1="16" x2="13" y2="16" stroke="#c0a0f0" stroke-width="1.5" stroke-linecap="round"/>
  </symbol>
  <!-- icon-scout and icon-gain-action: no variant file — placeholder filled circle -->
  <symbol id="icon-scout" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9" fill="#6b7280"/>
    <text x="12" y="16" text-anchor="middle" font-size="10" fill="#fff" font-family="sans-serif">?</text>
  </symbol>
  <symbol id="icon-gain-action" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9" fill="#6b7280"/>
    <text x="12" y="16" text-anchor="middle" font-size="10" fill="#fff" font-family="sans-serif">?</text>
  </symbol>

  <!-- Trigger symbols — trigger-symbols-v02.html -->
  <symbol id="trig-reveal" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="5.5" fill="#1a0e04" stroke="none"/>
    <circle cx="12" cy="12" r="2.5" fill="#d4b87a" stroke="none"/>
    <line x1="12" y1="2"   x2="12" y2="6"   stroke="#1a0e04" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="12" y1="18"  x2="12" y2="22"  stroke="#1a0e04" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="2"  y1="12"  x2="6"  y2="12"  stroke="#1a0e04" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="18" y1="12"  x2="22" y2="12"  stroke="#1a0e04" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="4.93" y1="4.93"   x2="7.76" y2="7.76"   stroke="#1a0e04" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" stroke="#1a0e04" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="19.07" y1="4.93"  x2="16.24" y2="7.76"  stroke="#1a0e04" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="7.76"  y1="16.24" x2="4.93"  y2="19.07" stroke="#1a0e04" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="12"    cy="3.5"   r="1.2" fill="#d4b87a"/>
    <circle cx="12"    cy="20.5"  r="1.2" fill="#d4b87a"/>
    <circle cx="3.5"   cy="12"    r="1.2" fill="#d4b87a"/>
    <circle cx="20.5"  cy="12"    r="1.2" fill="#d4b87a"/>
    <circle cx="6.2"   cy="6.2"   r="1.2" fill="#d4b87a"/>
    <circle cx="17.8"  cy="17.8"  r="1.2" fill="#d4b87a"/>
    <circle cx="17.8"  cy="6.2"   r="1.2" fill="#d4b87a"/>
    <circle cx="6.2"   cy="17.8"  r="1.2" fill="#d4b87a"/>
  </symbol>

  <symbol id="trig-enter" viewBox="0 0 24 24">
    <path d="M3 20 L3 10 Q3 3 12 3 Q21 3 21 10 L21 20 Z" fill="#1a0e04" stroke="none"/>
    <polygon points="12,8 17.5,14 14.5,14 14.5,18 9.5,18 9.5,14 6.5,14" fill="#d4b87a" stroke="none"/>
  </symbol>

  <symbol id="trig-leave" viewBox="0 0 24 24">
    <path d="M2 9 L14 9 L14 5 L22 12 L14 19 L14 15 L2 15 Z" fill="#1a0e04" stroke="none"/>
    <rect x="4" y="10.5" width="7" height="3" rx="1" fill="#d4b87a"/>
  </symbol>

  <symbol id="trig-char-phase" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" fill="#1a0e04" stroke="none"/>
    <circle cx="12" cy="12" r="8" fill="none" stroke="#d4b87a" stroke-width="1.5"/>
    <line x1="12" y1="12" x2="8.5" y2="7"  stroke="#d4b87a" stroke-width="2" stroke-linecap="round"/>
    <line x1="12" y1="12" x2="12" y2="5"   stroke="#d4b87a" stroke-width="1.2" stroke-linecap="round"/>
    <circle cx="12" cy="12" r="1.5" fill="#d4b87a"/>
  </symbol>

  <symbol id="trig-complete" viewBox="0 0 24 24">
    <polygon points="12,2 20,6 20,18 12,22 4,18 4,6" fill="#1a0e04" stroke="none"/>
    <path d="M7.5 12 L10.5 15.5 L16.5 8.5"
          fill="none" stroke="#d4b87a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </symbol>

  <symbol id="trig-flow-marker" viewBox="0 0 24 24">
    <path d="M4 4 L15 12 L4 20 L7.5 20 L18.5 12 L7.5 4 Z" fill="#1a0e04" stroke="none"/>
    <rect x="1.5" y="9" width="3" height="6" rx="1" fill="#1a0e04"/>
    <path d="M7.5 7 L14.5 12 L7.5 17 L9.5 17 L16.5 12 L9.5 7 Z" fill="#d4b87a" stroke="none"/>
    <rect x="2" y="10" width="2" height="4" rx="0.5" fill="#d4b87a"/>
  </symbol>

  <!-- Activation track markers — activation-track-basic-v01-a.html -->
  <!-- Basic track: circle marker with exit arrow (viewBox 0 0 52 80) -->
  <symbol id="track-basic-a" viewBox="0 0 52 80">
    <circle cx="26" cy="30" r="22" fill="#1a0e04" stroke="none"/>
    <circle cx="26" cy="30" r="16" fill="none" stroke="#d4b87a" stroke-width="2" opacity="0.6"/>
    <circle cx="26" cy="30" r="9" fill="#d4b87a" stroke="none"/>
    <circle cx="26" cy="30" r="3.5" fill="#1a0e04" stroke="none"/>
    <line x1="26" y1="52" x2="26" y2="66" stroke="#1a0e04" stroke-width="2" stroke-linecap="round"/>
    <polygon points="26,72 21,63 31,63" fill="#1a0e04"/>
  </symbol>

  <!-- Fallback filled circle for undesigned track types -->
  <symbol id="track-fallback" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" fill="#1a0e04"/>
    <circle cx="12" cy="12" r="6" fill="#d4b87a"/>
  </symbol>
</defs>
</svg>`;

/**
 * Maps card types to their baseline HTML template paths (relative to assets).
 * Script card has no accepted baseline yet — see Known Design Gaps in APP.md.
 */
const BASELINE_PATHS: Partial<Record<CardType, string>> = {
  persona: 'assets/templates/persona-baseline.html',
  location: 'assets/templates/location-baseline.html',
  character: 'assets/templates/character-baseline.html',
  item: 'assets/templates/item-baseline.html',
  event: 'assets/templates/event-baseline.html',
  'main-quest': 'assets/templates/main-quest-baseline.html',
  'side-quest': 'assets/templates/side-quest-baseline.html',
};

/**
 * Maps trigger type strings to the SVG symbol IDs embedded above.
 */
const TRIGGER_SYMBOL_MAP: Record<string, string> = {
  'on-reveal': 'trig-reveal',
  'on-enter': 'trig-enter',
  'on-leave': 'trig-leave',
  'character-phase': 'trig-char-phase',
  'on-complete': 'trig-complete',
  'on-flow-marker': 'trig-flow-marker',
};

@Injectable({ providedIn: 'root' })
export class PreviewService {
  private templateCache = new Map<string, string>();

  /**
   * Load baseline HTML template for a card type.
   * Returns null if no baseline exists (e.g. Script cards).
   */
  async loadTemplate(type: CardType): Promise<string | null> {
    const path = BASELINE_PATHS[type];
    if (!path) return null;

    if (this.templateCache.has(path)) {
      return this.templateCache.get(path)!;
    }

    try {
      const response = await fetch(path);
      if (!response.ok) return null;
      const html = await response.text();
      this.templateCache.set(path, html);
      return html;
    } catch {
      return null;
    }
  }

  /**
   * Inject card field values into a baseline HTML template.
   * Returns the rendered HTML string with placeholders replaced.
   */
  injectFields(template: string, card: AnyCard): string {
    let html = template;

    // Inject SVG defs so trigger symbols and activation markers render
    html = html.replace('<body>', `<body>${SVG_DEFS}`);

    // Base fields
    html = this.replace(html, '{{title}}', this.escapeHtml(card.title || ''));
    html = this.replace(html, '{{subtitle}}', this.escapeHtml(card.subtitle || ''));
    html = this.replace(html, '{{flavourText}}', this.escapeHtml(card.flavourText || ''));

    if (card.imageUrl) {
      html = this.replace(html, '{{imageUrl}}', card.imageUrl);
    }

    // Hide empty containers per §Dynamic containers rule
    html = this.hideEmptyContainers(html, card);

    // Inline icon syntax: <iconname>[modifier] → SVG use markup
    html = this.parseInlineEffects(html);

    return html;
  }

  /**
   * Hide sections that have no content — implements the empty-container rule.
   * Uses placeholder comment markers that baseline templates should include.
   */
  private hideEmptyContainers(html: string, card: AnyCard): string {
    // If title is empty, hide the title element via class
    if (!card.title) {
      html = html.replace(/class="card-title"/g, 'class="card-title" style="display:none"');
    }
    if (!card.subtitle) {
      html = html.replace(/class="card-subtitle"/g, 'class="card-subtitle" style="display:none"');
    }
    if (!card.flavourText) {
      html = html.replace(/class="flavour-text"/g, 'class="flavour-text" style="display:none"');
    }
    return html;
  }

  /**
   * Returns the SVG trigger symbol HTML for a given trigger type ID.
   * Falls back to '?' if no symbol is defined.
   */
  getTriggerSymbolHtml(triggerType: string, size = 20): string {
    const symbolId = TRIGGER_SYMBOL_MAP[triggerType];
    if (symbolId) {
      return `<svg width="${size}" height="${size}"><use href="#${symbolId}"/></svg>`;
    }
    return `<span style="display:inline-flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;font-size:${size * 0.7}px">?</span>`;
  }

  /**
   * Returns the SVG activation track marker HTML for a given track type.
   * Falls back to a filled circle if no variant exists.
   */
  getActivationMarkerHtml(trackType: string, width = 52, height = 80): string {
    // Only basic variant exists (activation-track-basic-v01-a.html)
    if (trackType === 'basic') {
      return `<svg width="${width}" height="${height}" viewBox="0 0 52 80" preserveAspectRatio="xMidYMid meet"><use href="#track-basic-a"/></svg>`;
    }
    // All other track types — fallback filled circle
    return `<svg width="20" height="20" viewBox="0 0 24 24"><use href="#track-fallback"/></svg>`;
  }

  /**
   * Parse inline effect syntax in rendered HTML text content.
   * <iconname> → SVG <use> element referencing the embedded defs
   * [N] after icon → <span class="sym-mod">N</span>
   */
  parseInlineEffects(text: string): string {
    const ICON_NAMES = [
      'damage', 'shield', 'heal', 'scout', 'gain-action',
      'reveal-character', 'reveal-item',
    ];

    for (const icon of ICON_NAMES) {
      const pattern = new RegExp(`&lt;${icon}&gt;(\\[(.*?)\\])?`, 'g');
      text = text.replace(pattern, (_match, _modGroup, mod) => {
        const modHtml = mod
          ? `<span class="sym-mod">${this.escapeHtml(mod)}</span>`
          : '';
        return `<span class="sym-group"><svg width="16" height="16"><use href="#icon-${icon}"/></svg>${modHtml}</span>`;
      });
    }

    return text;
  }

  /**
   * Render a full preview HTML document for a card.
   * Falls back to a placeholder if no baseline template exists.
   */
  async renderCard(card: AnyCard): Promise<string> {
    const template = await this.loadTemplate(card.type);

    if (!template) {
      // Script card or missing baseline — show design pending placeholder
      return `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
        body { font-family: sans-serif; display:flex; align-items:center; justify-content:center; height:100vh; margin:0; background:#f8fafc; }
        .msg { text-align:center; color:#9ca3af; font-size:1rem; padding:2rem; }
      </style></head><body><div class="msg">⏳ Design pending — no baseline template for card type: ${card.type}</div></body></html>`;
    }

    return this.injectFields(template, card);
  }

  private replace(html: string, placeholder: string, value: string): string {
    return html.split(placeholder).join(value);
  }

  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
}
