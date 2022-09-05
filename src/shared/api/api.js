import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
        api_key: 'd2b2f291667f079bc8fdb4687806371b',
    }
});

export const getMovies = async(page = 1) => {
    const {data} = await instance.get('trending/all/day', {
        params: {
            page,
        }
    });
    return data;
};

export const getMoviesBySearch = async(page = 1, query) => {
    const {data} = await instance.get('/search/movie', {
        params: {
            page,
            query,
        }
    });
    return data;
};

export const getMoviesById = async(id) => {
    const {data} = await instance.get(`/movie/${id}`, {
        params: {
            language: "en-US",
        }
    });
    return data;
};

export const getMoviesByCredits = async(id) => {
    const {data} = await instance.get(`/movie/${id}/credits`, {
        params: {
            language: "en-US",
        }
    });
    return data;
};

export const getMoviesByReviews = async(id) => {
    const {data} = await instance.get(`/movie/${id}/reviews`, {
        params: {
            language: "en-US",
        }
    });
    return data;
};