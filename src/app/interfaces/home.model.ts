export interface HomeModel {
  city: string;
  image: string;
  price: number;
  description: string;
  realtor: Realtor;
  type: string;
  listedOn: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
}

export interface Realtor {
  name: string;
  phone: string;
  email: string;
  rating: number;
  image?: string;
  experience?: number;
  specialties?: string[];
  reviews?: string[];
}

// filter criteria
export interface FilterCriteria {
  filterText: string;
  minPrice: number | null;
  maxPrice: number | null;
  minBeds: number | null;
  homeType: string;
  sortOption: string;
}
