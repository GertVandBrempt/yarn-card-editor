import {
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
export class CardPreviewComponent implements OnChanges, OnDestroy {
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
    if (!this.isMobileFlag) {
      this.previewScale.set(1);
      return;
    }
    const wrapper = this.previewWrapper?.nativeElement;
    if (!wrapper) return;
    const availableWidth = wrapper.clientWidth;
    // Card design width is 375px
    const scale = Math.min(1, (availableWidth - 16) / 375);
    this.previewScale.set(scale);
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
