import { useState, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

const ImageContainer = ({
  fileData,
  index,
  setIsImageOpen,
}: {
  fileData: any[];
  index: number;
  setIsImageOpen: (isImageOpen: boolean) => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(index);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const changeImage = (newIndex: number, dir: "left" | "right") => {
    if (animating) return; // Prevent double triggers
    setDirection(dir);
    setAnimating(true);

    setTimeout(() => {
      setCurrentIndex(newIndex);
      setAnimating(false);
      setDirection(null);
    }, 300); // Match transition duration
  };

  const goLeft = () => {
    if (currentIndex > 0) changeImage(currentIndex - 1, "right");
  };

  const goRight = () => {
    if (currentIndex < fileData.length - 1) changeImage(currentIndex + 1, "left");
  };

  // Swipe detection for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const deltaX = touchStartX.current - touchEndX.current;

    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) goRight();
      else goLeft();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="w-[100dvw] h-[100dvh] bg-black bg-opacity-30 fixed -top-4 left-0 flex justify-center items-center z-50">
      <div className="bg-slate-950 w-[90dvw] h-[90dvh] relative rounded-xl" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} >

        {/* Close Button */}
        <button onClick={() => setIsImageOpen(false)} className="bg-gray-200 hover:bg-gray-300 transition-all p-1 rounded-full absolute top-5 right-5 z-10">
          <IoClose className="text-3xl text-gray-600" />
        </button>

        {/* Left Button (Desktop only) */}
        {currentIndex !== 0 && (
          <FaChevronCircleLeft onClick={goLeft} className="hidden sm:block absolute top-1/2 -translate-y-1/2 text-[3rem] text-white -left-10 cursor-pointer hover:text-gray-200 transition-all z-10" />
        )}

        {/* Image with smooth sliding */}
        <img key={currentIndex} // force re-render on change
          src={fileData[currentIndex].url}
          alt="Post"
          className={`max-w-full max-h-full object-contain select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-in-out
            ${animating ? (direction === "left" ? "-translate-x-[120%]" : "translate-x-[120%]") : ""}
          `}
        />

        {/* Right Button (Desktop only) */}
        {currentIndex !== fileData.length - 1 && (
          <FaChevronCircleRight
            onClick={goRight}
            className="hidden sm:block absolute top-1/2 -translate-y-1/2 text-[3rem] text-white -right-10 cursor-pointer hover:text-gray-200 transition-all z-10"
          />
        )}

        {/* Post Counter */}
        <p className="bg-white absolute -bottom-5 left-1/2 px-3 py-1 rounded-lg -translate-x-1/2 select-none">
          Post {currentIndex + 1} / {fileData.length}
        </p>
      </div>
    </div>
  );
};

export default ImageContainer;
