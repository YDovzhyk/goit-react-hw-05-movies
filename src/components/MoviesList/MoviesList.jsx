import {Link, useLocation} from "react-router-dom";
import PropTypes from 'prop-types';
import s from "./MoviesList.module.css";

const MoviesList = ({itemsData}) => {
    const location = useLocation(); // location - інформація про сторінку з якої виводиться список фільмів

    return (
    <ul className={s.gallery}>
        {itemsData.map(({id, backdrop_path, original_name, original_title}) => (
        <li key={id} className={s.galleryItem}>
            <img src={`https://image.tmdb.org/t/p/w500${backdrop_path}`} alt={original_name || original_title} className={s.image} />
            <div className={s.titleBlock}>
            <Link state={{from: location}} to={`/movies/${id}`} className={s.movieName}>{original_name || original_title}</Link>
            </div>
        </li>
        ))}
    </ul>
    )
};

export default MoviesList;

MoviesList.defaultProps = {
    itemsData: [],
}

MoviesList.propTypes = {
    itemsData: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        backdrop_path: PropTypes.string,
        original_name: PropTypes.string,
        original_title: PropTypes.string,
        })),
}