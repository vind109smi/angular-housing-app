import { Component, Input } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './housing-location.html',
  styleUrl: './housing-location.scss',
})
export class HousingLocation {
  @Input() home!: { city: string; image: string; price: number };
}
