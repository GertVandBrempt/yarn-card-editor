import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CardSetService } from '../../services/card-set.service';
import { ImportExportService } from '../../services/import-export.service';
import { CardSet } from '../../models/card-set.model';

@Component({
  selector: 'app-set-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './set-selector.component.html',
  styleUrl: './set-selector.component.css',
})
export class SetSelectorComponent implements OnInit {
  sets = signal<CardSet[]>([]);
  newSetName = '';
  loading = signal(true);
  error = signal<string | null>(null);
  importStatus = signal<string | null>(null);
  importError = signal<string | null>(null);

  constructor(
    private cardSetService: CardSetService,
    private importExportService: ImportExportService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const sets = await this.cardSetService.getAllSets();
      this.sets.set(sets.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)));
    } catch (e) {
      this.error.set('Failed to load card sets. Please refresh.');
    } finally {
      this.loading.set(false);
    }
  }

  async createSet(): Promise<void> {
    const name = this.newSetName.trim();
    if (!name) return;

    const newSet = this.cardSetService.createNewSet(name);
    await this.cardSetService.saveSet(newSet);
    this.newSetName = '';
    await this.router.navigate(['/sets', newSet.id]);
  }

  openSet(set: CardSet): void {
    this.router.navigate(['/sets', set.id]);
  }

  async deleteSet(set: CardSet, event: MouseEvent): Promise<void> {
    event.stopPropagation();
    if (!confirm(`Delete set "${set.name}"? This cannot be undone.`)) return;

    await this.cardSetService.deleteSet(set.id);
    this.sets.update((sets) => sets.filter((s) => s.id !== set.id));
  }

  async importSet(): Promise<void> {
    this.importError.set(null);
    this.importStatus.set(null);

    const file = await this.importExportService.openFilePicker();
    if (!file) return;

    this.importStatus.set('Validating...');

    const result = await this.importExportService.readAndValidate(file);

    if (!result.valid || !result.data) {
      this.importStatus.set(null);
      this.importError.set(result.errors.join('\n'));
      return;
    }

    this.importStatus.set('Importing...');

    try {
      const newId = await this.importExportService.importAsNewSet(result.data);
      this.importStatus.set('Imported!');
      setTimeout(() => {
        this.importStatus.set(null);
        this.router.navigate(['/sets', newId]);
      }, 800);
    } catch {
      this.importStatus.set(null);
      this.importError.set('Import failed. Please try again.');
    }
  }

  dismissImportError(): void {
    this.importError.set(null);
  }
}
