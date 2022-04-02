import React from 'react'
import '../css/App.css';

const Home = () => {
    return (
        <div className='container'>
            <h1 className='pageTitle' > Donkey Car Project </h1>
            <iframe className='video'
                src="https://www.youtube.com/embed/gUQTY7JQloM"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>

            </iframe>
        </div>
    )
}

export default Home;