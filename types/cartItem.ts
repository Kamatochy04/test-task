import { UserInfo } from "store/formSlice";
import { City } from "./city";

export interface CartItem {
  id: number;
  name: string;
  manufacturer: string;
  price: number;
  imageUrl: string;
}

export interface DocumentType {
  carts: CartItem[];
  city: City;
  userInfo: UserInfo;
}
