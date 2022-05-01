import React, {useContext, useState} from 'react';
import { Link } from "react-router-dom";
import budcodeLogo from '../assets/budcodeLogo.png'
import { Container, Form, Button} from 'react-bootstrap';
import './SignUp.css';
import { axiosInstance } from '../util/config';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import {UserContext} from '../util/context';


export default function SignUp() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const {setAuthorization} = useContext(UserContext);

    let navigate = useNavigate(); 
    
    const signupSchema = Yup.object().shape({
        firstName: Yup.string().max(15).required(),
        lastName: Yup.string().max(15).required(),
        username: Yup.string().max(15).required(),
        email: Yup.string().email().required(),
        password: Yup.string().min(8).max(20).required(),
        repeatPassword: Yup.string()
            .oneOf([Yup.ref('password'), null])
            .required(),
    });

    

    const handleClick = async (e) => {
        e.preventDefault();
        setError(false); 
        setErrorMessage(''); 
        const isValid = await signupSchema.isValid({
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: password,
            repeatPassword: repeatPassword,
        });

        if (isValid) {
            await axiosInstance
                .post('/auth/signup', {
                    firstName: firstName,
                    lastName: lastName,
                    username: username,
                    email: email,
                    password: password,
                    gender: gender,
                })
                .then((response) => {
                    alert("Account has been created!");
                    window.localStorage.setItem(
                        'authorization',
                        JSON.stringify(response.data.token)
                    ); 
                    window.localStorage.setItem(
                        'username',
                        JSON.stringify(response.data.username)
                    );
                   setAuthorization(response.data.token);
                   window.localStorage.clear();
                    navigate('/auth/signin');
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
                    <img className="info-Banner" src={budcodeLogo} alt="budcodeLogo"/>
                </div>
            </div>
              
            <div className = "split right">
                <div className="centered">
                    <Form>
                        <h1 className="header-css">Register Account</h1>
                        <h6>For the purpose of industry regulation, your details are required.</h6>

                    <Form.Group className="mb-3" controlId="formBasicFirstname">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control className="name-input-css" type="name" placeholder="Enter first name" onChange={(e) => {setFirstName(e.target.value)}}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicLastname">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control className="name-input-css" type="name" placeholder="Enter last name" onChange={(e) => {setLastName(e.target.value)}}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicGender">
                        <Form.Label>Choose Your Gender</Form.Label>
                        <Form.Select aria-label="Default select example"> 
                            <option key='blankChoice' hidden value/>
                            <option value="Male" onChange={(e) => {setGender(e.target.value)}}>Male</option>
                            <option value="Female" onChange={(e) => {setGender(e.target.value)}}>Female</option>
                            <option value="Other" onChange={(e) => {setGender(e.target.value)}}>Other</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Create Username" onChange={(e) => {setUsername(e.target.value)}}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => {setEmail(e.target.value)}}/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Create Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
                        <Form.Text id="password-Help-Block" muted>
                            Your password must be 8-20 characters long, contain letters and numbers, and
                            must not contain spaces, special characters, or emoji.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicRepeatPassword">
                        <Form.Label>Submit Password Again</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password" onChange={(e) => {setRepeatPassword(e.target.value)}}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="submitform">
                        <Button variant="outline-info" type="submit" onClick={handleClick}>
                            Submit
                        </Button> 
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="linktohomepage">
                        <Link variant="secondary" type="submit" to='/'>
                            Go back to homepage
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