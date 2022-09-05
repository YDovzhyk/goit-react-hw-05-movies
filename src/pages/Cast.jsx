import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import Loader from "../components/Loader/Loader";
import PropTypes from 'prop-types';
import s from "../components/MoviesCard/MoviesCard.module.css"

import { getMoviesByCredits } from "../shared/api/api";

const Cast = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const {id} = useParams();

    useEffect(()=> {
        const fetchMovies = async () =>  {        
            try {
                setLoading(true);
                const data = await getMoviesByCredits(id);
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

    let noResult = "";
    if(items.length === 0) {
        noResult = true;
    }

    return (
        <div>
            <h3 className={s.castTitle}>Cast:</h3>
            {loading && <Loader/>}
            <ul className={s.castContainer}>
            {items.map(({cast}) => (
                <li key={id} className={s.cast}>
                    <div className={s.castList}>
                        <ul>
                            {cast.map(({id, name}) => (
                            <li key={id}>
                            <p>{name}</p>
                            </li>
                            ))}
                        </ul>
                    </div>
                </li>
                ))}
            </ul>
            {error && <p>Failed to upload movies.</p>}
            {!noResult && <p>Sorry, we didn't find the cast information</p>}
        </div>  
    )
}
export default Cast;

Cast.defaultProps = {
    data: [],
    fetchMovies: () => {},
    getMoviesByCredits: () => {},
    formSubmitHandler: () => {},
    }

Cast.propTypes = {
    id: PropTypes.string,
    fetchMovies: PropTypes.func,
    getMoviesByCredits: PropTypes.func,
    data: PropTypes.arrayOf(PropTypes.shape({
        cast: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
        })),
        
    }))
}