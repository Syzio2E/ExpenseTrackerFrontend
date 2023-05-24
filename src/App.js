import './App.css';
import Login from './components/Layouts/Login';
import {Route,Routes} from 'react-router-dom'
import Signup from './components/Layouts/Signup'
import Home from './components/Layouts/Home';
import Header from './components/Layouts/Header'
import LeaderBoard from './components/Layouts/LeaderBoard';
import ForgotPassword from './components/Layouts/ForgotPassword';
import Password from './components/Layouts/Password'
import ExpensePage from './components/Layouts/ExpensePage';



function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' Component={Signup}/>
        <Route path='/login' Component={Login}/>
        <Route path='/home' Component={Home}/>
        <Route path="/premium/leaderboard" Component={LeaderBoard}/>
        <Route path="/forgotpassword" Component={Password}/>
        <Route path="/resetpassword/:id" Component={ForgotPassword}/>
        <Route path='myexpense' Component={ExpensePage}/>
      </Routes>
    </div>
  );
}

export default App;
