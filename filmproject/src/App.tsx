import { useEffect } from 'react'
import Header from './components/Header/Header'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { fetcFilms } from './store/slices/filmsSlice'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import Film from './pages/Film/Film'
import Gen from './pages/Gen/Gen'

function App() {
  const dispatch = useAppDispatch()
  const { pageCount } = useAppSelector((state) => state.filmsData)

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(fetcFilms(pageCount))
  }, [pageCount])

  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/films/:id' element={<Film />} />
        <Route path='/genres/:id' element={<Gen/>}/>
      </Routes>
    </div>

  )
}

export default App
