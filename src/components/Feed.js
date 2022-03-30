import React from 'react';
import './Feed.css'; 
import {Form, Button} from 'react-bootstrap'
import Post from './Post';
import SideBar from './SideBar';

export default function Feed(){
    return (
        <div className = "postapp">

            <SideBar />
           
            <div className = "feed">
                <div className = "feedHeader">
                    <h1>Feed</h1>
                </div>

                <div className = "feedBox">
                    <Form>
                        <div className="feedBox-input">
                            <input placeholder ="Share Something!"></input>
                        </div>
                        <div className = "postbutton">
                        <Button>Post</Button>
                        </div>
                    </Form>

                </div>

                <Post />

            </div>
            </div>
    );
}