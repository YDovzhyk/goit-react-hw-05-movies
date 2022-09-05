import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import Loader from "../components/Loader/Loader";
import PropTypes from 'prop-types';
import s from "../components/MoviesCard/MoviesCard.module.css"
    
import { getMoviesByReviews } from "../shared/api/api";
    
const Reviews = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const {id} = useParams();
    
    useEffect(()=> {
        const fetchMovies = async () =>  {        
            try {
                setLoading(true);
                const data = await getMoviesByReviews(id);
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
    
    let noResult = true;
    function getContent (content) {
        if(content) {
            noResult = false;
            return content;
        }
    }

    let finalLinkAvatar = '';
    function getAvatar (author_details) {
        if(author_details.avatar_path) {
            const replaceText = '/https://www.gravatar.com/avatar';
            const addText = 'https://gravatar.com/avatar'
            const linkAvatar = author_details.avatar_path;
            finalLinkAvatar = addText.concat(linkAvatar.replace((new RegExp(replaceText, "g")), ''));
            return finalLinkAvatar;
        } else {
            return finalLinkAvatar = 'https://gravatar.com/avatar/1kks3YnVkpyQxzw36CObFPvhL5f.jpg'
        }
    }

    return (
        <div>
            <h3 className={s.castTitle}>Reviews:</h3>
            {loading && <Loader/>}
            <ul className={s.castContainer}>
            {items.map(({results}) => (
                <li key={id} className={s.cast}>
                    <div className={s.castList}>
                        <ul>
                            {results.map(({id, author, content, author_details}) => (
                            <li key={id} className={s.reviewsBlock}>
                                <img src={`${getAvatar(author_details)}`} alt="User avatar" className={s.imgAvatar} />
                                <h3>{author}</h3>
                                <p>{getContent(content)}</p>
                            </li>
                            ))}
                        </ul>
                    </div>
                </li>
                ))}
            </ul>
            {error && <p className={s.warning}>Failed to upload movies.</p>}
            {noResult && <p className={s.warning}>Sorry, we didn't find the reviews information</p>}
        </div>  
    )
}

export default Reviews;

Reviews.defaultProps = {
    data: [],
    fetchMovies: () => {},
    getMoviesByReviews: () => {},
    formSubmitHandler: () => {},
    }

Reviews.propTypes = {
    id: PropTypes.string,
    fetchMovies: PropTypes.func,
    getMoviesByReviews: PropTypes.func,
    data: PropTypes.arrayOf(PropTypes.shape({
        results: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            author: PropTypes.string,
            content: PropTypes.string,
            author_details: PropTypes.arrayOf(PropTypes.shape({
                avatar_path: PropTypes.string,
            })),
        })),
        
    }))
}