import { Component, OnInit, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { CardSetService } from '../../services/card-set.service';
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cardSetService: CardSetService
  ) {}

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('setId') ?? '';
    this.setId.set(id);
    if (id) {
      const set = await this.cardSetService.getSet(id);
      this.activeSet.set(set ?? null);
    }
  }

  @HostListener('window:resize', ['$event'])
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
}
