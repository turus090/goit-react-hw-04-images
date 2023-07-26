import s from './loader.module.css'

const Loader = () => {
    return (
        <div className={s.container}>
            <img className={s.content} src='http://localhost:3000/goit-react-hw-03-image-finder/loading.svg' alt="loading"/>
        </div>
    )
}

export default Loader