import { useState } from "react";
import { useStore } from "@/data/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CustomersPage() {
  const { customers, addCustomer } = useStore();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ customer_id: "", name: "", email: "", phone: "", city: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) { toast({ title: "Name and email required", variant: "destructive" }); return; }
    addCustomer({ ...form, customer_id: form.customer_id || `CUST${Date.now()}` });
    toast({ title: "Customer added!" });
    setForm({ customer_id: "", name: "", email: "", phone: "", city: "" });
    setShowForm(false);
  };

  return (
    <div className="page-container">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Customers</h1>
          <p className="text-muted-foreground mt-1">{customers.length} customers</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
          <Plus className="h-4 w-4 mr-2" /> Add Customer
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-card border rounded-xl p-6 mb-6 animate-fade-in space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div><Label>Name *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div><Label>Email *</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
            <div><Label>Phone</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
            <div><Label>City</Label><Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /></div>
          </div>
          <div className="flex gap-2">
            <Button type="submit" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">Save</Button>
            <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </form>
      )}

      <div className="bg-card border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">ID</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Name</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Email</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Phone</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">City</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c._id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 text-sm font-mono text-muted-foreground">{c.customer_id}</td>
                <td className="px-6 py-4 font-medium">{c.name}</td>
                <td className="px-6 py-4 text-sm">{c.email}</td>
                <td className="px-6 py-4 text-sm">{c.phone || "—"}</td>
                <td className="px-6 py-4 text-sm">{c.city || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
