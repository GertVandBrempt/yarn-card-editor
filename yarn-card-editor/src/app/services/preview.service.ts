import { Injectable } from '@angular/core';
import { AnyCard, CardType } from '../models';

/**
 * Maps card types to their baseline HTML template paths (relative to assets).
 * Script card has no accepted baseline yet — see Known Design Gaps in APP.md.
 */
const BASELINE_PATHS: Partial<Record<CardType, string>> = {
  persona: 'design/BASELINE.html',
  location: 'design/variants/location-v01.html',
  character: 'design/variants/char-friendly-v02.html', // default; enemy/main handled at render time
  item: 'design/variants/item-v01.html',
  event: 'design/variants/event-v01.html',
  'main-quest': 'design/variants/quest-main-v02.html',
  'side-quest': 'design/variants/quest-side-v01.html',
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

    // Base fields
    html = this.replace(html, '{{title}}', card.title || '');
    html = this.replace(html, '{{subtitle}}', card.subtitle || '');
    html = this.replace(html, '{{flavourText}}', card.flavourText || '');

    if (card.imageUrl) {
      html = this.replace(html, '{{imageUrl}}', card.imageUrl);
    }

    // Inline icon syntax: <iconname>[modifier] → span-based render
    html = this.parseInlineEffects(html);

    return html;
  }

  /**
   * Parse inline effect syntax in rendered HTML text content.
   * <iconname> → <span class="icon icon-iconname"></span>
   * [N] after icon → <span class="icon-modifier">N</span>
   */
  parseInlineEffects(text: string): string {
    // Replace <iconname> tags with icon spans (must not conflict with real HTML tags)
    const ICON_NAMES = [
      'damage', 'shield', 'heal', 'scout', 'gain-action',
      'reveal-character', 'reveal-item',
    ];

    for (const icon of ICON_NAMES) {
      const pattern = new RegExp(`&lt;${icon}&gt;(\\[(.*?)\\])?`, 'g');
      text = text.replace(pattern, (_match, _modGroup, mod) => {
        const modHtml = mod
          ? `<span class="icon-modifier">${mod}</span>`
          : '';
        return `<span class="icon icon-${icon}"></span>${modHtml}`;
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
      return `<div style="padding:2rem;text-align:center;font-size:1.2rem;">
        ⏳ Design pending — no baseline template for card type: ${card.type}
      </div>`;
    }

    return this.injectFields(template, card);
  }

  private replace(html: string, placeholder: string, value: string): string {
    return html.split(placeholder).join(value);
  }
}
