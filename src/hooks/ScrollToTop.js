import { useEffect } from "react";


export const ScrollToTop = () => {


    useEffect(() => {
        // 'to top' Button is displayed after user scrolls for 300 pixels
        const handleScrollButtonVisibility = () => {
          window.pageYOffset > 300 ? setShowButton(true) : setShowButton(false);
        };
  
        window.addEventListener('scroll', handleScrollButtonVisibility);
  
        return () => {
          window.removeEventListener('scroll', handleScrollButtonVisibility);
        };
      }, []);


};