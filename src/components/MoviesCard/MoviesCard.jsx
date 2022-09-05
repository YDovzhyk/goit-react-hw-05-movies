import PropTypes from 'prop-types';
import s from "./MoviesCard.module.css"

const MoviesCard = ({itemsData}) => {

    return (
        <ul className={s.container}>
        {itemsData.map(({id, poster_path, original_name, original_title, release_date, overview, genres, vote_average}) => (
        <li key={id} className={s.movieDetail}>
            <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={original_name || original_title} className={s.img} />
            <div className={s.movieDetailList}>
            <h2>{original_name || original_title}</h2>
            <h3>Release date: <span className={s.text}>{`${release_date}`}</span></h3>
            <h3>Vote average: <span className={s.text}>{vote_average}</span></h3>
            <h3>Owerview</h3>
            <p>{overview}</p>
            <h3>Genres</h3>
            <ul>
                {genres.map(({id, name}) => (
                <li key={id}>
                    <p>{name}</p>
                </li>
                ))}
            </ul>
            </div>
        </li>
        ))}
    </ul>
    )
}

export default MoviesCard;

MoviesCard.defaultProps = {
    itemsData: [],
}

MoviesCard.propTypes = {
    onClick: PropTypes.func,
    itemsData: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        poster_path: PropTypes.string,
        original_name: PropTypes.string,
        original_title: PropTypes.string,
        release_date: PropTypes.string,
        overview: PropTypes.string,
    })),
}