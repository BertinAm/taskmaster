"use client";

import { useState } from "react";
import LogoExport from "@/components/LogoExport";
import FaviconExport from "@/components/FaviconExport";

export default function GenerateFavicon() {
  const [showLogo, setShowLogo] = useState(true);
  
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">TaskMaster Logo & Favicon Generator</h1>
      <p className="mb-6">Generate and download logo and favicon files for TaskMaster.</p>
      
      <div className="flex mb-6">
        <button 
          className={`py-2 px-4 mr-2 ${showLogo ? 'bg-primary text-white' : 'bg-gray-700 text-gray-200'} rounded`}
          onClick={() => setShowLogo(true)}
        >
          Full Logo
        </button>
        <button 
          className={`py-2 px-4 ${!showLogo ? 'bg-primary text-white' : 'bg-gray-700 text-gray-200'} rounded`}
          onClick={() => setShowLogo(false)}
        >
          Favicon
        </button>
      </div>
      
      {showLogo ? (
        <>
          <LogoExport />
          <button 
            className="bg-primary text-white py-2 px-4 rounded"
            onClick={() => {
              const downloadLink = document.querySelector('a[download="logo_white.png"]');
              if (downloadLink) (downloadLink as HTMLAnchorElement).click();
            }}
          >
            Download Logo
          </button>
          <p className="mt-4 text-sm">
            After downloading, place the logo in the public/images directory and name it logo_white.png.
          </p>
        </>
      ) : (
        <>
          <FaviconExport />
          <button 
            className="bg-primary text-white py-2 px-4 rounded"
            onClick={() => {
              const downloadLink = document.querySelector('a[download="favicon.png"]');
              if (downloadLink) (downloadLink as HTMLAnchorElement).click();
            }}
          >
            Download Favicon
          </button>
          <p className="mt-4 text-sm">
            After downloading, place the favicon in the public/images directory and name it favicon.png.
          </p>
        </>
      )}
      
      <div className="mt-8 p-4 bg-gray-800 rounded">
        <h2 className="text-lg font-bold mb-2">Using the Favicon</h2>
        <p className="mb-2">To use the favicon, update the icons section in your layout.tsx file:</p>
        <pre className="bg-gray-900 p-3 rounded overflow-x-auto text-sm">
{`export const metadata: Metadata = {
  // ...other metadata
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/logo_white.png",
  },
  // ...other metadata
};`}
        </pre>
      </div>
    </div>
  );
} 