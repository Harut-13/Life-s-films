import './Home.css'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import FilmsCard from '../../components/Header/FilmsCard/FilmsCard'
import { changePage } from '../../store/slices/filmsSlice'


const Home = () => {
  const dispatch = useAppDispatch()
    const {films, pageCount}=useAppSelector((state)=> state.filmsData)
  return (
    <div>
        <div className='films-content'>
            {
                films.map((film)=>{
                  return <FilmsCard key={film.id} film={film}/>
                })
            }

        </div>
        <button 
        onClick={()=> dispatch(changePage())}
        className='btn'>See more {pageCount}</button>
    </div>
  )
}

export default Home