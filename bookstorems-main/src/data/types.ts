export interface Book {
  _id: string;
  book_id: string;
  title: string;
  subtitle?: string;
  authors: string[];
  publisher?: string;
  published_date?: string;
  description?: string;
  page_count?: number;
  categories?: string;
  average_rating?: number;
  ratings_count?: number;
  language?: string;
  list_price?: number;
  currency?: string;
  buyable?: boolean;
  thumbnail?: string;
  preview_link?: string;
  info_link?: string;
}

export interface Customer {
  _id: string;
  customer_id: string;
  name: string;
  email: string;
  phone?: string;
  city?: string;
}

export interface OrderItem {
  book_id: string;
  title: string;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  order_id: string;
  customer_id: string;
  customer_name: string;
  order_date: string;
  items: OrderItem[];
  total_amount: number;
  payment_method: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
}
