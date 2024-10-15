import React, { useEffect, useRef } from 'react';
import './ProgressCircle.scss';
import LogoIcon from "icons/logo/Logos.svg";

const ProgressCircle: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // Create a ref for the canvas
  const totalProgress = 100; // Represents 100% progress
  const progressSpeed = 1; // How fast the progress moves

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Exit if the canvas is not available
    const ctx = canvas.getContext('2d');
    if (!ctx) return; // Exit if the context is not available

    // Settings for the progress circle
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 80;
    const startAngle = -Math.PI / 2; // Start from the top (12 o'clock)
    let endAngle = startAngle;
    let currentProgress = 0; // Starting point

    // Draw background circle
    const drawBackgroundCircle = () => {
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      ctx.lineWidth = 10;
      ctx.strokeStyle = '#e0e0e0';
      ctx.stroke();
    };

    // Draw the progress bar
    const drawProgressBar = (progress: number) => {
      endAngle = startAngle + (2 * Math.PI * (progress / totalProgress));
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle, false);
      ctx.lineWidth = 10;
      ctx.strokeStyle = '#76c7c0';
      ctx.lineCap = 'round'; // Rounded edge
      ctx.stroke();
    };

    // Update the progress
    const updateProgress = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas for each update
      drawBackgroundCircle(); // Draw the background circle
      drawProgressBar(currentProgress); // Draw the progress

      if (currentProgress < totalProgress) {
        currentProgress += progressSpeed; // Increment the progress
        requestAnimationFrame(updateProgress); // Continue animating
      }
    };

    // Start the animation
    updateProgress();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div className="progress-container">
      <div className="progress">
      <canvas ref={canvasRef} width={200} height={200} />
      <img
        className="progress-label"
        src={LogoIcon}
        alt="Logo"
      />
    </div>
    </div>
  );
};

export default ProgressCircle;
