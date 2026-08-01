export interface Review {
  id?: string;
  gearItemId?: string;
  customerId?: string;
  rating?: number;
  comment?: string;
  createdAt?: string;
  customer?: {
    id?: string;
    name?: string;
    email?: string;
  };
}
