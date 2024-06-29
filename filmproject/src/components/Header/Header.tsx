import { useEffect, useState } from 'react'
import './Header.css'
import GeneresBTN from './GeneresBTN/GeneresBTN'
import { fetchGenres } from '../../store/slices/genresSlice'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { changeText, fetchSearch } from '../../store/slices/filmsSlice'





const Header = () => {
    const [lg, setLg] = useState('es-US')
    const [open, setOpen] = useState(false)
    const dispatch = useAppDispatch();

    const { genres } = useAppSelector((state) => state.genresData)
    const { searchFilm, searchFilms } = useAppSelector((state) => state.filmsData)

    useEffect(() => {
        if(searchFilm.length >2){
            setOpen(true)
            dispatch(fetchSearch(searchFilm))
        }else{
            setOpen(false)
        }
    }, [searchFilm])

    useEffect(() => {
        dispatch(fetchGenres(lg))
    }, [lg])

    return (
        <header>
            <div>
                <h2 className='h2'>Life's films</h2>
            </div>
            <nav>
                {
                    genres.map((genre) => {
                        return <GeneresBTN key={genre.id} genre={genre} />
                    })
                }
            </nav>
            <div>
                <div className='f-c'>
                    <input value={searchFilm} onChange={(e) => dispatch(changeText(e.target.value))} />
                    {
                        open &&
                        <div className='filmContent'>
                             {
                                searchFilms.map((sf)=>{
                                  return <li>{sf.title}</li>
                                })
                             }
                        </div>}
                </div>
                <select value={lg} onChange={(e) => setLg(e.target.value)}>
                    <option value={"ru-RU"}>ru</option>
                    <option value={"en-US"}>en</option>
                </select>
            </div>
        </header>
    )
}

export default Header