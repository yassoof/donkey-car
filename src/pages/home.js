import React from 'react'
import '../css/App.css';

const Home = () => {
    return (
        <div className='container'>
            <h1 className='pageTitle' > Donkey Car Project </h1>
            <iframe className='video'
            title='Installation Video'
            src='https://youtu.be/gUQTY7JQloM'
            frameBorder='0'
            allow='accelerometer; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            />
        </div>
    )
}

export default Home;