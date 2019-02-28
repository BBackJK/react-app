import React from 'react';
import { Link } from 'react-router-dom';
import './Title.css';

const Title = () => {
    return (
        <div>
            <h2 className="title-css">
                <Link to="/"
                    className="title-link">
                    BBack`s React Web & App
                </Link>
            </h2>
        </div>
    );
};

export default Title;
