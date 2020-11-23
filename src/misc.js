let preloadVideo = true;
var connection =
  navigator.connection || navigator.mozConnection || navigator.webkitConnection;
if (connection) {
  if (connection.effectiveType === "cellular") {
    preloadVideo = false;
  }
}

  const imgSrc = document
    .querySelector(".video-bg video")
    .getAttribute("poster");

  // Remove video if connection is cellular
  if (preloadVideo) {
    // Remove src & replace with data-src attribute
    const elem = document.querySelector(".video-bg video");
    elem.parentNode && elem.parentNode.removeChild(elem);
    const elemImg = document.querySelector(".video-bg");
    let image = new Image();
    image.src = imgSrc;
    image.alt = "#";
    elemImg.appendChild(image);
  }


//////////////////////////////////////////

  // Check if mobile
  if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
      isMobile = true;
  } else {
      isMobile = false
  }
  const imgSrc = document.querySelector(".video-bg video").getAttribute('poster');

  // Remove video if not mobile
  if (isMobile) {
      // Remove src & replace with data-src attribute
      const elem = document.querySelector(".video-bg video");
       elem.parentNode && elem.parentNode.removeChild(elem);
       const elemImg = document.querySelector(".video-bg");
       let image = new Image();
       image.src = imgSrc;
       image.alt = '#';
       elemImg.appendChild(image)
  }




