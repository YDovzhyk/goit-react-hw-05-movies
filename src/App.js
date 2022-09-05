import UserRoutes from "./UserRoutes";
import Appbar from "./components/AppBar/AppBar";
import s from "./components/App.module.css"

export const App = () => {
  return (
    <div className={s.container}>
      <Appbar/>
      <UserRoutes/>
    </div>
  );
}
