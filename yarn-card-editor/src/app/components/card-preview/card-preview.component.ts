import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
  signal,
  HostListener,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { PreviewService } from '../../services/preview.service';
import { AnyCard } from '../../models';

@Component({
  selector: 'app-card-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-preview.component.html',
  styleUrl: './card-preview.component.css',
})
export class CardPreviewComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() card: AnyCard | null = null;
  @ViewChild('previewFrame') previewFrame?: ElementRef<HTMLIFrameElement>;
  @ViewChild('previewWrapper') previewWrapper?: ElementRef<HTMLDivElement>;

  private platformId = inject(PLATFORM_ID);

  loading = signal(false);
  error = signal<string | null>(null);
  /** Whether the preview panel is expanded on mobile */
  previewExpanded = signal(false);
  /** Current scale factor for the card preview on mobile */
  previewScale = signal(1);

  private isMobileFlag = false;

  constructor(private previewService: PreviewService) {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobileFlag = window.innerWidth < 768;
    }
  }

  isMobileView(): boolean {
    return this.isMobileFlag;
  }

  ngAfterViewInit(): void {
    // Initial scale calculation once the view is rendered
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.updateScale(), 0);
    }
  }

  ngOnDestroy(): void {}

  @HostListener('window:resize')
  onResize(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.isMobileFlag = window.innerWidth < 768;
    this.updateScale();
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes['card'] && this.card) {
      await this.renderPreview(this.card);
    }
  }

  togglePreview(): void {
    this.previewExpanded.update(v => !v);
    // After toggle, update scale
    setTimeout(() => this.updateScale(), 50);
  }

  private updateScale(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const wrapper = this.previewWrapper?.nativeElement;
    if (!wrapper) return;
    const availableWidth = wrapper.clientWidth;
    const availableHeight = wrapper.clientHeight;
    // Card design dimensions: 375 × 525
    const cardW = 375;
    const cardH = 525;
    const padding = 16;
    const scaleByWidth = (availableWidth - padding) / cardW;
    const scaleByHeight = availableHeight > padding
      ? (availableHeight - padding) / cardH
      : scaleByWidth;
    // On mobile: scale down only (max 1); on desktop: scale to fill, constrained by both axes
    const scale = this.isMobileFlag
      ? Math.min(1, scaleByWidth)
      : Math.min(scaleByWidth, scaleByHeight);
    this.previewScale.set(Math.max(0.2, scale));
  }

  private async renderPreview(card: AnyCard): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const html = await this.previewService.renderCard(card);
      // Wait for view to render
      setTimeout(() => {
        this.writeToFrame(html);
        this.updateScale();
      }, 0);
    } catch {
      this.error.set('Preview failed to render.');
    } finally {
      this.loading.set(false);
    }
  }

  private writeToFrame(html: string): void {
    const frame = this.previewFrame?.nativeElement;
    if (!frame) return;
    const doc = frame.contentDocument ?? frame.contentWindow?.document;
    if (!doc) return;
    doc.open();
    doc.write(html);
    doc.close();
  }
}
