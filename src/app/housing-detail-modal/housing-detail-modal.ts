import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-housing-detail-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './housing-detail-modal.html',
  styleUrl: './housing-detail-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush, // for optimization
})
export class HousingDetailModal {
  @Input() home: any;
  @Input() visible = false;
  @Input() childOpen = false; // <- reflects if realtor modal is open

  @Output() close = new EventEmitter<void>();
  @Output() viewRealtor = new EventEmitter<any>();

  get monthlyPayment(): number {
    if (!this.home?.price) return 0;
    const principal = this.home.price - this.home.price * 0.2;
    const rate = 0.06 / 12;
    return (principal * rate) / (1 - Math.pow(1 + rate, -360));
  }

  get downPayment(): number {
    return this.home?.price * 0.2;
  }

  onClose(): void {
    if (!this.childOpen) {
      // uses external flag
      this.close.emit();
    }
  }

  openRealtorProfile(realtor: any) {
    this.viewRealtor.emit(realtor);
  }
}
