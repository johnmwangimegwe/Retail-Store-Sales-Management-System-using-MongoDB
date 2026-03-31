import { Book, Customer, Order } from "./types";

export const initialBooks: Book[] = [
  {
    _id: "1", book_id: "LR_VDQAAQBAJ", title: "Bestsellers", subtitle: "Top Fiction of the Year",
    authors: ["Ivan King", "bestsellers"], publisher: "bestsellers", published_date: "2015-03-15",
    description: "A curated collection of the year's most popular fiction titles spanning multiple genres.",
    page_count: 70, categories: "Young Adult Fiction", average_rating: 3.5, ratings_count: 12,
    language: "en", list_price: 12.99, currency: "USD", buyable: true,
    thumbnail: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop"
  },
  {
    _id: "2", book_id: "xGY_DAAAQBAJ", title: "The Art of Programming",
    authors: ["Donald Knuth"], publisher: "Addison-Wesley", published_date: "2011-01-01",
    description: "A comprehensive overview of fundamental algorithms and data structures in programming.",
    page_count: 672, categories: "Computers", average_rating: 4.8, ratings_count: 230,
    language: "en", list_price: 59.99, currency: "USD", buyable: true,
    thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910auj7?w=200&h=300&fit=crop"
  },
  {
    _id: "3", book_id: "kLRe3AAAQBAJ", title: "Modern Web Development",
    authors: ["Sarah Chen", "Mike Torres"], publisher: "O'Reilly Media", published_date: "2022-06-10",
    description: "Learn modern web development with React, Node.js, and MongoDB.",
    page_count: 420, categories: "Computers", average_rating: 4.2, ratings_count: 85,
    language: "en", list_price: 44.99, currency: "USD", buyable: true,
    thumbnail: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=200&h=300&fit=crop"
  },
  {
    _id: "4", book_id: "pQ2RDAAAQBAJ", title: "The Great Adventure",
    authors: ["Emily Brontë"], publisher: "Penguin Classics", published_date: "1847-12-01",
    description: "A timeless tale of passion and adventure set in the English countryside.",
    page_count: 340, categories: "Fiction", average_rating: 4.5, ratings_count: 1200,
    language: "en", list_price: 9.99, currency: "USD", buyable: true,
    thumbnail: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200&h=300&fit=crop"
  },
  {
    _id: "5", book_id: "rT4SDAAAQBAJ", title: "Cocina Mexicana Tradicional",
    authors: ["Carlos García"], publisher: "Editorial Mexicana", published_date: "2020-09-01",
    description: "Authentic Mexican recipes passed down through generations.",
    page_count: 280, categories: "Cooking", average_rating: 4.7, ratings_count: 56,
    language: "es", list_price: 24.99, currency: "USD", buyable: false,
    thumbnail: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=200&h=300&fit=crop"
  },
  {
    _id: "6", book_id: "uV6TDAAAQBAJ", title: "Data Science Handbook",
    authors: ["Alex Johnson"], publisher: "Springer", published_date: "2023-01-20",
    description: "A practical guide to data science, machine learning, and analytics.",
    page_count: 550, categories: "Computers", average_rating: 4.0, ratings_count: 34,
    language: "en", list_price: 49.99, currency: "USD", buyable: true,
    thumbnail: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=200&h=300&fit=crop"
  },
  {
    _id: "7", book_id: "wX8UDAAAQBAJ", title: "Le Petit Prince Revisited",
    authors: ["Marie Dubois"], publisher: "Gallimard", published_date: "2019-04-12",
    description: "A modern retelling of the classic tale for contemporary readers.",
    page_count: 120, categories: "Fiction", average_rating: 4.3, ratings_count: 78,
    language: "fr", list_price: 14.99, currency: "USD", buyable: true,
    thumbnail: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=300&fit=crop"
  },
  {
    _id: "8", book_id: "yZ0VDAAAQBAJ", title: "Introduction to Psychology",
    authors: ["Dr. James Wilson"], publisher: "McGraw-Hill", published_date: "2021-08-15",
    description: "A comprehensive introduction to the field of psychology.",
    page_count: 600, categories: "Psychology", average_rating: 3.9, ratings_count: 145,
    language: "en", list_price: 39.99, currency: "USD", buyable: true,
    thumbnail: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=200&h=300&fit=crop"
  },
];

export const initialCustomers: Customer[] = [
  { _id: "c1", customer_id: "CUST001", name: "John Smith", email: "john@example.com", phone: "+1-555-0101", city: "New York" },
  { _id: "c2", customer_id: "CUST002", name: "Jane Doe", email: "jane@example.com", phone: "+1-555-0102", city: "Los Angeles" },
  { _id: "c3", customer_id: "CUST003", name: "Bob Wilson", email: "bob@example.com", phone: "+1-555-0103", city: "Chicago" },
];

export const initialOrders: Order[] = [
  {
    _id: "o1", order_id: "ORD001", customer_id: "CUST001", customer_name: "John Smith",
    order_date: "2024-01-15", items: [{ book_id: "LR_VDQAAQBAJ", title: "Bestsellers", quantity: 1, price: 12.99 }],
    total_amount: 12.99, payment_method: "Credit Card", status: "delivered"
  },
  {
    _id: "o2", order_id: "ORD002", customer_id: "CUST002", customer_name: "Jane Doe",
    order_date: "2024-02-20", items: [{ book_id: "xGY_DAAAQBAJ", title: "The Art of Programming", quantity: 1, price: 59.99 }, { book_id: "kLRe3AAAQBAJ", title: "Modern Web Development", quantity: 2, price: 44.99 }],
    total_amount: 149.97, payment_method: "PayPal", status: "shipped"
  },
  {
    _id: "o3", order_id: "ORD003", customer_id: "CUST003", customer_name: "Bob Wilson",
    order_date: "2024-03-01", items: [{ book_id: "pQ2RDAAAQBAJ", title: "The Great Adventure", quantity: 1, price: 9.99 }],
    total_amount: 9.99, payment_method: "Credit Card", status: "pending"
  },
];
