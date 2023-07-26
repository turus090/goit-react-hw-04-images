import propTypes from 'prop-types'
import s from './button.module.css'

const Button = ({handleLoadMore}) => {
    return (
        <button onClick={handleLoadMore} className = {s.btn}>Load More</button>
    )
}
Button.propTypes = {
    handleLoadMore: propTypes.func
}
export default Button
