import { useStore } from "@/data/store";
import { Badge } from "@/components/ui/badge";

export default function AuthorsPage() {
  const { books } = useStore();

  const authorMap: Record<string, number> = {};
  books.forEach((b) => b.authors.forEach((a) => { authorMap[a] = (authorMap[a] || 0) + 1; }));
  const authors = Object.entries(authorMap).sort((a, b) => b[1] - a[1]);

  return (
    <div className="page-container">
      <h1 className="text-3xl font-bold mb-2">Authors</h1>
      <p className="text-muted-foreground mb-8">{authors.length} authors aggregated from book collection</p>
      <div className="bg-card border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">#</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Author Name</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Books Written</th>
            </tr>
          </thead>
          <tbody>
            {authors.map(([name, count], i) => (
              <tr key={name} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 text-sm text-muted-foreground">{i + 1}</td>
                <td className="px-6 py-4 font-medium">{name}</td>
                <td className="px-6 py-4"><Badge variant="outline">{count} book{count > 1 ? "s" : ""}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
