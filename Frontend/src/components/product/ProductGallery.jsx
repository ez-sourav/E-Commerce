import { useEffect, useState } from "react";
import { ZoomIn, ImageOff } from "lucide-react";

const ProductGallery = ({ product }) => {
  // Support either product.images (array) or a single product.image
  const images =
    product?.images?.length > 0
      ? product.images.map((img) => img.url)
      : product?.image?.url
      ? [product.image.url]
      : [];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  // Reset to first image whenever the product changes
  useEffect(() => {
    setActiveIndex(0);
  }, [product?._id]);

  const activeImage = images[activeIndex];

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="w-full">
      {/* Main image */}
      <div
        className="group relative aspect-square w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-50"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        {activeImage ? (
          <>
            <img
              src={activeImage}
              alt={product?.productName}
              className="h-full w-full object-contain transition-transform duration-200 ease-out will-change-transform hidden sm:block"
              style={
                isZoomed
                  ? {
                      transform: "scale(1.8)",
                      transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    }
                  : undefined
              }
            />
            {/* Simpler, non-zooming version for touch devices */}
            <img
              src={activeImage}
              alt={product?.productName}
              className="h-full w-full object-contain sm:hidden"
            />

            <div className="pointer-events-none absolute right-3 top-3 hidden items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 sm:flex">
              <ZoomIn size={13} />
              Hover to zoom
            </div>
          </>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center text-gray-400">
            <ImageOff size={40} strokeWidth={1.5} className="mb-2" />
            <p className="text-sm">No image available</p>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 sm:mt-4 sm:gap-3">
          {images.map((img, index) => (
            <button
              key={img + index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`aspect-square h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-gray-50 transition sm:h-20 sm:w-20 ${
                activeIndex === index
                  ? "border-indigo-600"
                  : "border-transparent ring-1 ring-gray-200 hover:ring-gray-300"
              }`}
            >
              <img
                src={img}
                alt={`${product?.productName} thumbnail ${index + 1}`}
                className="h-full w-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;