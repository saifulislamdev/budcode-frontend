import '../styles/App.css';
import '../styles/index.css';
import {BrowserRouter, Route, Routes, Router} from "react-router-dom";
import SignUp from './SignUp';
import SignIn from './SignIn';
import NotFound from './NotFound';
import ProjectPage from './ProjectPage';
import ProfilePage from './ProfilePage';
import Home from "./Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import {UserContextWrapper} from '../context/userContextWrapper';
import Navbar from './Navbar';
import WithNav from './WithNav';
import WithoutNav from './WithoutNav';


function App() {

  return (
    
<UserContextWrapper>
      <BrowserRouter>
     <Routes>
        
        <Route element={<WithoutNav/>}>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/404" element={<NotFound/>}/>
        <Route exact path="/auth/signup" element={<SignUp/>}/>
        <Route exact path="/auth/signin" element={<SignIn/>}/>
        </Route>
        <Route element={<WithNav/>}>
        <Route exact path="/projects/:id" element={<ProjectPage/>}/>
        <Route eaxct path ="/users/:id" element={<ProfilePage/>}/>
        </Route>

        
      </Routes>
    </BrowserRouter>   
    </UserContextWrapper>


  );
}
export default App;