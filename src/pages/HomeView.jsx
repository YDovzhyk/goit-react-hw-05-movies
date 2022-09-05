import { useState, useEffect } from "react";
import MoviesList from "../components/MoviesList/MoviesList"
import { getMovies } from "../../src/shared/api/api";
import Loader from "../components/Loader/Loader";
import PropTypes from 'prop-types';
import s from "../components/MoviesList/MoviesList.module.css"

export const HomeView = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(()=> {
        const fetchMovies = async () =>  {        
            try {
                setLoading(true);
                const data = await getMovies(page);          
                setItems(prevItems => [...prevItems, ...data.results])
            } catch (error) {
                setError(error);
            }
            finally {
                setLoading(false);
            }
        } 
            fetchMovies()
    }, [page]);

    const loadMore = () => setPage(page + 1);

    const isMoviesPresent = Boolean(items.length);

        return (
        <div>
            <h1 className={s.title}>TRENDING TODAY</h1>
            {loading && <Loader/>}
            <MoviesList itemsData={items}/>
            {isMoviesPresent && <button className={s.button} onClick={loadMore}>load more</button>}
            {error && <p className={s.warning}>Failed to upload movies.</p>}
        </div>
        
        )
    }

export default HomeView;

HomeView.defaultProps = {
    data: {},
    fetchMovies: () => {},
    getMovies: () => {},
    formSubmitHandler: () => {},
}

HomeView.propTypes = {
    getMovies: PropTypes.func,
    formSubmitHandler: PropTypes.func,
    data: PropTypes.shape({
        search: PropTypes.string,
        id: PropTypes.string,
    }),
}