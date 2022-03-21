export type PopularFilters = {
  title: string;
  name: string;
};

export type Hotel = {
  id: number;
  name: string;
  location?: string;
  alt?: string;
  booked?: Booked;
  image?: string;
  price?: string;
};

export type Booked = string[];
