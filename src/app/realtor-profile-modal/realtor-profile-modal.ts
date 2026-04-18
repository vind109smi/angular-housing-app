import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Realtor } from '../interfaces/home.model';

@Component({
  selector: 'app-realtor-profile-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './realtor-profile-modal.html',
  styleUrl: './realtor-profile-modal.scss',
})
export class RealtorProfileModal {
  @Input() realtor: Realtor | null = null; // either we have realtor or set to null
  @Input() visible = false;
  @Output() close = new EventEmitter<void>();

  getRealtorImage(): string {
    return this.realtor?.image || 'assets/default-realtor.png';
  }
}
