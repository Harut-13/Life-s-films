import './FilmsCard.css'
import { filmsObjectType } from '../../../store/slices/filmsSlice'
import { NavLink } from 'react-router-dom'

const imgUrl = "https://image.tmdb.org/t/p/w500/"

type FilmsCardPropsType={
    film : filmsObjectType
}
const FilmsCard = (props : FilmsCardPropsType) => {
  return (
    <div className='filmCard'>
        <h3>{props.film.title}</h3>
        <NavLink to={`films/${props.film.id}`}>
        <img src={imgUrl + props.film.poster_path}/>
        </NavLink>
    </div>
  )
}

export default FilmsCard