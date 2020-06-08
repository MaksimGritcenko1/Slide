import React from 'react';
import styles from "./Slider.module.css";


const Dots = ({
                  slides,
                  currentIndex,
                  dotsHandler}) => {

    return(
        <div className={styles.dots}>
            {slides.map((slide, i) => {
                return (
                    <div onClick={() => dotsHandler(i)}
                         key={i}
                         className={styles.dot}
                         style={{
                             backgroundColor: i === currentIndex ? 'black' : 'white'
                         }}/>
                )
            })}
        </div>
    )
};

export default Dots;