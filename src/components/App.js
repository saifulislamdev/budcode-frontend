import '../styles/App.css';
import '../styles/index.css';
import {BrowserRouter, Route, Routes, Router} from "react-router-dom";
import SignUp from './SignUp';
import SignIn from './SignIn';
import NotFound from './NotFound';
import ProjectPage from './ProjectPage';
import ProfilePage from './ProfilePage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <BrowserRouter>
  
      <Routes>
        <Route exact path="/auth/signup" element={<SignUp/>}/>
        <Route exact path="/auth/signin" element={<SignIn/>}/>
        <Route exact path="/projects/:id" element={<ProjectPage/>}/>
        <Route eaxct path ="/users/:id" element={<ProfilePage/>}/>
        <Route exact path="/404" element={<NotFound/>}/>
      </Routes>

    </BrowserRouter>
  );
}
export default App;