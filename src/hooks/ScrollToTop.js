import { useEffect } from "react";


export const ScrollToTop = (showButton) => {


    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behaviour: 'smooth' });
    };

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

      return (
        <>
        {showButton && (
            <div className={styles.ScrollToTop}>
              <Button 
                className="fixed-bottom-5 right-7 z-50 cursor-pointer p-4" 
                onClick={handleScrollToTop}
              >
                <i className="fa-solid fa-circle-arrow-up" alt="scroll to top"></i>
              </Button>
            </div>
          )}
          </>
      )

};