import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  signal,
} from '@angular/core';
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
export class CardPreviewComponent implements OnChanges {
  @Input() card: AnyCard | null = null;
  @ViewChild('previewFrame') previewFrame?: ElementRef<HTMLIFrameElement>;

  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private previewService: PreviewService) {}

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes['card'] && this.card) {
      await this.renderPreview(this.card);
    }
  }

  private async renderPreview(card: AnyCard): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const html = await this.previewService.renderCard(card);
      this.writeToFrame(html);
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
