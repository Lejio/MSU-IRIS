import React from "react";

export default function ParticleLogoDark({ size }: { size?: number }) {
  const originalWidth = 110;
  const originalHeight = 118;
  
  // Calculate the dimensions based on the size prop, maintaining the aspect ratio
  const width = size ? `${size}px` : `${originalWidth}px`;
  const height = size ? `${(size * originalHeight) / originalWidth}px` : `${originalHeight}px`;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 110 118"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50.8971 38.4365H59V54.9486H91.5567L54.9486 18.3404L18.3404 54.9486H50.8971V38.4365Z"
        fill="black"
      />
      <path
        d="M59 79.5635H50.8971V63.0514H18.3404L54.9486 99.6596L91.5567 63.0514H59V79.5635Z"
        fill="black"
      />
    </svg>
  );
}
