import Navbar from "./components/NavbarMain";
import BookShelf from "./components/BookShelf";
import PageDisplay from "./components/PageDisplay";
import { createContext, useState } from "react";
import { useQuery } from 'react-query';
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Route, Routes } from 'react-router-dom';
import "./App.css"
import BookShelfPage from "./pages/BookShelfPage";
import Footer from "./components/Footer";

 
export const context = createContext();

const fetchRepoData = async (query) => {
  const response = await fetch(`https://openlibrary.org/search.json?q=${query}&limit=10&page=1`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export function HomePage () {
  return(
    <>
      <Navbar />
      <BookShelf />
      <PageDisplay />
      <Footer />
    </>
  )
}

export default function App() {
  const [query, setQuery] = useState("");
  const [bookshelfSide, setbookshelfSide] = useState(false);
  const [store, setStore] = useLocalStorage('bookshelf', []);

  const { isLoading, error, data } = useQuery(['repoData', (query ? query : "YOUR_QUERY")], () => fetchRepoData((query ? query : "YOUR_QUERY")), {
    enabled: true,
  });
  
  // console.log(error ? error : "No error while fetching");
  // console.log(data);
  return (
    <>
    <context.Provider
      value={{query, setQuery, data, isLoading, bookshelfSide, setbookshelfSide, store, setStore}}
    >
      <Routes>
        <Route exact path="/" element={<HomePage/>} />
        <Route path="/bookshelf" element={<BookShelfPage />} />
      </Routes>
    </context.Provider>
    </>
  )
}