import { useEffect } from 'react'
import {  useAppSelector } from '../../store/hooks'
import { NavLink } from 'react-router-dom'

const imgUrl = "https://image.tmdb.org/t/p/w500/"


const Gen = () => {
    // const dispatch = useAppDispatch()
    const { genresData } = useAppSelector((state) => state.genresData)
    useEffect(() => {

    }, [])
    return (
        <div className='films-content'>
            {
                genresData.map((el) => {
                    return <div className='filmCard'>
                        <h3>{el.title}</h3>
                        <NavLink to={`films/${el.id}`}>
                            <img src={imgUrl + el.poster_path} />
                        </NavLink>
                    </div>
                })
            }
        </div>
    )
}

export default Gen