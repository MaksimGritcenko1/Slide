import React from 'react';
import './App.css';
import Slider from "./Components/Slider/Slider";
import img1 from "./images/01.jpg";
import img2 from "./images/02.jpg";
import img3 from "./images/03.png";
import img4 from "./images/04.jpg";
import img5 from "./images/05.jpg";


const slides = [
    {id: 0, src: img1, alt: 'A spring forest'},
    {id: 1, src: img2, alt: 'A bamboo forest'},
    {id: 2, src: img3, alt: 'Dandelions'},
    {id: 3, src: img4, alt: 'Mountain landscape'},
    {id: 4, src: img5, alt: 'Summer in Saints Petersburg'}
]


function App() {
    return (
        <Slider slides={slides}/>
    );
}

export default App;
