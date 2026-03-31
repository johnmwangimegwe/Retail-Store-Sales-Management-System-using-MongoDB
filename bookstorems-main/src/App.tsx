import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { StoreProvider } from "@/data/store";
import Navbar from "@/components/Navbar";
import BooksPage from "@/pages/BooksPage";
import BookDetailsPage from "@/pages/BookDetailsPage";
import BookFormPage from "@/pages/BookFormPage";
import DashboardPage from "@/pages/DashboardPage";
import AuthorsPage from "@/pages/AuthorsPage";
import CustomersPage from "@/pages/CustomersPage";
import OrdersPage from "@/pages/OrdersPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <StoreProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<BooksPage />} />
            <Route path="/books/new" element={<BookFormPage />} />
            <Route path="/books/:id" element={<BookDetailsPage />} />
            <Route path="/books/:id/edit" element={<BookFormPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/authors" element={<AuthorsPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </StoreProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
