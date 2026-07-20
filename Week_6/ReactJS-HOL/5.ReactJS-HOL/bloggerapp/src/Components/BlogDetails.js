function BlogDetails() {

  const blogs = [
    "Introduction to React",
    "Understanding JSX",
    "React Components"
  ];

  return (
    <div>

      <h2>Blog Details</h2>

      <ul>
        {
          blogs.map((blog, index) => (
            <li key={index}>{blog}</li>
          ))
        }
      </ul>

    </div>
  );
}

export default BlogDetails;