import React, {useEffect, useRef, useState} from 'react';
import styles from './Slider.module.css';
import rightArrow from './../../images/right-arrow.png';
import leftArrow from './../../images/left-arrow.png';
import SliderContent from "./SliderContent";
import Dots from "./Dots";
import Button from "./Buttons";


const Slider = ({slides}) => {

    let firstSlide = slides[0];
    let secondSlide = slides[1];
    let lastSlide = slides[slides.length - 1];

    const [state, setState] = useState({
        currentIndex: 0,
        width: 500,
        translate: 500,
        transition: 1,
        _slides: [lastSlide, firstSlide, secondSlide]
    });


    let {currentIndex, translate, transition, width, _slides} = state;


    ////responsive to mobile

    useEffect(() => {
        let responsiveWidth = window.outerWidth;

        if (responsiveWidth < 968) {
            return setState({
                ...state,
                width: 280,
                translate: 280
            })
        }
    }, []);

    ////INFINITE MODE
    let transitionRef = useRef();

    useEffect(() => {
        transitionRef.current = infiniteTransition;
    });

    useEffect(() => {
        let transition = () => {
            transitionRef.current();
        };

        const transitionEnd = window.addEventListener('transitionend', transition);

        return () => {
            window.removeEventListener('transitionend', transitionEnd);
        };
    }, []);

    useEffect(() => {
        if (transition === 0) setState({...state, transition: 1});
    }, [transition]);

    const infiniteTransition = () => {
        let _slides = [];

        if (currentIndex === slides.length - 1) _slides = [slides[slides.length - 2], lastSlide, firstSlide];
        else if (currentIndex === 0) _slides = [lastSlide, firstSlide, secondSlide];
        else _slides = slides.slice(currentIndex - 1, currentIndex + 2);

        setState({
            ...state,
            _slides,
            transition: 0,
            translate: width
        });
    };
    //////////

    ///BUTTON HANDLERS
    const nextSlide = () => {
        setState({
            ...state,
            translate: translate + width,
            buttonDisabled: true,
            currentIndex: currentIndex === slides.length - 1 ? 0 : currentIndex + 1
        });
    };

    const prevSlide = () => {
        setState({
            ...state,
            translate: 0,
            currentIndex: currentIndex === 0 ? slides.length - 1 : currentIndex - 1
        });
    };

    const dotsHandler = (index) => {
        let _slides;

        if (index > currentIndex) _slides = slides.slice(currentIndex, index + 1);
        else if (index < currentIndex) _slides = slides.slice(0, currentIndex + 1);
        else return

        setState({
            ...state,
            _slides,
            currentIndex: index,
            translate: index > currentIndex ? (index - currentIndex) * width
                : index < currentIndex ? index * width : translate
        });
    };

    ///////TOUCH HANDLERS
    let startingX = useRef();
    let change = useRef();
    let item = useRef();

    useEffect(() => {
        item.current = document.getElementById('slider');
    }, []);

    const onTouchStart = (e) => {
        startingX.current = e.touches[0].clientX;
    };

    const onTouchMove = (e) => {
        change.current = startingX.current - e.touches[0].clientX;
        item.current.style.transform = 'translateX(' + -(translate + change.current) + 'px)';
    };

    const onTouchEnd = (e) => {
        let change = startingX.current - e.changedTouches[0].clientX;
        if (change > 0) nextSlide();
        else if (change < 0) prevSlide();
    };


    return (

        <div className={styles.wholeWrapper}>

            <Button buttonHandler={prevSlide}
                    arrow={leftArrow}
            />

            <SliderContent slides={_slides}
                           onTouchStart={onTouchStart}
                           onTouchMove={onTouchMove}
                           onTouchEnd={onTouchEnd}
                           translate={translate}
                           transition={transition}
            />

            <Button buttonHandler={nextSlide}
                    arrow={rightArrow}
            />

            <Dots slides={slides}
                  currentIndex={currentIndex}
                  dotsHandler={dotsHandler}
            />
        </div>


    )

};

export default Slider;
