import { Component, OnInit, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { CardSetService } from '../../services/card-set.service';
import { ImportExportService } from '../../services/import-export.service';
import { CardSet } from '../../models/card-set.model';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {
  activeSet = signal<CardSet | null>(null);
  setId = signal('');
  /** True when viewport is < 768px (mobile) */
  isMobile = signal(typeof window !== 'undefined' && window.innerWidth < 768);
  /** Whether the mobile sidebar drawer is open */
  sidebarOpen = signal(false);

  /** Export/import status messages */
  exportStatus = signal<string | null>(null);
  importStatus = signal<string | null>(null);
  importError = signal<string | null>(null);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cardSetService: CardSetService,
    private importExportService: ImportExportService
  ) {}

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('setId') ?? '';
    this.setId.set(id);
    if (id) {
      const set = await this.cardSetService.getSet(id);
      this.activeSet.set(set ?? null);
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.isMobile.set(window.innerWidth < 768);
    if (!this.isMobile()) {
      // Desktop/tablet: ensure drawer state is reset
      this.sidebarOpen.set(false);
    }
  }

  toggleSidebar(): void {
    this.sidebarOpen.update(v => !v);
  }

  closeSidebar(): void {
    this.sidebarOpen.set(false);
  }

  navigateToList(): void {
    this.router.navigate(['/sets', this.setId()]);
    if (this.isMobile()) this.closeSidebar();
  }

  navigateToNewCard(type: string): void {
    this.router.navigate(['/sets', this.setId(), 'cards', 'new'], {
      queryParams: { type },
    });
    if (this.isMobile()) this.closeSidebar();
  }

  backToSets(): void {
    this.router.navigate(['/sets']);
    if (this.isMobile()) this.closeSidebar();
  }

  // ── Export ────────────────────────────────────────────

  async exportSet(): Promise<void> {
    const id = this.setId();
    if (!id) return;

    this.exportStatus.set('Exporting...');
    this.importError.set(null);

    try {
      const { json, fileName } = await this.importExportService.exportSet(id);
      this.importExportService.downloadJson(json, fileName);
      this.exportStatus.set('Exported!');
      setTimeout(() => this.exportStatus.set(null), 2000);
    } catch (e) {
      this.exportStatus.set('Export failed');
      setTimeout(() => this.exportStatus.set(null), 3000);
    }
  }

  // ── Import ────────────────────────────────────────────

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

    // Ask whether to import as new set or replace current
    const currentSet = this.activeSet();
    let replaceExisting = false;

    if (currentSet) {
      const choice = confirm(
        `Import "${result.data.set.name}" (${result.data.cards.length} cards).\n\n` +
        `OK = Replace current set "${currentSet.name}"\n` +
        `Cancel = Import as a new set`
      );
      replaceExisting = choice;
    }

    this.importStatus.set('Importing...');

    try {
      if (replaceExisting && currentSet) {
        await this.importExportService.replaceExistingSet(this.setId(), result.data);
        // Refresh the active set info
        const refreshed = await this.cardSetService.getSet(this.setId());
        this.activeSet.set(refreshed ?? null);
        this.importStatus.set('Replaced!');
      } else {
        const newId = await this.importExportService.importAsNewSet(result.data);
        this.importStatus.set('Imported!');
        // Navigate to the new set
        this.router.navigate(['/sets', newId]);
      }

      setTimeout(() => this.importStatus.set(null), 2000);
    } catch (e) {
      this.importStatus.set(null);
      this.importError.set('Import failed. Please try again.');
    }
  }

  dismissImportError(): void {
    this.importError.set(null);
  }
}
