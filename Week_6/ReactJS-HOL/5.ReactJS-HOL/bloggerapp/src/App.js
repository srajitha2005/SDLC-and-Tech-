import BookDetails from "./Components/BookDetails";
import BlogDetails from "./Components/BlogDetails";
import CourseDetails from "./Components/CourseDetails";

function App() {

  const showBooks = true;
  const showBlogs = true;
  const showCourses = true;

  return (
    <div style={{ margin: "20px" }}>

      <h1>Blogger App</h1>

      {showBooks && <BookDetails />}

      <hr />

      {showBlogs ? <BlogDetails /> : null}

      <hr />

      {showCourses ? <CourseDetails /> : null}

    </div>
  );
}

export default App;