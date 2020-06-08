import React from 'react';
import styles from "./Slider.module.css";


const SliderContent = ({
                           slides,
                           onTouchStart,
                           onTouchMove,
                           onTouchEnd,
                           translate,
                           transition
                       }) => {

    return (
        <div className={styles.sliderWrapper}>
            <ul id={'slider'}
                onTouchStart={(e) => onTouchStart(e)}
                onTouchMove={(e) => onTouchMove(e)}
                onTouchEnd={(e) => onTouchEnd(e)}
                className={styles.items}
                style={{
                    transform: 'translateX(-' + translate + 'px)',
                    transition: 'transform ' + transition + 's ease-in-out'
                }}>
                {slides.map((slide, i) => {
                    return (
                        <li key={i}
                            className={styles.item}
                            style={{
                                backgroundImage: `url(${slide.src})`
                            }}>
                            <div className={styles.sliderContent}>
                                <span>{slide.alt}</span>
                                <br/>
                                <button>Reserve a trip!</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
};

export default SliderContent;