import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Book, Customer, Order } from "./types";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

interface StoreContextType {
  books: Book[];
  customers: Customer[];
  orders: Order[];
  loading: boolean;
  addBook: (book: Omit<Book, "_id">) => Promise<void>;
  updateBook: (id: string, book: Partial<Book>) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;
  addCustomer: (customer: Omit<Customer, "_id">) => Promise<void>;
  addOrder: (order: Omit<Order, "_id">) => Promise<void>;
  refreshData: () => Promise<void>;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshData = async () => {
    try {
      setLoading(true);

      const [booksRes, customersRes, ordersRes] = await Promise.all([
        fetch(`${API}/books`),
        fetch(`${API}/customers`),
        fetch(`${API}/orders`),
      ]);

      if (!booksRes.ok || !customersRes.ok || !ordersRes.ok) {
        throw new Error("Failed to fetch one or more resources");
      }

      const [booksData, customersData, ordersData] = await Promise.all([
        booksRes.json(),
        customersRes.json(),
        ordersRes.json(),
      ]);

      setBooks(booksData);
      setCustomers(customersData);
      setOrders(ordersData);
    } catch (error) {
      console.error("Error loading store data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const addBook = async (book: Omit<Book, "_id">) => {
    try {
      const payload = {
        ...book,
        authors:
          typeof book.authors === "string"
            ? book.authors.split(",").map((a) => a.trim()).filter(Boolean)
            : book.authors,
      };

      const res = await fetch(`${API}/books`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to add book");

      const newBook = await res.json();
      setBooks((prev) => [newBook, ...prev]);
    } catch (error) {
      console.error("addBook error:", error);
    }
  };

  const updateBook = async (id: string, data: Partial<Book>) => {
    try {
      const payload = {
        ...data,
        authors:
          typeof data.authors === "string"
            ? data.authors.split(",").map((a) => a.trim()).filter(Boolean)
            : data.authors,
      };

      const res = await fetch(`${API}/books/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update book");

      const updated = await res.json();
      setBooks((prev) => prev.map((b) => (b._id === id ? updated : b)));
    } catch (error) {
      console.error("updateBook error:", error);
    }
  };

  const deleteBook = async (id: string) => {
    try {
      const res = await fetch(`${API}/books/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete book");

      setBooks((prev) => prev.filter((b) => b._id !== id));
    } catch (error) {
      console.error("deleteBook error:", error);
    }
  };

  const addCustomer = async (customer: Omit<Customer, "_id">) => {
    try {
      const res = await fetch(`${API}/customers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer),
      });

      if (!res.ok) throw new Error("Failed to add customer");

      const newCustomer = await res.json();
      setCustomers((prev) => [newCustomer, ...prev]);
    } catch (error) {
      console.error("addCustomer error:", error);
    }
  };

  const addOrder = async (order: Omit<Order, "_id">) => {
    try {
      const res = await fetch(`${API}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      if (!res.ok) throw new Error("Failed to add order");

      const newOrder = await res.json();
      setOrders((prev) => [newOrder, ...prev]);
    } catch (error) {
      console.error("addOrder error:", error);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        books,
        customers,
        orders,
        loading,
        addBook,
        updateBook,
        deleteBook,
        addCustomer,
        addOrder,
        refreshData,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}