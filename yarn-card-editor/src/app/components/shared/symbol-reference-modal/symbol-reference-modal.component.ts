import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SymbolEntry {
  syntax: string;
  description: string;
  iconId: string;  // SVG symbol id, e.g. 'icon-damage'
}

export const SYMBOL_ENTRIES: SymbolEntry[] = [
  { syntax: '<damage>', description: 'Deal damage to a target', iconId: 'icon-damage' },
  { syntax: '<shield>', description: 'Gain a shield / armor token', iconId: 'icon-shield' },
  { syntax: '<heal>', description: 'Restore life points', iconId: 'icon-heal' },
  { syntax: '<scout>', description: 'Scout ahead (look at hidden cards)', iconId: 'icon-scout' },
  { syntax: '<gain-action>', description: 'Gain an additional action', iconId: 'icon-gain-action' },
  { syntax: '<reveal-character>', description: 'Reveal a Character card', iconId: 'icon-reveal-character' },
  { syntax: '<reveal-item>', description: 'Reveal an Item card', iconId: 'icon-reveal-item' },
];

@Component({
  selector: 'app-symbol-reference-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './symbol-reference-modal.component.html',
  styleUrl: './symbol-reference-modal.component.css',
})
export class SymbolReferenceModalComponent {
  @Input() isOpen = false;
  @Output() closed = new EventEmitter<void>();

  symbols = SYMBOL_ENTRIES;

  close(): void {
    this.closed.emit();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isOpen) {
      this.close();
    }
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close();
    }
  }

  /**
   * Returns inline SVG markup for a given icon ID, using the embedded SVG defs
   * from PreviewService (the same defs used in the live preview iframe).
   * Falls back to a '?' text label if no matching icon exists.
   */
  getIconSvg(iconId: string): string {
    const known = [
      'icon-damage', 'icon-shield', 'icon-heal', 'icon-reveal-character', 'icon-reveal-item',
    ];
    if (known.includes(iconId)) {
      return `<svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><use href="#${iconId}"/></svg>`;
    }
    // icon-scout and icon-gain-action have no variant file yet — show '?' placeholder
    return '<span class="icon-placeholder">?</span>';
  }
}
