import { useState } from "react";
import { useStore } from "@/data/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const statusColors: Record<string, string> = {
  pending: "bg-warning text-warning-foreground",
  processing: "bg-info text-info-foreground",
  shipped: "bg-secondary text-secondary-foreground",
  delivered: "bg-success text-success-foreground",
  cancelled: "bg-destructive text-destructive-foreground",
};

export default function OrdersPage() {
  const { orders, addOrder, customers, books } = useStore();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    customer_id: "", book_id: "", quantity: "1", payment_method: "Credit Card", status: "pending" as const,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const customer = customers.find((c) => c.customer_id === form.customer_id);
    const book = books.find((b) => b.book_id === form.book_id);
    if (!customer || !book) { toast({ title: "Select valid customer and book", variant: "destructive" }); return; }
    const qty = Number(form.quantity) || 1;
    const total = (book.list_price ?? 0) * qty;
    addOrder({
      order_id: `ORD${Date.now()}`,
      customer_id: customer.customer_id,
      customer_name: customer.name,
      order_date: new Date().toISOString().split("T")[0],
      items: [{ book_id: book.book_id, title: book.title, quantity: qty, price: book.list_price ?? 0 }],
      total_amount: total,
      payment_method: form.payment_method,
      status: form.status,
    });
    toast({ title: "Order created!" });
    setShowForm(false);
  };

  return (
    <div className="page-container">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-muted-foreground mt-1">{orders.length} orders</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
          <Plus className="h-4 w-4 mr-2" /> New Order
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-card border rounded-xl p-6 mb-6 animate-fade-in space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Customer *</Label>
              <Select value={form.customer_id} onValueChange={(v) => setForm({ ...form, customer_id: v })}>
                <SelectTrigger><SelectValue placeholder="Select customer" /></SelectTrigger>
                <SelectContent>
                  {customers.map((c) => <SelectItem key={c._id} value={c.customer_id}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Book *</Label>
              <Select value={form.book_id} onValueChange={(v) => setForm({ ...form, book_id: v })}>
                <SelectTrigger><SelectValue placeholder="Select book" /></SelectTrigger>
                <SelectContent>
                  {books.map((b) => <SelectItem key={b._id} value={b.book_id}>{b.title}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div><Label>Quantity</Label><Input type="number" min="1" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} /></div>
            <div>
              <Label>Payment Method</Label>
              <Select value={form.payment_method} onValueChange={(v) => setForm({ ...form, payment_method: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Credit Card">Credit Card</SelectItem>
                  <SelectItem value="PayPal">PayPal</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button type="submit" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">Create Order</Button>
            <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </form>
      )}

      <div className="bg-card border rounded-xl overflow-hidden overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Order ID</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Customer</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Date</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Items</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Total</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Payment</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 text-sm font-mono">{o.order_id}</td>
                <td className="px-6 py-4 font-medium">{o.customer_name}</td>
                <td className="px-6 py-4 text-sm">{o.order_date}</td>
                <td className="px-6 py-4 text-sm">{o.items.map((i) => `${i.title} (×${i.quantity})`).join(", ")}</td>
                <td className="px-6 py-4 font-medium">${o.total_amount.toFixed(2)}</td>
                <td className="px-6 py-4 text-sm">{o.payment_method}</td>
                <td className="px-6 py-4">
                  <Badge className={statusColors[o.status] || ""}>{o.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
