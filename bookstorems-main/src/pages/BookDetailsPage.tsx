import { useParams, Link } from "react-router-dom";
import { useStore } from "@/data/store";
import { ArrowLeft, Star, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function BookDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { books } = useStore();
  const book = books.find((b) => b._id === id);

  if (!book) return (
    <div className="page-container text-center py-20">
      <p className="text-lg text-muted-foreground">Book not found</p>
      <Link to="/"><Button variant="outline" className="mt-4">Back to Books</Button></Link>
    </div>
  );

  return (
    <div className="page-container animate-fade-in">
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Books
      </Link>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="rounded-xl overflow-hidden border bg-muted aspect-[2/3] flex items-center justify-center">
            {book.thumbnail ? (
              <img src={book.thumbnail} alt={book.title} className="h-full w-full object-cover" />
            ) : (
              <BookOpen className="h-16 w-16 text-muted-foreground" />
            )}
          </div>
        </div>
        <div className="md:col-span-2 space-y-4">
          <div>
            <h1 className="text-3xl font-bold">{book.title}</h1>
            {book.subtitle && <p className="text-lg text-muted-foreground mt-1">{book.subtitle}</p>}
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{book.categories || "Uncategorized"}</Badge>
            {book.buyable ? (
              <Badge className="bg-success text-success-foreground">Buyable</Badge>
            ) : (
              <Badge variant="secondary">Not Available</Badge>
            )}
            <Badge variant="outline">{book.language?.toUpperCase()}</Badge>
          </div>
          <div className="grid grid-cols-2 gap-4 bg-muted rounded-xl p-4">
            <div><p className="text-xs text-muted-foreground">Authors</p><p className="font-medium">{book.authors.join(", ")}</p></div>
            <div><p className="text-xs text-muted-foreground">Publisher</p><p className="font-medium">{book.publisher || "N/A"}</p></div>
            <div><p className="text-xs text-muted-foreground">Published</p><p className="font-medium">{book.published_date || "N/A"}</p></div>
            <div><p className="text-xs text-muted-foreground">Pages</p><p className="font-medium">{book.page_count ?? "N/A"}</p></div>
            <div><p className="text-xs text-muted-foreground">Price</p><p className="font-medium text-lg">${book.list_price?.toFixed(2) ?? "N/A"}</p></div>
            <div className="flex items-center gap-1">
              <p className="text-xs text-muted-foreground">Rating</p>
              <div className="flex items-center gap-1 mt-0.5">
                <Star className="h-4 w-4 fill-secondary text-secondary" />
                <span className="font-medium">{book.average_rating ?? 0}</span>
                <span className="text-xs text-muted-foreground">({book.ratings_count ?? 0})</span>
              </div>
            </div>
          </div>
          {book.description && (
            <div>
              <h2 className="font-semibold mb-2 text-lg">Description</h2>
              <p className="text-muted-foreground leading-relaxed">{book.description}</p>
            </div>
          )}
          <div className="flex gap-3 pt-2">
            <Link to={`/books/${book._id}/edit`}>
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">Edit Book</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
