import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinner',
  imports: [CommonModule],
  templateUrl: './spinner.html',
  styleUrl: './spinner.scss',
  standalone: true
})
export class SpinnerComponent {
  @Input() message: string = 'Cargando...';
  @Input() showLogo: boolean = true;
}
