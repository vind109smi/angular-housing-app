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

  selectedRealtor: Realtor | null = null;
  showRealtorModal = false;

  minPrice: number | null = null;
  maxPrice: number | null = null;
  minBeds: number | null = null;
  homeType = 'any';
  sortOption = 'priceAsc';
  uniqueHomeTypes: string[] = [];

  private destroy$ = new Subject<void>();

  @ViewChild('myForm') form!: NgForm;

  constructor(
    private housing: Housing,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.housing.getHomes().subscribe((homes) => {
      this.homes = [...homes];

      this.uniqueHomeTypes = Array.from(
        new Set(this.homes.map((h) => h.type))
      ).sort();

      this.filterText = '';
      this.minPrice = null;
      this.maxPrice = null;
      this.minBeds = null;
      this.homeType = 'any';
      this.sortOption = 'priceAsc';

      this.filteredHomes = this.housing.filterHomes(homes, this.getCriteria());
      this.cdr.markForCheck();
    });
  }

  ngAfterViewInit() {
    this.form.valueChanges
      ?.pipe(debounceTime(1000), takeUntil(this.destroy$))
      .subscribe(() => {
        this.filteredHomes = this.housing.filterHomes(
          this.homes,
          this.getCriteria()
        );
      });

    this.cdr.markForCheck();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

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

  resetFilters() {
    this.filterText = '';
    this.minPrice = null;
    this.maxPrice = null;
    this.minBeds = null;
    this.homeType = 'any';
    this.sortOption = 'priceAsc';
    this.filteredHomes = this.housing.filterHomes(
      this.homes,
      this.getCriteria()
    );

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  viewMore(): void {
    this.router.navigate(['/more']);
  }
}
