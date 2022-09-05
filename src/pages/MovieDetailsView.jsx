import Loader from "components/Loader/Loader";
import MoviesCard from "../components/MoviesCard/MoviesCard"
import {useState, useEffect} from "react";
import {Link, useParams, useNavigate, Outlet, useLocation} from "react-router-dom";
import PropTypes from 'prop-types';
import s from "../components/MoviesCard/MoviesCard.module.css"

import { getMoviesById } from "../shared/api/api";

const MovieDetailsView = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const {id} = useParams();

    const navigate = useNavigate();

    const location = useLocation();

    const from = location.state?.from || "/movies";

    const goBack = () => navigate(from);

    useEffect(()=> {
        const fetchMovies = async () =>  {        
            try {
                setLoading(true);
                const data = await getMoviesById(id);
                setItems(prevItems => [...prevItems, data])
            } catch (error) {
                setError(error);
            }
            finally {
                setLoading(false);
            }
        } 
        if(id) {
            fetchMovies()
        }
    }, [id]);

    let castLink = "";
    let reviewsLink = "";
    if(location.pathname === `/movies/${id}/`) {
        castLink = `/movies/${id}/cast`;
        reviewsLink = `/movies/${id}/reviews`;
    } else {
        castLink = `/movies/${id}/`
        reviewsLink = `/movies/${id}/`;
    };

    return (
        <div className={s.container}>
            <button className={s.button} onClick={goBack}>Go back</button>
            {loading && <Loader className={s.loader}/>}
            <MoviesCard itemsData={items}/>
            {items && (<>
                <Link className={s.outlet} state={{from}} to={castLink}>Cast</Link>
                <Link className={s.outlet} state={{from}} to={reviewsLink}>Rewiews</Link>
                <Outlet />
            </>)}
            {error && <p>Failed to upload movies.</p>}
        </div>
    )
}

export default MovieDetailsView;

MovieDetailsView.defaultProps = {
    data: [],
    goBack: () => {},
    getMoviesById: () => {},
    fetchMovies: () => {},
}

MovieDetailsView.propTypes = {
    id: PropTypes.string,
    goBack: PropTypes.func,
    getMoviesById: PropTypes.func,
    fetchMovies: PropTypes.func,
}