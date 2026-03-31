import { useStore } from "@/data/store";
import StatCard from "@/components/StatCard";
import { BookOpen, Users, ShoppingCart, DollarSign, Check, X, FileText, PenTool } from "lucide-react";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

export default function DashboardPage() {
  const { books, customers, orders } = useStore();

  const totalBooks = books.length;
  const uniqueAuthors = new Set(books.flatMap((b) => b.authors)).size;
  const totalCustomers = customers.length;
  const totalOrders = orders.length;
  const buyable = books.filter((b) => b.buyable).length;
  const notBuyable = totalBooks - buyable;
  const avgPrice = totalBooks ? (books.reduce((s, b) => s + (b.list_price ?? 0), 0) / totalBooks).toFixed(2) : "0";
  const avgPages = totalBooks ? Math.round(books.reduce((s, b) => s + (b.page_count ?? 0), 0) / totalBooks) : 0;

  // Category chart
  const catMap: Record<string, number> = {};
  books.forEach((b) => { const c = b.categories || "Unknown"; catMap[c] = (catMap[c] || 0) + 1; });
  const catLabels = Object.keys(catMap);
  const catData = Object.values(catMap);

  // Language chart
  const langMap: Record<string, number> = {};
  books.forEach((b) => { const l = (b.language || "unknown").toUpperCase(); langMap[l] = (langMap[l] || 0) + 1; });

  // Top publishers
  const pubMap: Record<string, number> = {};
  books.forEach((b) => { const p = b.publisher || "Unknown"; pubMap[p] = (pubMap[p] || 0) + 1; });
  const topPubs = Object.entries(pubMap).sort((a, b) => b[1] - a[1]).slice(0, 5);

  const colors = ["#d4922a", "#2d3748", "#e88c3a", "#4a5568", "#f6ad55", "#718096", "#ed8936", "#a0aec0"];

  return (
    <div className="page-container">
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-muted-foreground mb-8">Overview of your bookstore analytics</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Books" value={totalBooks} icon={<BookOpen className="h-5 w-5" />} />
        <StatCard label="Authors" value={uniqueAuthors} icon={<PenTool className="h-5 w-5" />} />
        <StatCard label="Customers" value={totalCustomers} icon={<Users className="h-5 w-5" />} />
        <StatCard label="Orders" value={totalOrders} icon={<ShoppingCart className="h-5 w-5" />} />
        <StatCard label="Buyable" value={buyable} icon={<Check className="h-5 w-5" />} color="text-success" />
        <StatCard label="Not Available" value={notBuyable} icon={<X className="h-5 w-5" />} color="text-destructive" />
        <StatCard label="Avg Price" value={`$${avgPrice}`} icon={<DollarSign className="h-5 w-5" />} />
        <StatCard label="Avg Pages" value={avgPages} icon={<FileText className="h-5 w-5" />} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border rounded-xl p-6">
          <h2 className="font-semibold mb-4 text-lg">Books by Category</h2>
          <Bar data={{
            labels: catLabels,
            datasets: [{ label: "Books", data: catData, backgroundColor: colors.slice(0, catLabels.length), borderRadius: 6 }],
          }} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
        <div className="bg-card border rounded-xl p-6">
          <h2 className="font-semibold mb-4 text-lg">Books by Language</h2>
          <Pie data={{
            labels: Object.keys(langMap),
            datasets: [{ data: Object.values(langMap), backgroundColor: colors }],
          }} options={{ responsive: true }} />
        </div>
        <div className="bg-card border rounded-xl p-6">
          <h2 className="font-semibold mb-4 text-lg">Top 5 Publishers</h2>
          <Bar data={{
            labels: topPubs.map(([n]) => n),
            datasets: [{ label: "Books", data: topPubs.map(([, c]) => c), backgroundColor: "#d4922a", borderRadius: 6 }],
          }} options={{ indexAxis: "y", responsive: true, plugins: { legend: { display: false } } }} />
        </div>
        <div className="bg-card border rounded-xl p-6">
          <h2 className="font-semibold mb-4 text-lg">Availability</h2>
          <Doughnut data={{
            labels: ["Buyable", "Not Available"],
            datasets: [{ data: [buyable, notBuyable], backgroundColor: ["#48bb78", "#e53e3e"], borderWidth: 0 }],
          }} options={{ responsive: true, cutout: "60%" }} />
        </div>
      </div>
    </div>
  );
}
