import React , {useState} from 'react';
import { Link } from "react-router-dom";
import picLogScreen from '../assets/picLogScreen.png'
import { Container, Form, Button, Row, Col} from 'react-bootstrap';
import './SignIn.css';
import { axiosInstance } from '../util/config';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";

export default function SignIn() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false); 
    const [errorMessage, setErrorMessage] = useState('');

    let navigate = useNavigate(); 
    
    const signInSchema = Yup.object().shape({
        username: Yup.string().max(15).required(),
        password: Yup.string().min(8).required(),
    });

    const handleClick = async (e) => {
        e.preventDefault();
        setError(false); 
        setErrorMessage(''); 
        const isValid = await signInSchema.isValid({
            username: username,
            password: password,
        });

        if (isValid) {
            axiosInstance
                .post('/auth/signin', {
                    username: username,
                    password: password,
                })
                .then((response) => {
                    navigate('/users/:id');
                    console.log(response);
                })
                .catch((err) => {
                    console.log(err);
                    console.log(err.response);
                    setErrorMessage(err.response.data.msg); 
                    setError(true);
                });
        } else {
            setError(true); 
            setErrorMessage('One or more input is invalid');
        }
    };
    return (
        <Container id="main-container" className="d-grid h-100">
            <div className = "split left">
                <div className="centered">
                    <img className="info-Banner" src={picLogScreen} alt="picLogScreen"/>
                </div>
            </div>
        
            <div className = "split right">
                <div className="centered">
                    <Form>
                        <h1 className="header-css">Login to Your Account</h1>
          
                        <Form.Group className="mb-3" controlId="form-Basic-Username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="username" placeholder="Enter username" onChange={(e) => {setUsername(e.target.value)}}/>
                        </Form.Group>
  
                        <Form.Group className="mb-3" controlId="form-Basic-Password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
                        </Form.Group>
  
                        <Form.Group className="mb-3" controlId="submit-form">
                            <Button variant="outline-info" type="submit" to='/users/:id' onClick={handleClick}>
                                Login
                            </Button> 
                        </Form.Group>
  
                        <Form.Group className="mb-3" controlId="link-to-SignUp">
                            <Link variant="secondary" type="submit" to='/auth/signup'>
                                Dont have an account?
                            </Link>
                        </Form.Group>
 
                        {error ? (
                                <p style={{ color: 'red' }}>
                                    {errorMessage}
                                </p>
                            ) : null}
                    </Form>
                </div>
            </div>    
        </Container>
    ); 
}