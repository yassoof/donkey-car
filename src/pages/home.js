import React from 'react'
import { useEffect } from 'react';
import '../css/App.css';

const Home = () => {

    useEffect(() => {
        if (window.location.hostname === 'localhost') {
            window.history.pushState(window.state, window.title, 'http://localhost:3000/donkey-car');
        } else {
            window.history.pushState(window.state, window.title, 'https://yassoof.github.io/donkey-car');
        }
    });

    return (
        <div className='container'>
            <h1 className='pageTitle' > Donkey Car Project </h1>
            <iframe className='video'
                title='Installation Video'
                src='https://www.youtube.com/embed/gUQTY7JQloM'
                frameBorder='0'
                allow='accelerometer; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
            />
        </div>
    )
}

export default Home;