import React from 'react';

const ProgressBar = ({ progress }) => {
  const radius = 45; 
  const strokeWidth = 8; 
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg
        className="w-24 h-24"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#e5e7eb" 
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#3b82f6" 
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 50 50)" 
        />
      </svg>
      <span className="absolute text-xl font-bold text-blue-500">
        {Math.round(progress)}%
      </span>
    </div>
  );
};

export default ProgressBar;
