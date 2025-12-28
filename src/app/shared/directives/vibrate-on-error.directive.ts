import { Directive, HostListener, Input } from '@angular/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

@Directive({
  selector: '[appVibrateOnError]',
  standalone: true
})
export class VibrateOnErrorDirective {
  @Input() appVibrateOnError: boolean = false;

  @HostListener('click')
  async onClick() {
    if (this.appVibrateOnError) {
      await this.vibrate();
    }
  }

  private async vibrate() {
    try {
      await Haptics.impact({ style: ImpactStyle.Heavy });
    } catch (error) {
      console.error('Error al vibrar:', error);
    }
  }
}
