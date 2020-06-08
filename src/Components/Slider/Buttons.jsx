import React from 'react';
import styles from "./Slider.module.css";


const Button = ({buttonHandler, arrow}) => {
    return(
        <button className={styles.button}
                onClick={buttonHandler}>
            <img className={styles.arrow}
                 src={arrow}
                 alt={'arrow'}/>
        </button>
    )
};

export default Button;