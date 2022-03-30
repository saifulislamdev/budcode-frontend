import React from 'react';
import "./Post.css"

function Post(){
    return (
        <div className = "post">
            <div className = "postHeaderText">
                <br></br>
                <div className = "postCard">
                <h3> Jane </h3>
                 <div className = "postDescription">
                    <p> Hello. This is some text to talk about this template nothing to see here</p>
                    </div>
                </div>
                <div className = "postCard">
                <h3> John </h3>
                <div className = "postDescription">
                    <p> Hello. This is some text to talk about this template</p>
                </div>
                </div>
                <div className = "postCard">
                <h3> Will </h3>
                <div className = "postDescription">
                    <p> Hello. This is some text to talk about this template</p>
                </div>
                </div>
            </div>
            </div>
    )
}

export default Post;
