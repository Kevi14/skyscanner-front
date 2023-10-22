import React, { useState, useEffect } from 'react';
import ChallengesPopover from "../Shared/ChallengesPopover.jsx";
import {useSelector} from "react-redux";

const images = [
    '/banner2.jpg',
    '/banner3.jpg',
    '/banner4.jpg',
    '/banner5.jpg',
    '/banner6.jpg',

];
// eslint-disable-next-line react/prop-types
const Banner = ({ interval = 10000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
        }, interval);

        return () => clearInterval(slideInterval); // Cleanup to prevent memory leaks
    }, [images, interval]);

    return (
        <div className="w-full h-[65vh] relative bg-black">
            {images.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    alt={`Slide ${index}`}
                    className={
                        `absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 
                        ${currentIndex === index ? 'opacity-70' : 'opacity-0'}`
                    }
                />
            ))}
            <h2 className="absolute text-6xl font-bold top-1/3 pl-[13%] transform -translate-y-1/3 text-white ">MindSpace Airlines</h2>
            <h2 className="absolute text-2xl font-bold top-1/2 pl-[13%] transform -translate-y-1/2 text-white">A Great way to Fly</h2>
            {isAuthenticated && <ChallengesPopover/>}
        </div>
    );
};

export default Banner;
