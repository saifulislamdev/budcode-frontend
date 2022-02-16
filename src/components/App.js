import '../styles/App.css';
import '../styles/index.css';
import {BrowserRouter, Route, Routes, Router} from "react-router-dom";
import SignUp from './SignUp';
import SignIn from './SignIn';
import NotFound from './NotFound';

function App() {

  return (
    <BrowserRouter>
  
      <Routes>
        <Route exact path="/SignUp" element={<SignUp/>}/>
        <Route exact path="/SignIn" element={<SignIn/>}/>
        <Route exact path="/NotFound" element={<NotFound/>}/>
      </Routes>

    </BrowserRouter>
  );
}
export default App;