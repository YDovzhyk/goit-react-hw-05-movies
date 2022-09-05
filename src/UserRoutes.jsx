import Loader from "components/Loader/Loader";
import { lazy, Suspense } from "react";
import {Routes, Route} from "react-router-dom";

import HomeView from "./pages/HomeView"
import MovieDetailsView from "./pages/MovieDetailsView";
const MoviesView = lazy(() => import('./pages/MoviesView'));
const Cast = lazy(() => import("./pages/Cast"));
const Reviews = lazy(() => import("./pages/Reviews"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const UserRoutes = () => {
    return (
        <Suspense fallback={<Loader/>}>
            <Routes>
                <Route path="/" element={<HomeView />} />
                <Route path="/movies" element={<MoviesView />} />
                <Route path="/movies/:id" element={<MovieDetailsView />}>
                    <Route path="Cast" element={<Cast />} />
                    <Route path="Reviews" element={<Reviews />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Suspense>
    )
}

export default UserRoutes;