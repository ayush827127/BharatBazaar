"use client"
import React, { useEffect, useRef } from 'react';
import '../style.css'; // Import the CSS file for animation



const HomePagePosters = () => {
  const posters = [
    { id: 1, title: 'Poster 1', image: 'poster/Poster.jpg' },
    { id: 2, title: 'Poster 2', image: 'poster/PetCare.jpg' },
    { id: 3, title: 'Poster 3', image: 'poster/BabyCare.jpg' },
    { id: 4, title: 'Poster 4', image: 'poster/Poster.jpg' },
    { id: 5, title: 'Poster 5', image: 'poster/PetCare.jpg' },
    // Add more posters as needed
  ];

  const scrollContainerRef = useRef(null);
  const totalWidthRef = useRef(0);
  const posterWidthRef = useRef(0);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const totalWidth = posters.length * scrollContainer.clientWidth;
    totalWidthRef.current = totalWidth;
    posterWidthRef.current = scrollContainer.clientWidth;

    let scrollAmount = 0;

    const scrollStep = () => {
      scrollContainer.scrollTo({
        left: scrollAmount,
        behavior: 'smooth',
      });

      scrollAmount += posterWidthRef.current;

      if (scrollAmount >= totalWidthRef.current) {
        scrollAmount = 0;
      }
    };

    const scrollInterval = setInterval(scrollStep, 2000);

    return () => {
      clearInterval(scrollInterval);
    };
  }, []);

  return (
    <div className="overflow-hidden relative w-[95%] mx-auto mt-5 ">
      <div
        ref={scrollContainerRef}
        className="flex space-x-4 scroll-horizontal"
      >
        {posters.map((poster) => (
          <div key={poster.id} className="flex-none w-60">
            <img
              src={poster.image}
              alt={poster.title}
              className="h-full w-full object-cover rounded-lg"
            />
          </div>
        ))}
        {/* Duplicate posters for circular scrolling */}
        {posters.map((poster) => (
          <div key={poster.id + '-duplicate'} className="flex-none w-60">
            <img
              src={poster.image}
              alt={poster.title}
              className="h-full w-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePagePosters;