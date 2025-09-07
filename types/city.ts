export interface DeliveryOption {
  fast: number | null;
  regular: number | null;
  slow: number | null;
}

export interface City {
  id: number;
  name: string;
  delivery: DeliveryOption;
}
