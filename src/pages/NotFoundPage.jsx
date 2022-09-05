import s from "../components/App.module.css"
const NotFoundPage = () => {
    return (
        <div className={s.container}>
            <img src={`https://img.freepik.com/free-vector/404-error-with-a-landscape-concept-illustration_114360-7888.jpg?w=2000`} alt="Page not found" className={s.image} />
        </div>
    )
}

export default NotFoundPage;