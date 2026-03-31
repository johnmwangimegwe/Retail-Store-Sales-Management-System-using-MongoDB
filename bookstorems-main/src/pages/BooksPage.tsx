import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "@/data/store";
import { Search, Plus, Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export default function BooksPage() {
  const { books, deleteBook } = useStore();
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  const filtered = books.filter((b) => {
    const q = search.toLowerCase();
    return (
      b.title.toLowerCase().includes(q) ||
      b.authors.some((a) => a.toLowerCase().includes(q)) ||
      (b.categories?.toLowerCase().includes(q)) ||
      (b.publisher?.toLowerCase().includes(q))
    );
  });

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Delete "${title}"?`)) {
      deleteBook(id);
      toast({ title: "Book deleted", description: `"${title}" has been removed.` });
    }
  };

  return (
    <div className="page-container">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Books</h1>
          <p className="text-muted-foreground mt-1">{books.length} books in collection</p>
        </div>
        <Link to="/books/new">
          <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
            <Plus className="h-4 w-4 mr-2" /> Add New Book
          </Button>
        </Link>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by title, author, category, publisher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((book) => (
          <div key={book._id} className="bg-card rounded-xl border overflow-hidden hover:shadow-lg transition-shadow animate-fade-in group">
            <div className="h-48 bg-muted flex items-center justify-center overflow-hidden">
              {book.thumbnail ? (
                <img src={book.thumbnail} alt={book.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
              ) : (
                <span className="text-muted-foreground text-sm">No image</span>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold line-clamp-1">{book.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">{book.authors.join(", ")}</p>
              <div className="flex items-center gap-2 mt-2">
                {book.categories && <Badge variant="outline" className="text-xs">{book.categories}</Badge>}
                {book.buyable ? (
                  <Badge className="bg-success text-success-foreground text-xs">Buyable</Badge>
                ) : (
                  <Badge variant="secondary" className="text-xs">Not Available</Badge>
                )}
              </div>
              <p className="text-lg font-bold mt-2">${book.list_price?.toFixed(2) ?? "N/A"}</p>
              <div className="flex gap-2 mt-3">
                <Link to={`/books/${book._id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full"><Eye className="h-3 w-3 mr-1" />View</Button>
                </Link>
                <Link to={`/books/${book._id}/edit`}>
                  <Button variant="outline" size="sm"><Pencil className="h-3 w-3" /></Button>
                </Link>
                <Button variant="outline" size="sm" onClick={() => handleDelete(book._id, book.title)}>
                  <Trash2 className="h-3 w-3 text-destructive" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg">No books found</p>
          <p className="text-sm mt-1">Try a different search term</p>
        </div>
      )}
    </div>
  );
}
