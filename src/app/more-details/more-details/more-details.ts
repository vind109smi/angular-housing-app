import { Component } from '@angular/core';

@Component({
  selector: 'app-more-details',
  imports: [],
  templateUrl: './more-details.html',
  styleUrl: './more-details.scss',
  standalone: true,
})
export class MoreDetails {
  constructor() {}
  detailsInfo = 'See more details in the near future';
}
