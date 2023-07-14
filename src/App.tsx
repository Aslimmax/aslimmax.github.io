import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import './assets/scss/styles.scss';

import * as bootstrap from 'bootstrap';
import { ChangeEvent, useState } from 'react';

interface FormData {
  salesPrice: number;
  annualPropertyTaxAmount: number;
  principalBalance: number;
  closingDate: Date;
  listingAgentCommission: number;
  sellingAgentCommission: number;
  taxProrationAdjustment: number;
  country: string;
  city: string;
  termite: number;
  naturalHazardDisclosure: number;
  homeWarranty: number;
  hoaTransferFee: number;
  transactionCoordinator: number;
  miscellaneousOne: number;
}

const californiaCountiesAndCities = [
  {
    county: 'Imperial',
    cities: [
      'Brawley',
      'Calexico',
      'Calipatria',
      'El Centro',
      'Holtville',
      'Imperial',
      'Westmorland',
    ],
  },
  {
    county: 'Kern',
    cities: [
      'Arvin',
      'Bakersfield',
      'California City',
      'Delano',
      'Maricopa',
      'McFarland',
      'Ridgecrest',
      'Shafter',
      'Taft',
      'Tehachapi',
      'Wasco',
    ],
  },
  {
    county: 'Los Angeles',
    cities: [
      'Agoura Hills',
      'Alhambra',
      'Arcadia',
      'Artesia',
      'Avalon',
      'Azusa',
      'Baldwin Park',
      'Bell',
      'Bell Gardens',
      'Bellflower',
      'Beverly Hills',
      'Bradbury',
      'Burbank',
      'Calabasas',
      'Carson',
      'Cerritos',
      'Claremont',
      'Commerce',
      'Compton',
      'Covina',
      'Cudahy',
      'Culver City',
      'Diamond Bar',
      'Downey',
      'Duarte',
      'El Monte',
      'El Segundo',
      'Gardena',
      'Glendale',
      'Glendora',
      'Hawaiian Gardens',
      'Hawthorne',
      'Hermosa Beach',
      'Hidden Hills',
      'Huntington Park',
      'Industry',
      'Inglewood',
      'Irwindale',
      'La Canada Flintridge',
      'La Habra Heights',
      'La Mirada',
      'La Puente',
      'La Verne',
      'Lakewood',
      'Lancaster',
      'Lawndale',
      'Lomita',
      'Long Beach',
      'Los Angeles',
      'Lynwood',
      'Malibu',
      'Manhattan Beach',
      'Maywood',
      'Monrovia',
      'Montebello',
      'Monterey Park',
      'Norwalk',
      'Palmdale',
      'Palos Verdes Estates',
      'Paramount',
      'Pasadena',
      'Pico Rivera',
      'Pomona',
      'Rancho Palos Verdes',
      'Redondo Beach',
      'Rolling Hills',
      'Rolling Hills Estates',
      'Rosemead',
      'San Dimas',
      'San Fernando',
      'San Gabriel',
      'San Marino',
      'Santa Clarita',
      'Santa Fe Springs',
      'Santa Monica',
      'Sierra Madre',
      'Signal Hill',
      'South El Monte',
      'South Gate',
      'South Pasadena',
      'Temple City',
      'Torrance',
      'Vernon',
      'Walnut',
      'West Covina',
      'West Hollywood',
      'Westlake Village',
      'Whittier',
    ],
  },
  {
    county: 'Orange',
    cities: [
      'Aliso Viejo',
      'Anaheim',
      'Brea',
      'Buena Park',
      'Costa Mesa',
      'Cypress',
      'Dana Point',
      'Fountain Valley',
      'Fullerton',
      'Garden Grove',
      'Huntington Beach',
      'Irvine',
      'La Habra',
      'La Palma',
      'Laguna Beach',
      'Laguna Hills',
      'Laguna Niguel',
      'Laguna Woods',
      'Lake Forest',
      'Los Alamitos',
      'Mission Viejo',
      'Newport Beach',
      'Orange',
      'Placentia',
      'Rancho Santa Margarita',
      'San Clemente',
      'San Juan Capistrano',
      'Santa Ana',
      'Seal Beach',
      'Stanton',
      'Tustin',
      'Villa Park',
      'Westminster',
      'Yorba Linda',
    ],
  },
  {
    county: 'Riverside',
    cities: [
      'Banning',
      'Beaumont',
      'Blythe',
      'Calimesa',
      'Canyon Lake',
      'Cathedral City',
      'Coachella',
      'Corona',
      'Desert Hot Springs',
      'Eastvale',
      'Hemet',
      'Indian Wells',
      'Indio',
      'Jurupa Valley',
      'Lake Elsinore',
      'La Quinta',
      'Menifee',
      'Moreno Valley',
      'Murrieta',
      'Norco',
      'Palm Desert',
      'Palm Springs',
      'Perris',
      'Rancho Mirage',
      'Riverside',
      'San Jacinto',
      'Temecula',
      'Wildomar',
    ],
  },
  {
    county: 'San Bernardino',
    cities: [
      'Adelanto',
      'Apple Valley',
      'Barstow',
      'Big Bear Lake',
      'Chino',
      'Chino Hills',
      'Colton',
      'Fontana',
      'Grand Terrace',
      'Hesperia',
      'Highland',
      'Loma Linda',
      'Montclair',
      'Needles',
      'Ontario',
      'Rancho Cucamonga',
      'Redlands',
      'Rialto',
      'San Bernardino',
      'Twentynine Palms',
      'Upland',
      'Victorville',
      'Yucaipa',
      'Yucca Valley',
    ],
  },
  {
    county: 'San Diego',
    cities: [
      'Carlsbad',
      'Chula Vista',
      'Coronado',
      'Del Mar',
      'El Cajon',
      'Encinitas',
      'Escondido',
      'Imperial Beach',
      'La Mesa',
      'Lemon Grove',
      'National City',
      'Oceanside',
      'Poway',
      'San Diego',
      'San Marcos',
      'Santee',
      'Solana Beach',
      'Vista',
    ],
  },
  {
    county: 'San Luis Obispo',
    cities: [
      'Arroyo Grande',
      'Atascadero',
      'Grover Beach',
      'Morro Bay',
      'Paso Robles',
      'Pismo Beach',
      'San Luis Obispo',
    ],
  },
  {
    county: 'Santa Barbara',
    cities: [
      'Buellton',
      'Carpinteria',
      'Goleta',
      'Guadalupe',
      'Lompoc',
      'Santa Barbara',
      'Santa Maria',
      'Solvang',
    ],
  },
  {
    county: 'Ventura',
    cities: [
      'Camarillo',
      'Fillmore',
      'Moorpark',
      'Ojai',
      'Oxnard',
      'Port Hueneme',
      'San Buenaventura (Ventura)',
      'Santa Paula',
      'Simi Valley',
      'Thousand Oaks',
    ],
  },
];

function getListOfCities(county: string) {
  const filteredCounty = californiaCountiesAndCities.filter(
    (location) => location.county.toLowerCase() === county
  )[0];
  console.log(filteredCounty);
  return filteredCounty.cities;
}

function App() {
  const [selectedCounty, setSelectedCounty] = useState('');
  const [debitsAndCreditsMiscellaneous, setDebitsAndCreditsMiscellaneous] =
    useState(2);
  const [formData, setFormData] = useState<FormData>({
    salesPrice: 0,
    annualPropertyTaxAmount: 0,
    principalBalance: 0,
    closingDate: new Date(),
    listingAgentCommission: 0,
    sellingAgentCommission: 0,
    taxProrationAdjustment: 0,
    country: '',
    city: '',
    termite: 0,
    naturalHazardDisclosure: 0,
    homeWarranty: 0,
    hoaTransferFee: 0,
    transactionCoordinator: 0,
    miscellaneousOne: 0,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log({ name, value });
  };

  // Initialize all tooltips
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <section>
        <div className='container'>
          <h1>Net Sheet</h1>
          <form onSubmit={handleSubmit}>
            <div className='row gy-3'>
              <div className='col-12'>
                <p className='fs-3 mb-0'>Home Pricing Information</p>
              </div>
              <div className='col-xl-6'>
                <label htmlFor='salesPrice' className='form-label'>
                  Sales Price<sup className='text-danger'>*</sup>
                </label>
                <input
                  type='number'
                  className='form-control'
                  name='salesPrice'
                  id='salesPrice'
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='col-xl-6'>
                <label htmlFor='annualPropertyTaxAmount' className='form-label'>
                  Annual Property Tax Amount<sup className='text-danger'>*</sup>
                </label>
                <input
                  type='number'
                  className='form-control'
                  name='annualPropertyTaxAmount'
                  id='annualPropertyTaxAmount'
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='col-xl-6'>
                <label htmlFor='principalBalance' className='form-label'>
                  Principal Balance<sup className='text-danger'>*</sup>
                </label>
                <input
                  type='number'
                  className='form-control'
                  name='principalBalance'
                  id='principalBalance'
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='col-xl-6'>
                <label htmlFor='closingDate' className='form-label'>
                  Closing Date<sup className='text-danger'>*</sup>
                </label>
                <input
                  type='date'
                  className='form-control'
                  name='closingDate'
                  id='closingDate'
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='col-12'>
                <p className='fs-3 mb-0'>Escrow/Agent Fees</p>
              </div>
              <div className='col-xl-6'>
                <label htmlFor='listingAgentCommission' className='form-label'>
                  Listing Agent Commission<sup className='text-danger'>*</sup>
                </label>
                <input
                  type='number'
                  className='form-control'
                  name='listingAgentCommission'
                  id='listingAgentCommission'
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='col-xl-6'>
                <label htmlFor='sellingAgentCommission' className='form-label'>
                  Selling Agent Commission<sup className='text-danger'>*</sup>
                </label>
                <input
                  type='number'
                  className='form-control'
                  name='sellingAgentCommission'
                  id='sellingAgentCommission'
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='col-xl-6'>
                <label htmlFor='taxProrationAdjustment' className='form-label'>
                  Tax Proration Adjustment
                </label>
                <input
                  type='number'
                  className='form-control'
                  name='taxProrationAdjustment'
                  id='taxProrationAdjustment'
                  onChange={handleInputChange}
                />
              </div>
              <div className='col-12'>
                <p className='fs-3 mb-0'>Location</p>
              </div>
              <div className='col-xl-6'>
                <label htmlFor='county' className='form-label'>
                  County<sup className='text-danger'>*</sup>
                </label>
                <select
                  className='form-select'
                  name='county'
                  id='county'
                  value={selectedCounty}
                  onChange={(e) => setSelectedCounty(e.target.value)}
                  required
                >
                  <option disabled value=''>
                    Select a County
                  </option>
                  {californiaCountiesAndCities.map((location, idx) => {
                    return (
                      <option
                        key={idx}
                        value={location.county.toLocaleLowerCase()}
                      >
                        {location.county}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className='col-xl-6'>
                <label htmlFor='city' className='form-label'>
                  City<sup className='text-danger'>*</sup>
                </label>
                <select
                  className='form-select'
                  name='city'
                  id='city'
                  defaultValue=''
                  disabled={selectedCounty ? false : true}
                  required
                >
                  <option disabled value=''>
                    Select a City
                  </option>
                  {selectedCounty &&
                    getListOfCities(selectedCounty).map((city, idx) => {
                      return (
                        <option key={idx} value={city.toLocaleLowerCase()}>
                          {city}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className='col-12'>
                <p className='fs-3 mb-0'>Debits & Credits</p>
              </div>
              <div className='col-xl-6'>
                <label htmlFor='termite' className='form-label'>
                  Termite
                </label>
                <input
                  type='number'
                  className='form-control'
                  name='termite'
                  id='termite'
                />
              </div>
              <div className='col-xl-6'>
                <label htmlFor='naturalHazardDisclosure' className='form-label'>
                  Natural Hazard Disclosure
                </label>
                <input
                  type='number'
                  className='form-control'
                  name='naturalHazardDisclosure'
                  id='naturalHazardDisclosure'
                />
              </div>
              <div className='col-xl-6'>
                <label htmlFor='homeWarranty' className='form-label'>
                  Home Warranty
                </label>
                <input
                  type='number'
                  className='form-control'
                  name='homeWarranty'
                  id='homeWarranty'
                />
              </div>
              <div className='col-xl-6'>
                <label htmlFor='hoaTransferFee' className='form-label'>
                  HOA Transfer Fee
                </label>
                <input
                  type='number'
                  className='form-control'
                  name='hoaTransferFee'
                  id='hoaTransferFee'
                />
              </div>
              <div className='col-xl-6'>
                <label htmlFor='transactionCoordinator' className='form-label'>
                  Transaction Coordinator
                </label>
                <input
                  type='number'
                  className='form-control'
                  name='transactionCoordinator'
                  id='transactionCoordinator'
                />
              </div>
              <div className='col-xl-6'>
                <label htmlFor='miscellaneous' className='form-label'>
                  Miscellaneous
                </label>
                <input
                  type='number'
                  className='form-control'
                  name='miscellaneous'
                  id='miscellaneous'
                />
              </div>
              <div className='col-12'>
                <button type='submit' className='btn btn-primary'>
                  Calculate
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default App;
