export type Hotel = {
  id: number;
  name: string;
  title?: string | null;
  alt?: string | null;
  address?: string | null;
  directions?: string | null;
  phone?: string | null;
  tollfree?: string | null;
  email?: string | null;
  fax?: string | null;
  url?: string | null;
  hours?: string | null;
  checkin?: string | null;
  checkout?: string | null;
  image?: string | null;
  image_direct_url?: string | null;
  price?: string | null;
  content?: string | null;
  geo?: Geo | null;
  activity?: string | null;
  type?: string | null;
};

export type Geo = {
  lat?: number;
  lon?: number;
};
