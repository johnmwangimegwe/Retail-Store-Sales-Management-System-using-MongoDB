## 📚 MongoDB Project: Bookstore Management System Shell Query Guide

This guide rewrites your project steps in the same order and makes each query easier for a beginner to follow. The command samples below are presented in Bash-style code blocks for easy copying. Source: 

---

## Queries

### 🌐 Connecting to MongoDB Atlas using CMD, Bash, or terminal

```bash
mongosh "mongodb+srv://username:password@bookstore-management-co.a7stqlh.mongodb.net/bookstore?retryWrites=true&w=majority"
```

This command opens the MongoDB shell and connects directly to your Atlas cloud database.

`mongodb+srv://` tells MongoDB to connect to an Atlas cluster.

`johnmwangimegwe_db_user` is the database username.

`bookstore-management-co.a7stqlh.mongodb.net` is the cluster address.

`bookstore` is the database you want to work with.

`retryWrites=true` allows MongoDB to retry a write if a temporary failure happens.

`w=majority` makes MongoDB confirm the write using the majority of nodes for better reliability.


---

### 📥 Insert one document directly in MongoDB Compass

```bash
{
  "title": "The Final Empire",
  "author": "Brandon Sanderson",
  "pages": 450,
  "genres": ["fantasy", "dystopian"],
  "rating": 8,
  "price": 1200,
  "stock": 15,
  "publisher": "Tor Books",
  "language": "English"
}
```

This is one book record. It is a single JSON document. In Compass, you can paste this into **Insert Document**.

`title` is the name of the book.

`author` is the writer.

`pages` stores the number of pages.

`genres` is an array because one book can belong to more than one genre.

`rating` stores the score for the book.

`price` and `stock` help manage sales and inventory.

`publisher` and `language` add more detail to the record.

---

### 📥 Insert many documents in MongoDB Compass

```bash
[
  {
    "title": "The Final Empire",
    "author": "Brandon Sanderson",
    "pages": 450,
    "genres": ["fantasy", "dystopian"],
    "category": "Fiction",
    "language": "English",
    "published_year": 2006,
    "publisher": "Tor Books",
    "price": 1200,
    "stock": 15,
    "rating": 8.8,
    "isbn": "9780765311788",
    "in_stock": true
  },
  {
    "title": "Atomic Habits",
    "author": "James Clear",
    "pages": 320,
    "genres": ["self-help", "productivity"],
    "category": "Self-Development",
    "language": "English",
    "published_year": 2018,
    "publisher": "Avery",
    "price": 1800,
    "stock": 20,
    "rating": 9.1,
    "isbn": "9780735211292",
    "in_stock": true
  },
  {
    "title": "Rich Dad Poor Dad",
    "author": "Robert T. Kiyosaki",
    "pages": 336,
    "genres": ["finance", "business"],
    "category": "Business",
    "language": "English",
    "published_year": 1997,
    "publisher": "Plata Publishing",
    "price": 1500,
    "stock": 10,
    "rating": 8.4,
    "isbn": "9781612680194",
    "in_stock": true
  },
  {
    "title": "Introduction to Algorithms",
    "author": "Thomas H. Cormen",
    "pages": 1312,
    "genres": ["computer science", "algorithms"],
    "category": "Education",
    "language": "English",
    "published_year": 2009,
    "publisher": "MIT Press",
    "price": 6500,
    "stock": 5,
    "rating": 9.3,
    "isbn": "9780262033848",
    "in_stock": true
  },
  {
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "pages": 180,
    "genres": ["classic", "novel"],
    "category": "Literature",
    "language": "English",
    "published_year": 1925,
    "publisher": "Scribner",
    "price": 900,
    "stock": 12,
    "rating": 8.0,
    "isbn": "9780743273565",
    "in_stock": true
  },
  {
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "pages": 464,
    "genres": ["programming", "software engineering"],
    "category": "Technology",
    "language": "English",
    "published_year": 2008,
    "publisher": "Prentice Hall",
    "price": 3000,
    "stock": 8,
    "rating": 9.0,
    "isbn": "9780132350884",
    "in_stock": true
  },
  {
    "title": "The Psychology of Money",
    "author": "Morgan Housel",
    "pages": 256,
    "genres": ["finance", "psychology"],
    "category": "Finance",
    "language": "English",
    "published_year": 2020,
    "publisher": "Harriman House",
    "price": 1700,
    "stock": 18,
    "rating": 8.9,
    "isbn": "9780857197689",
    "in_stock": true
  },
  {
    "title": "Sapiens",
    "author": "Yuval Noah Harari",
    "pages": 498,
    "genres": ["history", "anthropology"],
    "category": "History",
    "language": "English",
    "published_year": 2011,
    "publisher": "Harvill Secker",
    "price": 2200,
    "stock": 7,
    "rating": 9.2,
    "isbn": "9780062316097",
    "in_stock": true
  },
  {
    "title": "Things Fall Apart",
    "author": "Chinua Achebe",
    "pages": 209,
    "genres": ["african literature", "classic"],
    "category": "Literature",
    "language": "English",
    "published_year": 1958,
    "publisher": "Heinemann",
    "price": 1100,
    "stock": 9,
    "rating": 8.7,
    "isbn": "9780385474542",
    "in_stock": true
  },
  {
    "title": "Data Science for Business",
    "author": "Foster Provost",
    "pages": 414,
    "genres": ["data science", "business analytics"],
    "category": "Technology",
    "language": "English",
    "published_year": 2013,
    "publisher": "O'Reilly Media",
    "price": 2800,
    "stock": 6,
    "rating": 8.6,
    "isbn": "9781449361327",
    "in_stock": true
  }
]
```

This is a list of many book documents. In Compass, this is useful when you want to import several records at once instead of adding them one by one.

A square bracket `[]` means many documents.

A curly bracket `{}` means one document.

`isbn` is useful as a unique identifier for books.

`in_stock: true` helps you quickly separate available books from unavailable ones.

`category` helps with grouping and reporting.

---

### 🔎 Filter in MongoDB Compass by rating

```bash
{ "rating": 9 }
```

This returns books whose `rating` is exactly 9.

---

### 🔎 Filter in MongoDB Compass by author

```bash
{ "author": "John" }
```

This returns books where the author field is exactly `John`.

If the exact name in the database is different, such as `John Mwangi`, this query will not return it.

---

### 🗂 Select the database in the shell

```bash
use("Bookstore-Management-System")
```

This switches the shell to the database named `Bookstore-Management-System`.

If the database does not yet exist, MongoDB prepares to create it when data is inserted.

---

### 📁 Check available collections

```bash
show collections
```

This displays all collections inside the current database.

A collection in MongoDB is like a table in relational databases.

---

### ➕ Insert one document in the shell

```bash
db.books_clean.insertOne({
  "title": "The Final Empire",
  "author": "Brandon Sanderson",
  "pages": 450,
  "genres": ["fantasy", "dystopian"],
  "rating": 8,
  "price": 1200,
  "stock": 15,
  "publisher": "Tor Books",
  "language": "English"
})
```

`db.books_clean` means you are working in the `books_clean` collection.

`insertOne()` adds exactly one document.

---

### ➕ Insert many documents in the shell

```bash
db.books_clean.insertMany([
  {
    "title": "The Final Empire",
    "author": "Brandon Sanderson",
    "pages": 450,
    "genres": ["fantasy", "dystopian"],
    "category": "Fiction",
    "language": "English",
    "published_year": 2006,
    "publisher": "Tor Books",
    "price": 1200,
    "stock": 15,
    "rating": 8.8,
    "isbn": "9780765311788",
    "in_stock": true
  },
  {
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "pages": 180,
    "genres": ["classic", "novel"],
    "category": "Literature",
    "language": "English",
    "published_year": 1925,
    "publisher": "Scribner",
    "price": 900,
    "stock": 12,
    "rating": 8.0,
    "isbn": "9780743273565",
    "in_stock": true
  },
  {
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "pages": 464,
    "genres": ["programming", "software engineering"],
    "category": "Technology",
    "language": "English",
    "published_year": 2008,
    "publisher": "Prentice Hall",
    "price": 3000,
    "stock": 8,
    "rating": 9.0,
    "isbn": "9780132350884",
    "in_stock": true
  },
  {
    "title": "Data Science for Business",
    "author": "Foster Provost",
    "pages": 414,
    "genres": ["data science", "business analytics"],
    "category": "Technology",
    "language": "English",
    "published_year": 2013,
    "publisher": "O'Reilly Media",
    "price": 2800,
    "stock": 6,
    "rating": 8.6,
    "isbn": "9781449361327",
    "in_stock": true
  }
])
```

`insertMany()` adds several documents in one command.

This is better when loading sample data or importing a dataset.

---

### 📖 Find all documents

```bash
db.books_clean.find()
```

This returns all documents in the `books_clean` collection.

---

### 🔁 Continue showing more results

```bash
it
```

When the shell stops after showing a few documents, `it` displays the next set.

---

### 🧹 Clear the shell screen

```bash
cls
```

This clears the current shell display to make the screen cleaner.

---

### 🔍 Find books by one author

```bash
db.books_clean.find({ "author": "Ivan King" })
```

This returns every book written by `Ivan King`.

---

### 🔍 Find books by author and rating together

```bash
db.books_clean.find({ "author": "Ivan King", "rating": 7 })
```

This returns books where both conditions are true at the same time.
The author must be `Ivan King` and the rating must be `7`.

---

### 🧾 Return only selected fields for one author

```bash
db.books_clean.find({ "author": "Ivan King" }, { "title": 1, "author": 1 })
```

The first part is the filter.

The second part is the projection.

`title: 1` means include the title field.

`author: 1` means include the author field.

Fields not marked with `1` are left out unless MongoDB includes `_id` by default.

---

### 🧾 Return only title and author for all documents

```bash
db.books_clean.find({}, { "title": 1, "author": 1 })
```

`{}` means no filter, so all documents are considered.

Only the `title` and `author` fields are shown.

---

### 🔎 Find one document by ObjectId

```bash
db.books_clean.findOne({ "_id": ObjectId("69cbceff680364afbd8e5649") })
```

`findOne()` returns only one matching document.

`ObjectId()` is used because MongoDB stores `_id` in a special format.

Your earlier text had `find0ne` with zero instead of letter `O`.

The correct command is `findOne`.

---

### 🔢 Count all documents using find

```bash
db.books_clean.find().count()
```

This gives the total number of documents returned by the query.

---

### 🔢 Count documents for one author

```bash
db.books_clean.find({ "author": "Ivan King" }).count()
```

This counts how many books belong to `Ivan King`.

---

### 📉 Limit the number of returned documents

```bash
db.books_clean.find().limit(3)
```

This shows only the first 3 documents.

It is useful when testing data without printing everything.

---

### 🔠 Sort documents by title

```bash
db.books_clean.find().sort({ "title": 1 })
```

`1` means ascending order from A to Z.
`-1` would mean descending order from Z to A.

---

### 🧩 Nested document idea

A nested document means one document contains another document or array of documents inside it.

For example, a book can have a `reviews` field that stores many review records such as reviewer name, score, and message.

---

### 📈 Find books where rating is greater than 2

```bash
db.books_clean.find({ "rating": { "$gt": 2 } })
```

`$gt` means greater than.

---

### 📉 Find books where rating is less than 2

```bash
db.books_clean.find({ "rating": { "$lt": 2 } })
```

`$lt` means less than.

---

### 📉 Find books where rating is less than or equal to 2

```bash
db.books_clean.find({ "rating": { "$lte": 2 } })
```

`$lte` means less than or equal to.

---

### 🎯 Find books where rating is greater than 2 and author is Patrick Mwangi

```bash
db.books_clean.find({ "rating": { "$gt": 2 }, "author": "Patrick Mwangi" })
```

This uses two conditions together.

MongoDB treats these as both needing to be true.

---

### 🔀 Use OR operator

```bash
db.books_clean.find({ "$or": [{ "author": "John" }, { "rating": 1 }] })
```

`$or` means return documents that satisfy at least one condition.

So the result can have author `John` or rating `1`.

---

### 📚 Use IN operator

```bash
db.books_clean.find({ "rating": { "$in": [7, 8, 9] } })
```

`$in` checks whether the field value exists in the given list.

This is useful when filtering several acceptable values at once.

---

### 🔗 Use AND operator

```bash
db.books_clean.find({ "$and": [{ "author": "John" }, { "rating": 1 }] })
```

`$and` means both conditions must be true.

---

### 🧙 Find all books that include fantasy in the genres array

```bash
db.books_clean.find({ "genres": "fantasy" })
```

If `genres` is an array, MongoDB checks whether `"fantasy"` is one of the values inside that array.

---

### 🧙 Find books whose genres array is exactly only fantasy

```bash
db.books_clean.find({ "genres": ["fantasy"] })
```

This is stricter than the previous query.

It matches documents where the entire array is exactly `["fantasy"]`.

---

### ❌ Delete one document by ObjectId

```bash
db.books_clean.deleteOne({ "_id": ObjectId("PUT_ID_HERE") })
```

`deleteOne()` removes only one matching document.

It is safest when deleting by `_id` because `_id` is unique.

---

### ❌ Delete many documents by author

```bash
db.books_clean.deleteMany({ "author": "John Mwangi" })
```

`deleteMany()` removes all documents that match the condition.

Use it carefully because it can remove several records at once.

---

### ✏️ Update one document

```bash
db.books_clean.updateOne(
  { "_id": ObjectId("PUT_ID_HERE") },
  { "$set": { "rating": 8, "pages": 900 } }
)
```

`updateOne()` updates the first matching document.

`$set` changes the given fields to new values.

---

### ✏️ Update many documents

```bash
db.books_clean.updateMany(
  { "author": "John Mwangi" },
  { "$set": { "price": 388 } }
)
```

This changes the `price` field for all documents where the author is `John Mwangi`.

---

### ➕ Increment a numeric value

```bash
db.books_clean.updateOne(
  { "_id": ObjectId("PUT_ID_HERE") },
  { "$inc": { "price": 50 } }
)
```

`$inc` adds a number to the current value.

If the current price is `300`, it becomes `350`.

---

### 🔢 Count all documents using countDocuments

```bash
db.books.countDocuments()
```

This is the more modern way to count records in a collection.

---

### 👀 View only a few records

```bash
db.books.find().limit(5)
```

This returns just 5 documents from the `books` collection.

---

### 🕳 Check for missing titles

```bash
db.books.countDocuments({
  "$or": [
    { "title": null },
    { "title": "" }
  ]
})
```

This counts books where the title is missing.

`title: null` checks for a null value.
`title: ""` checks for an empty string.
`$or` means either of the two conditions can match.

---

### 🕳 Check for missing authors

```bash
db.books.countDocuments({
  "$or": [
    { "authors": null },
    { "authors": "" }
  ]
})
```

This counts books where the `authors` field is missing or empty.

---
## 🔄 Aggregation Part 

Aggregation is useful here because it helps you **clean**, **reshape**, **summarize**, and **store improved results** in new collections.

---

# 1. Replacing missing ratings with zero

```bash
average_rating: { $ifNull: ["$average_rating", 0] }
ratings_count: { $ifNull: ["$ratings_count", 0] }
list_price: { $ifNull: ["$list_price", 0] }
```

This says:

* if `average_rating` is missing, use `0`
* if `ratings_count` is missing, use `0`
* if `list_price` is missing, use `0`

This is helpful because many operations become easier when numeric fields always have numbers instead of null values.

### `$out`

```bash
{ $out: "books_clean" }
```

This saves the final aggregated output into a new collection called `books_clean`.

So instead of changing the original raw collection directly, you create a cleaner version for analysis.

---

# 2. Check whether the cleaned collection was created properly

```bash
db.books_clean.find().limit(5)
```

Run this after the aggregation.

You should verify:

* `authors` is now an array
* missing numeric values are now `0`
* fields are more consistent

This confirms that the cleaning step worked.

---

# 3. Extract all authors into a separate collection

```bash
db.books_clean.aggregate([
  { $unwind: "$authors" },
  { $match: { authors: { $ne: "" } } },
  {
    $group: {
      _id: "$authors"
    }
  },
  {
    $project: {
      _id: 0,
      name: "$_id"
    }
  },
  {
    $out: "authors"
  }
])
```

This pipeline creates a new `authors` collection from the `authors` array in `books_clean`.

This is useful because one book can have one or many authors, and later you may want a separate authors list for reporting or joining logic in your application.

### What each stage is doing

### `$unwind`

```bash
{ $unwind: "$authors" }
```

This breaks the `authors` array into separate rows.

For example, if one document has:

```bash
"authors": ["Jodie Archer", "Matthew L. Jockers"]
```

After `$unwind`, MongoDB treats them as separate entries:

* Jodie Archer
* Matthew L. Jockers

This is necessary if you want to count authors or make a separate authors collection.

### `$match`

```bash
{ $match: { authors: { $ne: "" } } }
```

This removes empty author values.

`$ne` means “not equal to”.

So this keeps only authors where the name is not an empty string.

### `$group`

```bash
{
  $group: {
    _id: "$authors"
  }
}
```

This groups by author name.

The effect is that duplicate author names are collapsed into one.

If `Ivan King` appears in many books, the output will still show `Ivan King` once.

### `$project`

```bash
{
  $project: {
    _id: 0,
    name: "$_id"
  }
}
```

This changes the output format.

Normally after `$group`, the author name is stored inside `_id`.

This step removes `_id` and renames it to `name`.

So instead of:

```bash
{ "_id": "Ivan King" }
```

you get:

```bash
{ "name": "Ivan King" }
```

That looks cleaner.

### `$out`

```bash
{ $out: "authors" }
```

This writes the final result into a new collection called `authors`.

---

# 4. Check the new authors collection

```bash
db.authors.find().limit(20)
```

This lets you inspect the first authors created by the aggregation.

You should expect entries such as:

* Ivan King
* Jodie Archer
* Matthew L. Jockers
* Robert McParland

depending on the documents in your dataset. 

---

# 5. Count how many unique authors were extracted

```bash
db.authors.countDocuments()
```

This tells you how many unique authors were found in the books dataset.

It helps you show that the aggregation was successful and useful for data exploration.

---

# 6. Find books per category using aggregation

```bash
db.books_clean.aggregate([
  {
    $group: {
      _id: "$categories",
      total_books: { $sum: 1 }
    }
  },
  {
    $sort: { total_books: -1 }
  }
])
```

This groups books by category and counts how many books are in each category.

### What this does

### `$group`

It groups all books with the same `categories` value together.

For each category, it adds 1 for every document.

So if many books have `categories: "Literary Criticism"`, that category gets a high count.

### `$sum: 1`

This counts the number of documents in each group.

### `$sort`

```bash
{ $sort: { total_books: -1 } }
```

This sorts the results from highest to lowest.

So the category with the most books appears first.

This is useful for showing which categories dominate your bookstore data.

---

# 7. Find average price per category

```bash
db.books_clean.aggregate([
  {
    $group: {
      _id: "$categories",
      average_price: { $avg: "$list_price" },
      total_books: { $sum: 1 }
    }
  },
  {
    $sort: { average_price: -1 }
  }
])
```

This groups books by category and calculates the average price for each category.

### What this helps you see

* which categories are more expensive
* which categories have more books
* whether some categories mostly contain zero-priced books

This is useful for business insights in a bookstore system.

---

# 8. Find books with missing or empty authors using aggregation

```bash
db.books_clean.aggregate([
  {
    $match: {
      $or: [
        { authors: { $exists: false } },
        { authors: { $size: 0 } }
      ]
    }
  },
  {
    $project: {
      title: 1,
      authors: 1,
      categories: 1
    }
  }
])
```

This helps identify poor-quality records where authors are missing.

### What this is doing

### `$match`

This filters only documents where:

* `authors` does not exist, or
* `authors` exists but is an empty array

### `$project`

This returns only the most relevant fields for checking the problem:

* `title`
* `authors`
* `categories`

This is useful for quality control and reporting.

---

# 9. Find books with zero price

```bash
db.books_clean.aggregate([
  {
    $match: {
      list_price: 0
    }
  },
  {
    $project: {
      title: 1,
      authors: 1,
      categories: 1,
      list_price: 1
    }
  }
])
```

From the sample data you attached, several records have `list_price: 0`, especially older or non-buyable items. 

This aggregation helps you identify such records.

That is useful because in a real bookstore, you may want to:

* exclude zero-priced books from sales reports
* separate unavailable books
* clean the inventory further

---

# 10. Find only buyable books

```bash
db.books_clean.aggregate([
  {
    $match: {
      buyable: true
    }
  },
  {
    $project: {
      title: 1,
      authors: 1,
      list_price: 1,
      currency: 1,
      buyable: 1
    }
  }
])
```

This filters only books that are available for purchase.

This is very useful in a bookstore project because not every record in the dataset may be ready for sale.

---

# 11. Count books per author

```bash
db.books_clean.aggregate([
  { $unwind: "$authors" },
  {
    $group: {
      _id: "$authors",
      total_books: { $sum: 1 }
    }
  },
  {
    $sort: { total_books: -1 }
  }
])
```

This tells you how many books each author has in the dataset.

### Why this is useful

This is one of the best aggregation examples for your project because it shows:

* use of arrays
* use of `$unwind`
* grouping
* counting
* sorting

This is exactly the kind of thing that demonstrates you understand MongoDB beyond simple CRUD.

---

# 12. Find top-rated books

```bash
db.books_clean.aggregate([
  {
    $match: {
      average_rating: { $gt: 0 }
    }
  },
  {
    $sort: {
      average_rating: -1
    }
  },
  {
    $project: {
      title: 1,
      authors: 1,
      average_rating: 1,
      ratings_count: 1
    }
  },
  {
    $limit: 10
  }
])
```

This gives the highest-rated books in the collection.

### What this does

* `$match` keeps only books with a rating above 0
* `$sort` arranges from highest rating to lowest
* `$project` keeps only useful fields
* `$limit` returns the top 10

This is a strong query for analysis and presentation.

---

# 13. Create a sales-ready collection with only useful books

```bash
db.books_clean.aggregate([
  {
    $match: {
      buyable: true,
      list_price: { $gt: 0 }
    }
  },
  {
    $project: {
      book_id: 1,
      title: 1,
      authors: 1,
      categories: 1,
      list_price: 1,
      currency: 1,
      average_rating: 1,
      language: 1
    }
  },
  {
    $out: "books_for_sale"
  }
])
```

This creates a new collection called `books_for_sale`.

It contains only books that:

* are buyable
* have a price greater than zero

This is very useful because in a real bookstore application, not every raw record should appear in the sales interface.

---

# 14. Check the books_for_sale collection

```bash
db.books_for_sale.find().limit(10)
```

This lets you confirm that the sales-ready collection was created properly.

---

### 🧹 Clean the books collection into books_clean

You changed `authors` from one long string into an array.

For example:
`"Ivan King, bestsellers"` becomes `["Ivan King", "bestsellers"]`

This is better because arrays are easier to search, filter, and analyze.

```bash
db.books.aggregate([
  {
    "$project": {
      "book_id": 1,
      "title": 1,
      "subtitle": 1,
      "authors": {
        "$cond": {
          "if": { "$ifNull": ["$authors", false] },
          "then": { "$split": ["$authors", ", "] },
          "else": []
        }
      },
      "publisher": 1,
      "published_date": 1,
      "description": 1,
      "page_count": 1,
      "categories": 1,
      "average_rating": { "$ifNull": ["$average_rating", 0] },
      "ratings_count": { "$ifNull": ["$ratings_count", 0] },
      "language": 1,
      "preview_link": 1,
      "info_link": 1,
      "isbn_13": 1,
      "isbn_10": 1,
      "list_price": { "$ifNull": ["$list_price", 0] },
      "currency": 1,
      "buyable": 1,
      "search_category": 1,
      "thumbnail": 1
    }
  },
  {
    "$out": "books_clean"
  }
])
```

`aggregate()` is used for data transformation.

`$project` chooses fields and can also transform them.

`$ifNull` replaces null values with a default value.

`$split` breaks one string into an array.

`$cond` applies a condition.

`$out` saves the result into a new collection called `books_clean`.

---

### 👤 Extract authors into a new authors collection

```bash
db.books_clean.aggregate([
  { "$unwind": "$authors" },
  { "$match": { "authors": { "$ne": "" } } },
  {
    "$group": {
      "_id": "$authors"
    }
  },
  {
    "$project": {
      "_id": 0,
      "name": "$_id"
    }
  },
  {
    "$out": "authors"
  }
])
```

This creates a separate `authors` collection from the `books_clean` collection.

`$unwind` breaks the authors array so each author is handled one at a time.

`$match` removes empty author values.

`$group` removes duplicates by grouping same names together.

`$project` renames the field from `_id` to `name`.

`$out` writes the results into a new collection called `authors`.

This is useful if later you want a cleaner design with separate collections such as `books`, `authors`, and maybe `orders`.

---

### 🌍 Fetch books through an API route in Node.js

```bash
app.get("/api/books", async (_, res) => {
  try {
    const books = await Book.find().limit(100);
    console.log("Books found:", books.length);
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
```

This route is used in a backend application.

`app.get("/api/books")` creates an endpoint for getting books.

`Book.find().limit(100)` fetches up to 100 books from MongoDB.

`res.json(books)` sends the books to the frontend in JSON format.

The `catch` block handles errors and returns a server error message.

This is the step that helps connect MongoDB to a web app or dashboard.

---

