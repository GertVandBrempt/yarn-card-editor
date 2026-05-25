import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScriptCard, TurnEntry, ScriptMode } from '../../../models';

// Script cards: no triggers, no actions — turn schedule only (§per-type table APP.md)
// Preview unavailable until script baseline accepted (see Known Design Gaps in APP.md)

@Component({
  selector: 'app-script-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './script-form.component.html',
  styleUrl: './script-form.component.css',
})
export class ScriptFormComponent implements OnChanges {
  @Input() card!: ScriptCard;
  @Output() cardChange = new EventEmitter<ScriptCard>();

  local!: ScriptCard;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['card']) {
      this.local = { ...this.card, turns: [...(this.card.turns ?? [])] };
    }
  }

  onTitleChange(title: string): void { this.local = { ...this.local, title }; this.emit(); }
  onSubtitleChange(subtitle: string): void { this.local = { ...this.local, subtitle }; this.emit(); }
  onModeChange(mode: ScriptMode): void { this.local = { ...this.local, mode }; this.emit(); }
  onLoopFromTurnChange(n: number): void { this.local = { ...this.local, loopFromTurn: n }; this.emit(); }

  addTurn(): void {
    const newTurn: TurnEntry = { genericEventCount: 1, fatedEvent: 'none' };
    this.local = { ...this.local, turns: [...this.local.turns, newTurn] };
    this.emit();
  }

  removeTurn(index: number): void {
    this.local = { ...this.local, turns: this.local.turns.filter((_, i) => i !== index) };
    this.emit();
  }

  moveTurnUp(index: number): void {
    if (index <= 0) return;
    const turns = [...this.local.turns];
    [turns[index - 1], turns[index]] = [turns[index], turns[index - 1]];
    this.local = { ...this.local, turns };
    this.emit();
  }

  moveTurnDown(index: number): void {
    if (index >= this.local.turns.length - 1) return;
    const turns = [...this.local.turns];
    [turns[index], turns[index + 1]] = [turns[index + 1], turns[index]];
    this.local = { ...this.local, turns };
    this.emit();
  }

  onTurnGenericCountChange(index: number, count: number): void {
    this.updateTurn(index, { genericEventCount: count });
  }

  onTurnFatedEventChange(index: number, fatedEvent: string): void {
    this.updateTurn(index, { fatedEvent });
  }

  private updateTurn(index: number, patch: Partial<TurnEntry>): void {
    const turns = this.local.turns.map((t, i) => i === index ? { ...t, ...patch } : t);
    this.local = { ...this.local, turns };
    this.emit();
  }

  private emit(): void {
    this.cardChange.emit({ ...this.local });
  }
}
