
const ScrollToTop = () => {

  const mybutton = document.getElementById("scrollBtn");

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function() {scrollFunction()};

  
  function scrollFunction() {
    if (window.pageYOffset > 700) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }
};

export default ScrollToTop