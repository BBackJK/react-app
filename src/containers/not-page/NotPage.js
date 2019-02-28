import React from 'react';
import { Link } from 'react-router-dom';
import './NotPage.css';

const NotPage = () => {
    return(
        <div className="notPage-css">
            <h1>Not-existing Page.</h1>
            <h1>
            <Link to="/"
                className="not-page-link">
                Go Back to the Home?
            </Link>
            </h1>
        </div>
    )
}

export default NotPage;
