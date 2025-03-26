"use client";

import { useEffect, useRef } from "react";

export default function LogoExport() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set background color to match the dark theme
    ctx.fillStyle = "#363949";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw text "taskmaster"
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 40px Arial";
    ctx.fillText("taskmaster", 20, 80);

    // Draw the arrows
    ctx.strokeStyle = "#18cb96"; // Primary teal color
    ctx.lineWidth = 6;

    // First arrow
    ctx.beginPath();
    ctx.moveTo(280, 40);
    ctx.lineTo(300, 60);
    ctx.lineTo(320, 40);
    ctx.stroke();

    // Second arrow
    ctx.beginPath();
    ctx.moveTo(280, 70);
    ctx.lineTo(300, 90);
    ctx.lineTo(320, 70);
    ctx.stroke();

    // Create a download link
    const dataURL = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = dataURL;
    downloadLink.download = "logo_white.png";
    
    // Add the link to the document
    document.body.appendChild(downloadLink);
  }, []);

  return (
    <div className="hidden">
      <canvas ref={canvasRef} width={400} height={150} />
    </div>
  );
} 