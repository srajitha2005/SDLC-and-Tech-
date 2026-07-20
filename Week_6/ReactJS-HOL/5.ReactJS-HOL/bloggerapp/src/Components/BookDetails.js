function BookDetails() {

  const books = [
    { id: 1, name: "React Basics", price: 450 },
    { id: 2, name: "Java Programming", price: 600 },
    { id: 3, name: "Python", price: 500 }
  ];

  return (
    <div>
      <h2>Book Details</h2>

      <ul>
        {
          books.map(book => (
            <li key={book.id}>
              {book.name} - ₹{book.price}
            </li>
          ))
        }
      </ul>

    </div>
  );
}

export default BookDetails;