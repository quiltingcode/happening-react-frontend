import { useEffect, useState } from "react";


export const ScrollToTop = () => {

  const [showButton, setShowButton] = useState(false);


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