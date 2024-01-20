export interface Voluntary {
  id: string;
  company: string;
  name: string;
  location: Location;
  startDate: string;
  endDate: string;
  description: string;
  reward: number;
}

export interface Location {
  id: string;
  street: string;
  city: string;
  number: string;
}

export interface FilterComp {
  label?: string;
  placeholder?: string;
  type?: string;
}
