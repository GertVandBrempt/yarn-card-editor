import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.css',
})
export class ImageUploadComponent {
  @Input() imageUrl: string | undefined = undefined;
  @Output() imageUrlChange = new EventEmitter<string | undefined>();

  isDragOver = false;
  error: string | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.processFile(file);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(): void {
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.processFile(file);
    }
  }

  removeImage(): void {
    this.imageUrl = undefined;
    this.imageUrlChange.emit(undefined);
  }

  private processFile(file: File): void {
    if (!file.type.startsWith('image/')) {
      this.error = 'Please select an image file.';
      return;
    }
    this.error = null;

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUri = e.target?.result as string;
      this.imageUrl = dataUri;
      this.imageUrlChange.emit(dataUri);
    };
    reader.readAsDataURL(file);
  }
}
