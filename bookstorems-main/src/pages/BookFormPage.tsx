import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useStore } from "@/data/store";
import { Book } from "@/data/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const emptyForm = {
  book_id: "", title: "", subtitle: "", authors: "", publisher: "",
  published_date: "", description: "", page_count: "", categories: "",
  average_rating: "", list_price: "", buyable: true, thumbnail: "", language: "en",
};

export default function BookFormPage() {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const { books, addBook, updateBook } = useStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (isEdit) {
      const book = books.find((b) => b._id === id);
      if (book) {
        setForm({
          book_id: book.book_id, title: book.title, subtitle: book.subtitle || "",
          authors: book.authors.join(", "), publisher: book.publisher || "",
          published_date: book.published_date || "", description: book.description || "",
          page_count: String(book.page_count ?? ""), categories: book.categories || "",
          average_rating: String(book.average_rating ?? ""), list_price: String(book.list_price ?? ""),
          buyable: book.buyable ?? true, thumbnail: book.thumbnail || "", language: book.language || "en",
        });
      }
    }
  }, [id, isEdit, books]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) { toast({ title: "Title is required", variant: "destructive" }); return; }

    const data: Omit<Book, "_id"> = {
      book_id: form.book_id || `BK_${Date.now()}`,
      title: form.title.trim(),
      subtitle: form.subtitle.trim() || undefined,
      authors: form.authors.split(",").map((a) => a.trim()).filter(Boolean),
      publisher: form.publisher.trim() || undefined,
      published_date: form.published_date || undefined,
      description: form.description.trim() || undefined,
      page_count: form.page_count ? Number(form.page_count) : undefined,
      categories: form.categories.trim() || undefined,
      average_rating: form.average_rating ? Number(form.average_rating) : undefined,
      ratings_count: 0,
      language: form.language || "en",
      list_price: form.list_price ? Number(form.list_price) : undefined,
      currency: "USD",
      buyable: form.buyable,
      thumbnail: form.thumbnail.trim() || undefined,
    };

    if (isEdit) { updateBook(id!, data); toast({ title: "Book updated!" }); }
    else { addBook(data); toast({ title: "Book added!" }); }
    navigate("/");
  };

  const set = (key: string, val: string | boolean) => setForm((p) => ({ ...p, [key]: val }));

  return (
    <div className="page-container max-w-2xl animate-fade-in">
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Books
      </Link>
      <h1 className="text-3xl font-bold mb-6">{isEdit ? "Edit Book" : "Add New Book"}</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-card border rounded-xl p-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div><Label>Title *</Label><Input value={form.title} onChange={(e) => set("title", e.target.value)} /></div>
          <div><Label>Subtitle</Label><Input value={form.subtitle} onChange={(e) => set("subtitle", e.target.value)} /></div>
        </div>
        <div><Label>Authors (comma-separated)</Label><Input value={form.authors} onChange={(e) => set("authors", e.target.value)} placeholder="Author 1, Author 2" /></div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><Label>Publisher</Label><Input value={form.publisher} onChange={(e) => set("publisher", e.target.value)} /></div>
          <div><Label>Published Date</Label><Input type="date" value={form.published_date} onChange={(e) => set("published_date", e.target.value)} /></div>
        </div>
        <div><Label>Description</Label><Textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={4} /></div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div><Label>Page Count</Label><Input type="number" value={form.page_count} onChange={(e) => set("page_count", e.target.value)} /></div>
          <div><Label>Category</Label><Input value={form.categories} onChange={(e) => set("categories", e.target.value)} /></div>
          <div><Label>Language</Label><Input value={form.language} onChange={(e) => set("language", e.target.value)} /></div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><Label>Price (USD)</Label><Input type="number" step="0.01" value={form.list_price} onChange={(e) => set("list_price", e.target.value)} /></div>
          <div><Label>Rating</Label><Input type="number" step="0.1" min="0" max="5" value={form.average_rating} onChange={(e) => set("average_rating", e.target.value)} /></div>
        </div>
        <div><Label>Thumbnail URL</Label><Input value={form.thumbnail} onChange={(e) => set("thumbnail", e.target.value)} /></div>
        <div className="flex items-center gap-2">
          <Checkbox checked={form.buyable} onCheckedChange={(v) => set("buyable", !!v)} id="buyable" />
          <Label htmlFor="buyable">Available for purchase</Label>
        </div>
        <div className="flex gap-3 pt-2">
          <Button type="submit" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
            {isEdit ? "Update Book" : "Add Book"}
          </Button>
          <Link to="/"><Button type="button" variant="outline">Cancel</Button></Link>
        </div>
      </form>
    </div>
  );
}
