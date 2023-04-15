import { Route, Routes } from 'react-router-dom'
import { routesPath } from '~/routes/routesPath'
import Home from '~/pages/home/Home'
// import { routesPath } from './routesPath'

const AppRouter = () => {
  return (
    <Routes>
      <Route element={ <Home /> } path={ routesPath.home.route } />
    </Routes>
  )
}

export default AppRouter
