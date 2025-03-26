"use client";

import { useEffect, useRef } from "react";

export default function FaviconExport() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set background color to match the dark theme
    ctx.fillStyle = "#363949";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw a simplified icon version with just the arrows
    ctx.strokeStyle = "#18cb96"; // Primary teal color
    ctx.lineWidth = 6;

    // First arrow
    ctx.beginPath();
    ctx.moveTo(12, 12);
    ctx.lineTo(24, 24);
    ctx.lineTo(36, 12);
    ctx.stroke();

    // Second arrow
    ctx.beginPath();
    ctx.moveTo(12, 28);
    ctx.lineTo(24, 40);
    ctx.lineTo(36, 28);
    ctx.stroke();

    // Create a download link
    const dataURL = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = dataURL;
    downloadLink.download = "favicon.png";
    
    // Add the link to the document
    document.body.appendChild(downloadLink);
  }, []);

  return (
    <div className="hidden">
      <canvas ref={canvasRef} width={48} height={48} />
    </div>
  );
} 