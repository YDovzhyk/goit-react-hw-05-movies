import UserRoutes from "./UserRoutes";
import Appbar from "./components/AppBar/AppBar";
import s from "./components/App.module.css"

function App () {
  return (
    <div className={s.container}>
      <Appbar/>
      <UserRoutes/>
    </div>
  );
}

export default App;
