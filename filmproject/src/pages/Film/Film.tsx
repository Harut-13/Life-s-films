import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetcFilm, fetchTrailer } from '../../store/slices/filmsSlice';
import './Film.css'
const imgUrl = "https://image.tmdb.org/t/p/w500/"

const Film = () => {
  const { id } = useParams();
  const iframe = useRef(null)
  const dispatch = useAppDispatch()
  const { film } = useAppSelector((state) => state.filmsData)

  useEffect(() => {
    dispatch(fetcFilm(id))
  }, [])

  const myId = film?.id
  useEffect(() => {
    dispatch(fetchTrailer({ myId, iframe }))
  }, [myId])
  
  return (
    <div className='info'>
      <h1>{film?.title}</h1>
      <h2>{film?.overview}</h2>
      <h3>{film?.release_date}</h3>
      <h3>{film?.adult}</h3>
      <h4>{film?.vote_count}</h4>
      <img src={imgUrl + film?.poster_path} height={500} />
      <iframe ref={iframe} />
    </div>
  )
}

export default Film