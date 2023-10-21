import React, { useState, useEffect } from 'react';

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
        </div>
    );
};

export default Banner;
