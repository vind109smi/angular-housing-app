import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Housing } from '../housing';
import { HousingLocation } from '../housing-location/housing-location';
import { HousingDetailModal } from '../housing-detail-modal/housing-detail-modal';
import { RealtorProfileModal } from '../realtor-profile-modal/realtor-profile-modal';
import { MortgageCalculator } from '../mortgage-calculator/mortgage-calculator';
import { debounceTime, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { FilterCriteria, HomeModel, Realtor } from '../interfaces/home.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HousingLocation,
    HousingDetailModal,
    RealtorProfileModal,
    MortgageCalculator,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, AfterViewInit {
  title = 'WELCOME HOME';
  filterText = '';
  homes: HomeModel[] = [];
  filteredHomes: HomeModel[] = [];
  selectedHome: HomeModel | null = null;
  showModal = false;

  // new props
  selectedRealtor: Realtor | null = null;
  showRealtorModal = false;

  // new sorting/filtering
  minPrice: number | null = null;
  maxPrice: number | null = null;
  minBeds: number | null = null;
  homeType = 'any';
  sortOption = 'priceAsc'; // default should be ascending
  uniqueHomeTypes: string[] = [];

  // destroy
  private destroy$ = new Subject<void>();
  // privateService = inject(Housing); // WHY I CANT USE THIS

  @ViewChild('myForm') form!: NgForm;

  constructor(
    private housing: Housing,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.housing.getHomes().subscribe((homes) => {
      this.homes = [...homes];

      // apply unique home types
      this.uniqueHomeTypes = Array.from(
        new Set(this.homes.map((h) => h.type))
      ).sort();

      // reset all filters every load
      this.filterText = '';
      this.minPrice = null;
      this.maxPrice = null;
      this.minBeds = null;
      this.homeType = 'any';
      this.sortOption = 'priceAsc';

      this.filteredHomes = this.housing.filterHomes(homes, this.getCriteria()); // initial load (should show grid gallery)
      // manual change detection trigger
      this.cdr.markForCheck();
    });
  }

  ngAfterViewInit() {
    this.form.valueChanges
      ?.pipe(
        debounceTime(300),
        // tap((data) => console.log(data)),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.filteredHomes = this.housing.filterHomes(
          this.homes,
          this.getCriteria()
        );
      });

    // do we apply cdr? we load the data after subscribe when typing it.
    this.cdr.markForCheck();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // returning criteria object to resolve issues on this.housing.filterHomes() passing params
  private getCriteria(): FilterCriteria {
    return {
      filterText: this.filterText,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      minBeds: this.minBeds,
      homeType: this.homeType,
      sortOption: this.sortOption,
    };
  }

  filterHomes(event?: Event) {
    event?.preventDefault();

    // Calling housing service's filterHomes
    this.filteredHomes = this.housing.filterHomes(
      this.homes,
      this.getCriteria()
    );
  }

  openDetails(home: HomeModel) {
    this.selectedHome = home;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedHome = null;
  }

  openRealtorModal(realtor: Realtor) {
    this.selectedRealtor = realtor;
    this.showRealtorModal = true;
  }

  closeRealtorModal() {
    this.showRealtorModal = false;
  }

  //resetting
  resetFilters() {
    this.filterText = '';
    this.minPrice = null;
    this.maxPrice = null;
    this.minBeds = null;
    this.homeType = 'any'; // default option
    this.sortOption = 'priceAsc'; // default option
    this.filteredHomes = this.housing.filterHomes(
      this.homes,
      this.getCriteria()
    );

    // scroll to top on reset
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // visit the more page
  viewMore(): void {
    this.router.navigate(['/more']); // Navigate to the "more" route
  }
}
