import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Effect, EffectVariant } from '../../../models';
import { SymbolReferenceModalComponent } from '../symbol-reference-modal/symbol-reference-modal.component';

export interface EffectChange {
  raw: string;     // Raw inline syntax (stored value)
  parsed: string;  // Parsed HTML for preview rendering
}

const ICON_NAMES = [
  'damage', 'shield', 'heal', 'scout', 'gain-action',
  'reveal-character', 'reveal-item',
];

@Component({
  selector: 'app-effect-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, SymbolReferenceModalComponent],
  templateUrl: './effect-editor.component.html',
  styleUrl: './effect-editor.component.css',
})
export class EffectEditorComponent implements OnChanges {
  @Input() effect: Effect = { variant: 'fixed', text: '' };
  @Input() label = 'Effect';
  @Output() effectChange = new EventEmitter<Effect>();

  rawText = '';
  parsedPreview = '';
  symbolModalOpen = false;

  variantOptions: { value: EffectVariant; label: string }[] = [
    { value: 'passive', label: 'Passive' },
    { value: 'fixed', label: 'Fixed' },
    { value: 'rolled', label: 'Rolled' },
    { value: 'complex', label: 'Complex' },
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['effect']) {
      this.rawText = this.effect.text ?? '';
      this.parsedPreview = this.parseInlineEffects(this.rawText);
    }
  }

  onTextChange(): void {
    this.parsedPreview = this.parseInlineEffects(this.rawText);
    this.emit();
  }

  onVariantChange(variant: EffectVariant): void {
    this.effect = { ...this.effect, variant };
    this.emit();
  }

  openSymbolModal(): void {
    this.symbolModalOpen = true;
  }

  closeSymbolModal(): void {
    this.symbolModalOpen = false;
  }

  private emit(): void {
    this.effectChange.emit({
      ...this.effect,
      text: this.rawText,
    });
  }

  /**
   * Parse inline `<iconname>[modifier]` syntax into HTML.
   * E.g. "Deal <damage>[2] to each enemy"
   */
  parseInlineEffects(text: string): string {
    let result = this.escapeHtml(text);

    for (const icon of ICON_NAMES) {
      // Match <iconname> optionally followed by [modifier]
      const pattern = new RegExp(`&lt;${icon}&gt;(\\[(.*?)\\])?`, 'g');
      result = result.replace(pattern, (_match, _modGroup, mod) => {
        const modHtml = mod
          ? `<span class="icon-modifier">${this.escapeHtml(mod)}</span>`
          : '';
        return `<span class="icon icon-${icon}" title="${icon}">⬡</span>${modHtml}`;
      });
    }

    return result;
  }

  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
}
