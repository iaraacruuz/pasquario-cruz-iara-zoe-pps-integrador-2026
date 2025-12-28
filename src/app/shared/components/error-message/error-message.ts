import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-message',
  imports: [CommonModule],
  templateUrl: './error-message.html',
  styleUrl: './error-message.scss',
  standalone: true
})
export class ErrorMessageComponent {
  @Input() message: string = '';
  @Input() type: 'error' | 'success' | 'warning' | 'info' = 'error';
  @Input() dismissible: boolean = true;
  @Output() dismiss = new EventEmitter<void>();

  onDismiss() {
    this.dismiss.emit();
  }

  get iconName(): string {
    switch (this.type) {
      case 'error': return 'alert-circle';
      case 'success': return 'checkmark-circle';
      case 'warning': return 'warning';
      case 'info': return 'information-circle';
      default: return 'alert-circle';
    }
  }
}
