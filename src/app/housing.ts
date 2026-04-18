import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FilterCriteria, HomeModel } from './interfaces/home.model';
import { HttpClient } from '@angular/common/http'; // need to implement http client to make calls from backend

@Injectable({
  providedIn: 'root',
})
export class Housing {
  // apply in memory data inside service
  private homes = [
    {
      city: 'Lehigh, PA',
      image: 'assets/colonial_house.webp',
      price: 600000,
      description:
        'Classic colonial architecture with elegant stone façade and modernized interiors. 4 beds, 3 baths, large backyard.',
      realtor: {
        name: 'Sarah Thompson',
        experience: 12,
        specialties: ['Colonial homes', 'Historic properties'],
        phone: '(555) 234-9087',
        email: 'sarah.thompson@realestate.com',
        rating: 4.2,
        image: 'assets/brunette-lady.png', // will do later
        reviews: [
          ' Sarah was an amazing realtor all the way, helping with our home experience',
          'Mrs.Thompson has demonstrated great professionalism and dedication throughout our home buying process.',
          'Ideally good experience, however she gave expensive hourly rate and she would less often responde to text and emails',
          'Horrible woman, when I called her, she hung up few times then one day rudely dismissed my request and I cancelled our appointment. Evil witch, do not take her',
        ],
      },
      type: 'colonial',
      listedOn: '2022-07-15',
      bedrooms: 4,
      bathrooms: 3,
      area: 2900,
    },
    {
      city: 'Miami, FL',
      image: 'assets/stucco_house.png',
      price: 720000,
      description:
        'A bright stucco home minutes from the beach with open layout, marble flooring, and a luxury poolside patio.',
      realtor: {
        name: 'Matt Smith',
        experience: 10,
        specialties: ['Beachfront expert', 'First time homies'],
        phone: '(555) 672-9901',
        email: 'matt.smith@coastalhomes.com',
        rating: 4.6,
        image: 'assets/bold-guy.png',
        reviews: [
          'Mr. Matt Smith was great dude, loves baseball and kids, also got good chat with him during our home buy. My wife and I loved his service',
          'Boring person, and sometimes does not pay attention when I ask him in person and he is on his damn phone',
          'Mr. Smith is a flat out racist, denied anything we accused him and threaten to take us to realty civil court. What load of horseshit!!',
        ],
      },
      type: 'stucco',
      listedOn: '2024-08-22',
      bedrooms: 5,
      bathrooms: 2,
      area: 2700,
    },
    {
      city: 'Sacramento, CA',
      image: 'assets/flats_house.jpg',
      price: 800000,
      description:
        'Top line amazing aerial flat with great outdoor view, interior designs, and modern slick carpenting. Amazing 4 bedroom, 2 bathroom, large kitchen, laundry storage room, garage, and backyard patio space.',
      realtor: {
        name: 'Maria Vargos',
        experience: 14,
        specialties: ['Luxury homes', 'Family-friendly properties'],
        phone: '(555) 410-3211',
        email: 'maria.vargos@caliliving.com',
        rating: 4.8,
        image: 'assets/latina-woman.png',
        reviews: [
          'Kind sweet women, would even bring a box of donuts and goodies on first meet',
          'Had hard time understanding her since she has strong hispanic accent, but overall nice woman',
          'Maria is a fun gal to have and love to hear more',
        ],
      },
      type: 'flat',
      listedOn: '2021-09-30',
      bedrooms: 4,
      bathrooms: 2,
      area: 3200,
    },
    {
      city: 'Brooklyn, NY',
      image: 'assets/condo_house.jpg',
      price: 600000,
      description:
        'Historic brownstone condo in downtown Brooklyn featuring exposed brick walls, hardwood floors, and rooftop terrace.',
      realtor: {
        name: 'Habib Aziz',
        experience: 12,
        specialties: ['Brownstones', 'Urban properties'],
        phone: '(555) 443-2999',
        email: 'habib.aziz@urbanrealty.com',
        rating: 4.6,
        reviews: [
          'Mr. Aziz is good in work, but not in communication. He lacks definition and has hard time explaining the pricing and other things.',
          'Friendly guy, but sometimes disorganized. However he is cautious',
          'Well disciplined, and studious man',
        ],
        image: 'assets/sidharth-malhotra.png',
      },
      type: 'apartment',
      listedOn: '2014-10-26',
      bedrooms: 5,
      bathrooms: 2,
      area: 1800,
    },
    {
      city: 'Dallas, TX',
      image: 'assets/tx_house.jpg',
      price: 555000,
      description:
        'Spacious ranch-style home with open floor plan, family den, and large backyard perfect for entertaining.',
      realtor: {
        name: 'John Kuratora',
        phone: '(555) 311-6543',
        email: 'john.kuratora@lonestarhomes.com',
        rating: 4.3,
      },
      type: 'ranchhouse',
      listedOn: '2025-03-28',
      bedrooms: 7,
      bathrooms: 4,
      area: 3400,
    },
    {
      city: 'Elizabeth, NJ',
      image: 'assets/single_story_house.jpg',
      price: 350000,
      description:
        'Single-story suburban home with modern kitchen, energy-efficient design, and fenced backyard garden.',
      realtor: {
        name: 'Kate Finnegan',
        experience: 10,
        specialties: ['Luxury Modern Homes', 'New Buyers'],
        phone: '(555)783-9908',
        email: 'kate.finnegan@gardenstatehomes.com',
        rating: 4.2,
        image: 'assets/hot-woman.png',
        reviews: [
          'Gorgeous, mild mannered 46 year old woman with fiery passion for her job.',
          'Kate was very helpful and responsive. She ensured to carry her mission to getting our new home!',
          'Sweet lovely woman. Love to have her at any time',
          'Often times, Mrs.Finnegan is loud and sometimes she does not speak much. She rarely answers my calls or texts. I do not like her!',
        ],
      },
      type: 'suburban',
      listedOn: '2023-11-22',
      bedrooms: 3,
      bathrooms: 2,
      area: 2600,
    },
    {
      city: 'Denver, CO',
      image: 'assets/dnvr_co_house.jpeg',
      price: 450000,
      description:
        'Cozy mountain-view home with stone fireplace, open living space, and walking distance to ski trails.',
      realtor: {
        name: 'Dan Hogel',
        experience: 6,
        specialties: ['Branding new homes', 'Mountain layout properties'],
        phone: '(555) 567-8890',
        email: 'dan.hogel@rockymountainrealty.com',
        rating: 4.1,
        image: 'assets/blonde-dude.png',
        reviews: [
          'Rarely is available, mostly ignores my calls and texts',
          'Do not fall for his scam, he says he is your brother and is with you, but he is never',
          'Mr. Hogel is good with money and setting up schedules, but not flat honest with his customers on the locking deals',
        ],
      },
      type: 'vinly',
      listedOn: '2020-12-31',
      bedrooms: 8,
      bathrooms: 4,
      area: 3400,
    },
    {
      city: 'Omaha, NE',
      image: 'assets/omaha_rainy_house.jpg',
      price: 750000,
      description:
        'Contemporary home featuring expansive glass windows, storm-resistant roofing, and state-of-the-art kitchen.',
      realtor: {
        name: 'Emily Su',
        experience: 5,
        specialties: ['Contemporary homes', 'Eco-friendly properties'],
        phone: '(555) 992-0045',
        email: 'emily.su@midwestproperties.com',
        rating: 4.7,
        image: 'assets/beautiful-asian.png',
        reviews: [
          'Great person to talk to and plus if you ask for her number, she will go out with you',
          'Mrs. Su is a great attractive woman, has two daughters of her own and lives in nice lifestyle',
          'Had one date with her and boy oh boy, great kisser',
        ],
      },
      type: 'stronghold',
      listedOn: '2022-05-25',
      bedrooms: 5,
      bathrooms: 3,
      area: 3100,
    },
    {
      city: 'Arlington, VA',
      image: 'assets/arlington_snowy_house.jpg',
      price: 800000,
      description:
        'Elegant colonial revival near the city center with 5 beds, finished basement, and landscaped front garden.',
      realtor: {
        name: 'Andrew Randson',
        phone: '(610) 222-3344',
        email: 'andy.rands@globalhomesbros.com',
        rating: 3.9,
      },
      type: 'colonial',
      listedOn: '2024-07-15',
      bedrooms: 5,
      bathrooms: 4,
      area: 3400,
    },
    {
      city: 'Tucson, AZ',
      image: 'assets/tucson_desert_house.jpg',
      price: 800000,
      description:
        'Desert-modern home with adobe accents, shaded veranda, and panoramic mountain views.',
      realtor: {
        name: 'Patrick Morano',
        phone: '(670) 235-1790',
        email: 'p.morano@westcoastrealty.com',
        rating: 4.5,
      },
      type: 'sandbox',
      listedOn: '2022-07-15',
      bedrooms: 3,
      bathrooms: 2,
      area: 2800,
    },
    {
      city: 'Columbus, OH',
      image: 'assets/columbus_house.webp',
      price: 800000,
      description:
        'Modern suburban home with two-car garage, smart lighting, and open living spaces perfect for families.',
      realtor: {
        name: 'Melissa Dolimarino',
        phone: '(675) 123-9320',
        email: 'meli.dlmrno@ohiofurnishingco.com',
        rating: 4.4,
      },
      type: 'suburban',
      listedOn: '2025-08-28',
      bedrooms: 6,
      bathrooms: 3,
      area: 3200,
    },
    {
      city: 'Dearborn, MI',
      image: 'assets/dearbon_rich_mansion.webp',
      price: 1000000,
      description:
        'Luxury mansion with marble foyer, private office, home theatre, and grand staircase design.',
      realtor: {
        name: 'Harimanu Raghavan',
        phone: '(545) 236-2299',
        email: 'hari.raghavan@missionhousing.com',
        rating: 4.6,
      },
      type: 'mansion',
      listedOn: '2025-09-21',
      bedrooms: 9,
      bathrooms: 5,
      area: 3600,
    },
  ];

  // grab homes
  getHomes(): Observable<HomeModel[]> {
    return of(this.homes); // grabbing the list of homes.
  }

  // actual filtering
  filterHomes(homes: HomeModel[], criteria: FilterCriteria): HomeModel[] {
    const text = criteria.filterText.toLowerCase().trim();

    const min = criteria.minPrice != null ? Number(criteria.minPrice) : null;
    const max = criteria.maxPrice != null ? Number(criteria.maxPrice) : null;
    const beds = criteria.minBeds != null ? Number(criteria.minBeds) : null;

    let filtered = homes.filter((home) => {
      const matchesCity = !text || home.city.toLowerCase().includes(text);

      const matchesMinPrice = min == null || home.price >= min;
      const matchesMaxPrice = max == null || home.price <= max;

      const matchesBeds = beds == null || (home.bedrooms ?? 0) >= beds;

      const matchesType =
        criteria.homeType === 'any' ||
        (home.type || '').toLowerCase() === criteria.homeType.toLowerCase();

      return (
        matchesCity &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesBeds &&
        matchesType
      );
    });

    return this.sortHomes(filtered, criteria.sortOption);
  }

  // newly refurbished method
  private sortHomes(homes: HomeModel[], sortOption: string): HomeModel[] {
    return [...homes].sort((a, b) => {
      switch (sortOption) {
        case 'priceAsc':
          return a.price - b.price;
        case 'priceDesc':
          return b.price - a.price;
        case 'ratingDesc': {
          const ra = a.realtor?.rating ?? 0;
          const rb = b.realtor?.rating ?? 0;
          return rb - ra;
        }
        case 'newest': {
          const da = new Date(a.listedOn ?? 0).getTime();
          const db = new Date(b.listedOn ?? 0).getTime();
          return db - da;
        }
        default:
          return 0;
      }
    });
  }
}
