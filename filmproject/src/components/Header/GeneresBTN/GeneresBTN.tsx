import { useState } from 'react'
import './GenresBTN.css'
import { useAppDispatch } from '../../../store/hooks'
import { fetchGenresData } from '../../../store/slices/genresSlice'
import { NavLink } from 'react-router-dom'


type GeneresBTNpropsType ={
   genre: any
}
const GeneresBTN = (props: GeneresBTNpropsType) => {
  const dispatch = useAppDispatch()
   const [textLength, setTextLength]= useState(8)
  return (
   <button 
   onClick={()=>     dispatch(fetchGenresData(props.genre.id))   }
   className='genresBTN'>
      <NavLink to={`/genres/${props.genre.id}`}>{props.genre.name.length > textLength? `${props.genre.name.slice(0, textLength)}...`:props.genre.name}</NavLink>
      </button>
)
}

export default GeneresBTN