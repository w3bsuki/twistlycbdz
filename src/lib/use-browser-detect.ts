'use client';

import { useState, useEffect } from 'react';

interface BrowserInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isSafari: boolean;
  isChrome: boolean;
  isFirefox: boolean;
  isEdge: boolean;
  isIE: boolean;
  isTouchDevice: boolean;
  supportsWebP: boolean;
  supportsAvif: boolean;
  os: 'ios' | 'android' | 'windows' | 'mac' | 'linux' | 'unknown';
}

/**
 * A hook that detects browser and device information
 * @returns Object containing browser and device details
 */
export function useBrowserDetect(): BrowserInfo {
  const [browserInfo, setBrowserInfo] = useState<BrowserInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true, // Default to desktop
    isSafari: false,
    isChrome: false,
    isFirefox: false,
    isEdge: false,
    isIE: false,
    isTouchDevice: false,
    supportsWebP: false,
    supportsAvif: false,
    os: 'unknown',
  });

  useEffect(() => {
    // Function to detect browser
    const detectBrowser = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const vendor = navigator.vendor?.toLowerCase() || '';
      
      // Detect browsers
      const isSafari = (userAgent.includes('safari') && !userAgent.includes('chrome')) || 
                       (/apple/i.test(vendor) && /safari/i.test(userAgent) && !/chrome/i.test(userAgent));
      const isChrome = userAgent.includes('chrome') && !userAgent.includes('edge');
      const isFirefox = userAgent.includes('firefox');
      const isEdge = userAgent.includes('edg');
      const isIE = userAgent.includes('trident');
      
      // Detect device type
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const isTabletDevice = /(tablet|ipad|playbook|silk)|(android(?!.*mobile))/i.test(userAgent);
      
      // Check touch device
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // Detect OS
      let os: BrowserInfo['os'] = 'unknown';
      if (userAgent.includes('win')) os = 'windows';
      else if (userAgent.includes('mac')) os = 'mac';
      else if (userAgent.includes('iphone') || userAgent.includes('ipad') || userAgent.includes('ipod')) os = 'ios';
      else if (userAgent.includes('android')) os = 'android';
      else if (userAgent.includes('linux')) os = 'linux';
      
      // Update browser info
      setBrowserInfo({
        isMobile: isMobileDevice && !isTabletDevice,
        isTablet: isTabletDevice,
        isDesktop: !isMobileDevice && !isTabletDevice,
        isSafari,
        isChrome,
        isFirefox,
        isEdge,
        isIE,
        isTouchDevice,
        supportsWebP: false, // Will be set later
        supportsAvif: false, // Will be set later
        os,
      });
    };
    
    // Detect WebP support
    const detectWebP = () => {
      const webP = new Image();
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
      webP.onload = () => {
        setBrowserInfo(prev => ({ ...prev, supportsWebP: true }));
      };
    };
    
    // Detect AVIF support
    const detectAvif = () => {
      const avif = new Image();
      avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';
      avif.onload = () => {
        setBrowserInfo(prev => ({ ...prev, supportsAvif: true }));
      };
    };
    
    // Call detection functions
    detectBrowser();
    detectWebP();
    detectAvif();
    
    // Cleanup functions if needed
    return () => {
      // Any cleanup if needed
    };
  }, []);
  
  return browserInfo;
}

/**
 * Example usage:
 * 
 * function MyComponent() {
 *   const browser = useBrowserDetect();
 *   
 *   return (
 *     <div>
 *       {browser.isMobile && <MobileOptimizedContent />}
 *       {browser.isDesktop && <DesktopOptimizedContent />}
 *       {browser.supportsWebP ? <WebPImage /> : <FallbackImage />}
 *     </div>
 *   );
 * }
 */ 