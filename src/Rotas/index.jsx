import { Route, Routes } from 'react-router-dom'
import Home from '../Screens/Home'
import Jobs from '../Screens/Jobs'
import Job from '../Screens/Job'
import Login from '../Screens/Login'
import CadastroJob from '../Screens/CadastroJob'

function Rotas() {
  return (
    <Routes>
      <Route path={'/'}  element={<Home/>}/>
      <Route path={'/jobs'} element={<Jobs/>}/>
      <Route path={'/job/:id'} element={<Job/>}/>
      <Route path={'/login'} element={<Login/>}/>
      <Route path={'/cadastro'} element={<CadastroJob/>}/>
    </Routes>
  )
}

export default Rotas
