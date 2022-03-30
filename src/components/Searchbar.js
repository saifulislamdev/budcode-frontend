import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import './Search.css'

const Searchbar = (props) => {
    const [state, setState] = useState({
      description: '',
      python: false,
      java : false,
      c : false,
      game: false,
      webapp: false,
      mobileapp: false 
    });
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      if (name === 'python') {
        setState((prevState) => ({ ...state, [name]: !prevState.python }));
      } else {
        setState({ ...state, [name]: value });
      }
    };

    const handleInputChange2 = (event) => {
        const { name, value } = event.target;
        if (name === 'java') {
          setState((prevState) => ({ ...state, [name]: !prevState.java }));
        } else {
          setState({ ...state, [name]: value });
        }
      };

      const handleInputChange3 = (event) => {
        const { name, value } = event.target;
        if (name === 'c') {
          setState((prevState) => ({ ...state, [name]: !prevState.c }));
        } else {
          setState({ ...state, [name]: value });
        }
      };

      const handleInputChange4 = (event) => {
        const { name, value } = event.target;
        if (name === 'game') {
          setState((prevState) => ({ ...state, [name]: !prevState.game }));
        } else {
          setState({ ...state, [name]: value });
        }
      };

      const handleInputChange5 = (event) => {
        const { name, value } = event.target;
        if (name === 'webapp') {
          setState((prevState) => ({ ...state, [name]: !prevState.webapp}));
        } else {
          setState({ ...state, [name]: value });
        }
      };

      const handleInputChange6 = (event) => {
        const { name, value } = event.target;
        if (name === 'mobileapp') {
          setState((prevState) => ({ ...state, [name]: !prevState.mobileapp}));
        } else {
          setState({ ...state, [name]: value });
        }
      };
  
    const handleSearch = (event) => {
      event.preventDefault();
      console.log(state);
    };
  
    return (
      <container id="main-container" className="d-grid h-100">
      
        <div className="search">
        <Form className="search-form" onSubmit={handleSearch}>
          <div className = "search-section">
          <Row>
            <Col>
              <Form.Group controlId="description">
                <Form.Control
                  type="text"
                  name="description"
                  value={state.description || ''}
                  placeholder="Enter search term"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Button variant="primary" type="submit" className="btn-search">
                Search
              </Button>
            </Col>
          </Row>
          </div>

          <div className = "search-section">
            <div className = "card">

            </div>
          </div>

        
          <div className="filters">
            <Form.Group controlId="python">
              <Form.Check
                type="checkbox"
                name="python"
                className="python-checkbox"
                label="Python"
                checked={state.python}
                onChange={handleInputChange}
              />
            </Form.Group>
          
            <Form.Group controlId="java">
              <Form.Check
                type="checkbox"
                name="java"
                className="java-checkbox"
                label="Java"
                checked={state.java}
                onChange={handleInputChange2}
              />
            </Form.Group>
          
            <Form.Group controlId="c">
              <Form.Check
                type="checkbox"
                name="c"
                className="c-checkbox"
                label="C"
                checked={state.c}
                onChange={handleInputChange3}
              />
            </Form.Group>
            <br></br>
            <Form.Group controlId="game">
              <Form.Check
                type="checkbox"
                name="game"
                className="game-checkbox"
                label="Game"
                checked={state.game}
                onChange={handleInputChange4}
              />
            </Form.Group>
         
            <Form.Group controlId="webapp">
              <Form.Check
                type="checkbox"
                name="webapp"
                className="webapp-checkbox"
                label="Web Application"
                checked={state.webapp}
                onChange={handleInputChange5}
              />
            </Form.Group>
          
            <Form.Group controlId="mobileapp">
              <Form.Check
                type="checkbox"
                name="mobileapp"
                className="mobileapp-checkbox"
                label="Mobile Application"
                checked={state.mobileapp}
                onChange={handleInputChange6}
              />
            </Form.Group>
          </div>
        
        </Form>
        
      </div>
      </container>
    );
  };
  export default Searchbar;