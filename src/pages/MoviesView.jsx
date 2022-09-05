import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getMoviesBySearch } from "../../src/shared/api/api";

import MoviesList from "../components/MoviesList/MoviesList"
import Loader from "../components/Loader/Loader";
import Searchbar from "../components/SearchBar/SearchBar"
import s from "../components/MoviesList/MoviesList.module.css"

import PropTypes from 'prop-types';

const MoviesView = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();

    const q = searchParams.get('search');

    useEffect(()=> {
      const fetchMovies = async () =>  {        
          try {
              setLoading(true);
              const data = await getMoviesBySearch(page, q);
              setItems(prevItems => [...prevItems, ...data.results])
          } catch (error) {
              setError(error);
          }
          finally {
              setLoading(false);
          }
      } 
      if(q) {
          fetchMovies()
      }
  }, [page, q]);

  const formSubmitHandler = searchData => {
    const params = Object.fromEntries([...searchParams]);
    const search = searchData.search;
    setSearchParams({...params, search})
    setPage(1)
    if (search !== q) {
        setItems([])
    } 
    if (page > 1 && search === q && loading === false) {
        setItems([])
    }
};
  const loadMore = () => setPage(page + 1);

  const isMoviesPresent = Boolean(items.length);

  let noResult = "";
  if(items.length === 0 && q !== null && !loading) {
      noResult = true;
  }

    return (
      <div>
        <Searchbar onSubmit={formSubmitHandler}/>
        {loading && <Loader/>}
        <MoviesList itemsData={items}/>
        {isMoviesPresent && <button className={s.button} onClick={loadMore}>load more</button>}
        {noResult && <p className={s.warning}>Sorry, we didn't find any movies for your search: {q}</p>}
        {error && <p>Failed to upload movies.</p>}
      </div>
    );
  };

export default MoviesView;

MoviesView.defaultProps = {
  data: {},
  fetchMovies: () => {},
  getMoviesBySearch: () => {},
  formSubmitHandler: () => {},
}

MoviesView.propTypes = {
  fetchMovies: PropTypes.func,
  getMoviesBySearch: PropTypes.func,
  formSubmitHandler: PropTypes.func,
  data: PropTypes.shape({
      search: PropTypes.string,
      id: PropTypes.string,
  }),
}