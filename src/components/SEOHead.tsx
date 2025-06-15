
import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
}

const SEOHead = ({ 
  title = "Experimental Playground - Priyanshu Chawda | Creative Digital Experience",
  description = "An immersive experimental showcase of creativity, motion, and digital artistry by Priyanshu Chawda. Experience interactive web design that pushes boundaries.",
  canonical = "https://playground.priyanshutech.xyz",
  ogImage = "https://lovable.dev/opengraph-image-p98pqg.png"
}: SEOHeadProps) => {
  useEffect(() => {
    // Update meta tags dynamically
    document.title = title;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
    
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', description);
    }
    
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', canonical);
    }
  }, [title, description, canonical, ogImage]);

  return null;
};

export default SEOHead;
