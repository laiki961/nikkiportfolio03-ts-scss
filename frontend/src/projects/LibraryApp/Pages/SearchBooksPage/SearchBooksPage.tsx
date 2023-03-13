import classes from "../Library.module.css";
import { useEffect, useState } from "react";
import BookModel from "../../Models/BookModel";
import { Pagination } from "../../Utils/Pagination";
import Loading from "../../../../components/Loading/Loading";
import { SearchBook } from "./components/SearchBook";
import { useOktaAuth } from "@okta/okta-react";

export const SearchBooksPage = () => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);
  const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [searchUrl, setSearchUrl] = useState("");
  const [categorySelection, setCategorySelection] = useState("Book category");

  // const { authState } = useOktaAuth();
  // console.log(authState);

  useEffect(() => {
    const fetchBooks = async () => {
      const baseUrl: string = "${process.env.REACT_APP_LIBRARY_API}/books";
      let url: string = "";

      if (searchUrl === "") {
        url = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`;
      } else {
        url = baseUrl + searchUrl;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseJson = await response.json();
      const responseData = responseJson._embedded.books;

      setTotalAmountOfBooks(responseJson.page.totalElements);
      setTotalPages(responseJson.page.totalPages);

      const loadedBooks: BookModel[] = [];
      for (const key in responseData) {
        loadedBooks.push({
          id: responseData[key].id,
          title: responseData[key].title,
          author: responseData[key].author,
          description: responseData[key].description,
          copies: responseData[key].copies,
          copiesAvailable: responseData[key].copiesAvailable,
          category: responseData[key].category,
          img: responseData[key].img,
        });
      }
      setBooks(loadedBooks);
      setIsLoading(false);
    };
    fetchBooks().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
    window.scrollTo(0, 0);
  }, [currentPage, searchUrl]);

  if (isLoading) {
    return <Loading />;
  }

  if (httpError) {
    return (
      <div className='container m-5'>
        <p>{httpError}</p>
      </div>
    );
  }

  const searchHandleChange = () => {
    if (search === "") {
      setSearchUrl("");
    } else {
      setSearchUrl(
        `/search/findByTitleContaining?title=${search}&page=0size=${booksPerPage}`
      );
    }
  };

  const categoryField = (value: string) => {
    console.log(value);
    if (
      value.toLowerCase() === "fe" ||
      value.toLowerCase() === "be" ||
      value.toLowerCase() === "data" ||
      value.toLowerCase() === "devops"
    ) {
      setCategorySelection(value);
      setSearchUrl(
        `/search/findByCategory?category=${value}&page=0size=${booksPerPage}`
      );
    } else {
      setCategorySelection("All");
      setSearchUrl(`?page=0size=${booksPerPage}`);
    }
  };

  const indexOfLastBook: number = currentPage * booksPerPage;
  const indexOfFirstBook: number = indexOfLastBook - booksPerPage;

  let lastItem =
    booksPerPage * currentPage <= totalAmountOfBooks
      ? booksPerPage * currentPage
      : totalAmountOfBooks;

  const paignate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className={classes["search-book-page"]}>
      <div className='container'>
        <div className='pb-5'>
          <div className='row mt-5'>
            <div className='col-6'>
              <div className='d-flex'>
                <input
                  className='form-control me-2 text-2'
                  type='search'
                  placeholder='Search'
                  aria-labelledby='Search'
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className='btn btn-online-success'
                  onClick={() => searchHandleChange()}
                >
                  Search
                </button>
              </div>
            </div>
            <div className='col-4'>
              <div className='dropdown'>
                <button
                  className='btn btn-secondary dropdown-toggle'
                  type='button'
                  id='dropdownMeunButton1'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  {categorySelection}
                </button>
                <ul
                  className='dropdown-menu'
                  aria-labelledby='dropdownMeunButton1'
                >
                  <li onClick={() => categoryField("All")}>
                    <a className='dropdown-item text-3' href='#'>
                      All
                    </a>
                  </li>
                  <li onClick={() => categoryField("FE")}>
                    <a className='dropdown-item text-3' href='#'>
                      Front End
                    </a>
                  </li>
                  <li onClick={() => categoryField("BE")}>
                    <a className='dropdown-item text-3' href='#'>
                      Back End
                    </a>
                  </li>
                  <li onClick={() => categoryField("Data")}>
                    <a className='dropdown-item text-3' href='#'>
                      Data
                    </a>
                  </li>
                  <li onClick={() => categoryField("DevOps")}>
                    <a className='dropdown-item text-3' href='#'>
                      DevOps
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {totalAmountOfBooks > 0 ? (
            <>
              {" "}
              <div className='mt-3'>
                <span className='text-1'>
                  Number of result: ({totalAmountOfBooks})
                </span>
              </div>
              <p className='text-2'>
                {indexOfFirstBook + 1} to {lastItem} of {totalAmountOfBooks}{" "}
                items:
              </p>
              {books.map((book) => (
                <SearchBook book={book} key={book.id} />
              ))}
            </>
          ) : (
            <div className='m-5 text-1'>
              <h3>Can't find what you are looking for?</h3>
              <a
                type='button'
                className='btn btn-secondary btn-md px-4 me-md-2 fw-bold text-white'
              >
                Library Services
              </a>
            </div>
          )}

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={paignate}
            />
          )}
        </div>
      </div>
    </div>
  );
};
