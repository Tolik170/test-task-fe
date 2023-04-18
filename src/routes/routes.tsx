import { Route, Routes } from 'react-router-dom'
import { routesPath } from '~/routes/routesPath'
import Home from '~/pages/home/Home'
import Login from '~/pages/Login'
import SignUp from '~/pages/SignUp'

const AppRouter = () => {
  return (
    <Routes>
      <Route element={ <Home /> } path={ routesPath.home.route } />
      <Route element={ <Login /> } path={ routesPath.navBar.login.route } />
      <Route element={ <SignUp /> } path={ routesPath.navBar.signUp.route } />
    </Routes>
  )
}

export default AppRouter
