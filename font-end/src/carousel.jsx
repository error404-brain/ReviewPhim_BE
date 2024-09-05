import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Carousel_img_1 from './assets/download.jpg';
import Carousel_img_2 from './assets/download2.jpg';
import Carousel_img_3 from './assets/Untitled.png';
import Carousel_img_4 from './assets/newjeans.jpg';
import Carousel_img_5 from './assets/8xbet.png';

const Carousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
        appendDots: dots => (
            <div style={{ color: 'white', position: 'absolute', bottom: '10px', right: '10px' }}>
                <ul style={{ margin: '0px' }}> {dots} </ul>
            </div>
        ),
    };

    const slides = [
        { id: 1, img: Carousel_img_1, alt: 'Image 1' },
        { id: 2, img: Carousel_img_2, alt: 'Image 2' },
        { id: 3, img: Carousel_img_3, alt: 'Image 3' },
        { id: 4, img: Carousel_img_4, alt: 'Image 4' },
        { id: 5, img: Carousel_img_5, alt: 'Image 5', link: 'https://sites.google.com/view/choigamehay/home?gad_source=1&gclid=CjwKCAjwreW2BhBhEiwAavLwfDra2I4y0eG8zurXKB-5clCmpAxqxvqGQfvPJYy8L5FZjFmRLeLveBoCbRIQAvD_BwE' },
    ];

    return (
        <div className="relative w-full overflow-hidden"> {/* Chiều cao cố định */}
            <Slider {...settings} className="h-full">
                {slides.map(slide => (
                    <div key={slide.id} className="w-full h-full flex items-center justify-center">
                        {slide.link ? (
                            <a href={slide.link} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={slide.img}
                                    alt={slide.alt}
                                    className="w-full h-64 object-cover"
                                />
                            </a>
                        ) : (
                            <img
                                src={slide.img}
                                alt={slide.alt}
                                className="w-full h-64 object-cover"
                            />
                        )}
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Carousel;
