// Favicon Animator - Cycles through SHUJA letters
(function() {
  console.log('Favicon animator loaded!');
  
  const favicons = [
    '/favicon-s.svg',
    '/favicon-h.svg', 
    '/favicon-u.svg',
    '/favicon-j.svg',
    '/favicon-a.svg'
  ];
  
  let currentIndex = 0;
  const faviconElement = document.querySelector('link[rel="icon"]');
  
  console.log('Found favicon element:', faviconElement);
  console.log('Favicon files:', favicons);
  
  function changeFavicon() {
    if (faviconElement) {
      const newFavicon = favicons[currentIndex];
      console.log('Changing favicon to:', newFavicon);
      faviconElement.href = newFavicon;
      currentIndex = (currentIndex + 1) % favicons.length;
    } else {
      console.log('No favicon element found');
    }
  }
  
  // Change favicon every 1 second
  const interval = setInterval(changeFavicon, 1000);
  console.log('Started favicon animation interval:', interval);
  
  // Initial favicon
  changeFavicon();
  
  // Test if favicon changes are working
  setTimeout(() => {
    console.log('Current favicon href:', faviconElement?.href);
  }, 2000);
})();
