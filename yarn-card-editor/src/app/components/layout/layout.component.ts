import { Component, OnInit, signal } from '@angular/core';
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

  navigateToList(): void {
    this.router.navigate(['/sets', this.setId()]);
  }

  navigateToNewCard(type: string): void {
    this.router.navigate(['/sets', this.setId(), 'cards', 'new'], {
      queryParams: { type },
    });
  }

  backToSets(): void {
    this.router.navigate(['/sets']);
  }
}
