export interface Voluntary {
  id: string;
  company: string;
  name: string;
  location: string;
  startDate: Date;
  endDate: Date;
  description: string;
  reward: number;
}

export interface Location {
  locationId: string;
  street: string;
  city: string;
  number: string;
}
