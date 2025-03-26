"use client";

import { useTheme } from "./ThemeProvider";
import { useEffect } from "react";

export default function FaviconHandler() {
  const { theme } = useTheme();

  useEffect(() => {
    // Get the existing favicon link element or create one if it doesn't exist
    let link = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }

    // Update the favicon based on the current theme
    link.href = '/images/favicon.svg';
    
    // Add a theme color meta tag or update it if it exists
    let meta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
    }
    
    // Set the theme color based on current theme
    meta.content = theme === 'dark' ? '#363949' : '#FFFFFF';
  }, [theme]);

  // This component doesn't render anything
  return null;
} 