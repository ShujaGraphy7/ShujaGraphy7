// Favicon Animator - Cycles through SHUJA letters
(function() {
  
  const favicons = [
    '/favicon-s.svg',
    '/favicon-h.svg', 
    '/favicon-u.svg',
    '/favicon-j.svg',
    '/favicon-a.svg'
  ];
  
  let currentIndex = 0;
  const faviconElement = document.querySelector('link[rel="icon"]');
  
  function changeFavicon() {
    if (faviconElement) {
      const newFavicon = favicons[currentIndex];
      faviconElement.href = newFavicon;
      currentIndex = (currentIndex + 1) % favicons.length;
    } else {
      console.error('No favicon element found');
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
