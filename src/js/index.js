

//NAV HAMBURGER
const hamburgerBtn = document.querySelector('.main-nav__hamburger');
const hamburgerList = document.querySelector('.main-nav__list');

let hamburgerMenuOpened = false;

hamburgerBtn.addEventListener('click', ()=>{
  hamburgerBtn.classList.toggle('active');
  hamburgerMenuOpened = !hamburgerMenuOpened;
  toggleMenu();
});

function toggleMenu() {
  if(hamburgerMenuOpened) {
    hamburgerList.classList.add('show');
  } else {
    hamburgerList.classList.remove('show');
  }
}


//SCROLLING TO SECTIONS WITH NAV LINKS
const navOverlay = document.querySelector('.nav-overlay');
const navOverlayHeader = navOverlay.querySelector('.nav-overlay__header');

document.querySelectorAll('a[data-navtext]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    if (hamburgerMenuOpened) {
      document.querySelector(this.getAttribute('href')).scrollIntoView();
      hamburgerMenuOpened = !hamburgerMenuOpened;
      hamburgerList.classList.remove('show');
      hamburgerBtn.classList.remove('active');

    } else {
      navOverlay.classList.add('active');
      navOverlayHeader.innerText = '';

      navOverlay.addEventListener('transitionend', ()=>{
        navOverlayHeader.innerText = e.target.dataset.navtext;
      });

      setTimeout(()=>{
        document.querySelector(this.getAttribute('href')).scrollIntoView();
        navOverlay.classList.remove('active');
        navOverlayHeader.innerText = '';
      }, 1000);
    }
  });
});


//CARDS
const cards = document.querySelectorAll('.bar-btn');
const arrow = document.querySelector('.how-card__arrow');
const cardContainers = document.querySelectorAll('.how-card__container');

const halfOfArrow = arrow.clientWidth / 2;
let current = cards[0];

window.addEventListener('load', moveArrow);
window.addEventListener('resize', moveArrow);

cards.forEach((card)=>{
  card.addEventListener('click', changeCard);
});

function changeCard(e) {
  e.preventDefault();
  
  current = e.currentTarget;
  let currentCardNumber = current.dataset.numberOfCard;
  
  cards.forEach((card)=>{
    card.classList.remove('active');
  });

  current.classList.add('active');

  cardContainers.forEach((container)=>{
    container.classList.remove('active');
    container.classList.remove('show');
  });

  cardContainers[currentCardNumber].classList.add('active');

  setTimeout(()=>{
    cardContainers[currentCardNumber].classList.add('show');
  }, 100);

  moveArrow();
}

function moveArrow() {
  const middleOfCard = (current.offsetLeft + current.clientWidth / 2);
  arrow.style.left = `${middleOfCard - halfOfArrow}px`;
}

//BOXES
const boxes = document.querySelectorAll('.box');

boxes.forEach((box)=>{
  box.addEventListener('mouseover', scaleBox);
  box.addEventListener('mouseout', scaleMiddleBox);
})

function removeActive() {
  boxes.forEach(box=>{
    box.classList.remove('active');
  });
}

function scaleBox(e) {
  removeActive();
  e.currentTarget.classList.add('active');
}

function scaleMiddleBox() {
  removeActive();
  boxes[2].classList.add('active');
}

//WHY US TILES
// const tiles = document.querySelectorAll('.tile');
// const closeBtn = document.querySelectorAll('.overlay__btn');
// const overlay = document.querySelector('.overlay');
// const overlayContainer = document.querySelectorAll('.overlay__container');

// tiles.forEach((tile)=>{
//   tile.addEventListener('click', openWindow);
// });

// closeBtn.forEach((btn)=>{
//   btn.addEventListener('click', closeWindow);
// });

// function openWindow(e) {
//   e.preventDefault();
//   if(e.target.classList.contains('btn--tiles')) {
//     let overlayNumber = e.target.dataset.overlaynumber; 

//     this.classList.add('slide-out');
//     setTimeout(()=>{
//       document.body.style.overflow = 'hidden';
//       this.classList.add('scale-up');
//       setTimeout(()=>{
//         overlay.classList.add('active');
//       }, 500);
//       setTimeout(()=>{
//         overlayContainer[overlayNumber].classList.add('show');
//       }, 700);
//     }, 300);
//   } 
// }

// function closeWindow() {
//   const currentOverlayContainer = this.parentNode.parentNode;

//   currentOverlayContainer.classList.remove('show');

//   setTimeout(()=>{
//     overlay.classList.remove('active');
//     tiles.forEach((tile)=>{
//       setTimeout(()=>{
//         if(tile.classList.contains('scale-up')){
//           tile.classList.remove('scale-up');
//           document.body.style.overflowY = 'auto';
//           setTimeout(()=>{
//             tile.classList.remove('slide-out');
//             }, 500);
//         }
//       }, 200);
//     });
//   }, 500);  
// }


//PHOTO GALLERY
// const photos = document.querySelectorAll('.gallery__container img');
// const galleryOverlay = document.querySelector('.gallery-overlay');
// const overlayPhoto = document.querySelector('.gallery-overlay__photo');
// const prevBtn = document.querySelector('.gallery-overlay__btn--prev');
// const nextBtn = document.querySelector('.gallery-overlay__btn--next');

// let galleryActive = false;
// let currentPhotoNumber;

// photos.forEach((photo, i)=>{
//   photo.addEventListener('click', ()=>{
//     currentPhotoNumber = i;
//     showPhoto(currentPhotoNumber);
//   });
// });

// prevBtn.addEventListener('click', showPrevPhoto);
// nextBtn.addEventListener('click', showNextPhoto);

// galleryOverlay.addEventListener('click', (e)=>{
//   if(e.target.classList.contains('gallery-overlay') || e.target.classList.contains('gallery-overlay__close-btn')){
//     document.body.style.overflowY = '';
//     galleryOverlay.classList.remove('show');
//     setTimeout(()=>{
//       galleryOverlay.classList.remove('active');
//     },300);
//   }
// })

// function showPhoto(i) {
//   const src = photos[i].src;
//   const newSrc = src.replace('_small.jpg', '.jpg');

//   overlayPhoto.src = newSrc;

//   if(!galleryOverlay.classList.contains('active')){
//     document.body.style.overflowY = 'hidden';
//     galleryOverlay.classList.add('active');
//     setTimeout(()=>{
//       galleryOverlay.classList.add('show');
//     },100);
//   }
// }

// function showPrevPhoto(){
//   if(currentPhotoNumber === 0){
//     currentPhotoNumber = photos.length-1;
//   } else {
//     currentPhotoNumber -= 1;
//   }
//   showPhoto(currentPhotoNumber);
// }

// function showNextPhoto() {
//   if(currentPhotoNumber === photos.length - 1) {
//     currentPhotoNumber = 0;
//   } else {
//     currentPhotoNumber += 1;
//   }
//   showPhoto(currentPhotoNumber);
// }

// //SHOW MORE PHOTOS
// const showMoreBtn = document.querySelector('.gallery__button');
// let showingMorePhotos = false;

// showMoreBtn.addEventListener('click', toggleMorePhotos);

// function toggleMorePhotos() {
//   showingMorePhotos = !showingMorePhotos;

//   photos.forEach((photo)=>{
//     if(showingMorePhotos && photo.classList.contains('visible')) {
//       photo.classList.add('visible');
//     } else {
//       photo.classList.remove('visible');
//     }
//     showMoreBtn.innerHTML = showingMorePhotos ? 'Pokaż mniej' : 'Pokaż więcej';
//   });
// }


//SHOWING MORE PHOTOS
const photos = document.querySelectorAll('.gallery__container img');
const showMoreBtn = document.querySelector('.gallery__button');

let showingMorePhotos = false;

showMoreBtn.addEventListener('click', showMorePhotos);

function showMorePhotos(e) {
  e.preventDefault();

  showingMorePhotos = !showingMorePhotos;

  for(let i = 6; i < photos.length; i++) {
    if(showingMorePhotos && !photos[i].classList.contains('visible')){
      photos[i].classList.add('visible');
      showMoreBtn.innerText = 'Pokaż mniej';
    } else {
      photos[i].classList.remove('visible');
      showMoreBtn.innerText = 'Pokaż więcej';
    }
  }
}

//SHOW LARGE PHOTO
// const photosContainer = document.querySelector('.gallery__container');

// photosContainer.addEventListener('click', (e)=>{
//   if(e.target.tagName == 'IMG'){
//     e.preventDefault();
//     showPhoto(e.target);
//   }
// });

// function showPhoto(photo) {
//   console.log(photo);
// };


//PHOTO GALLERY
const galleryOverlay = document.querySelector('.gallery-overlay');
const prevBtn = document.querySelector('.gallery-overlay__btn--prev');
const nextBtn = document.querySelector('.gallery-overlay__btn--next');

let galleryActive = false;
let currentPhotoNumber;

photos.forEach((photo, i)=>{
  photo.addEventListener('click', (e)=>{
    currentPhotoNumber = i;
    showPhoto(currentPhotoNumber);
  });
});

prevBtn.addEventListener('click', showPrevPhoto);
nextBtn.addEventListener('click', showNextPhoto);

galleryOverlay.addEventListener('click', (e)=>{
  if(e.target.classList.contains('gallery-overlay') || e.target.classList.contains('gallery-overlay__close-btn')){
    document.body.style.overflowY = '';
    galleryOverlay.classList.remove('show');
    setTimeout(()=>{
      galleryOverlay.classList.remove('active');
    },300);
  }
})

function showPhoto(i) {
  const overlayPhoto = document.querySelector('.gallery-overlay__photo');
  const src = photos[i].getAttribute('src');
  const newSrc = src.replace('_small.jpg', '.jpg');

  let image = new Image();
  image.src = newSrc;
  image.classList.add('gallery-overlay__photo');

  image.addEventListener('load', ()=>{
    overlayPhoto.parentElement.replaceChild(image, overlayPhoto);
  })

  // overlayPhoto.setAttribute('src', newSrc);

  if(!galleryOverlay.classList.contains('active')){
    document.body.style.overflowY = 'hidden';
    galleryOverlay.classList.add('active');
    setTimeout(()=>{
      galleryOverlay.classList.add('show');
    },100);
  }
}

function showPrevPhoto(){
  if(currentPhotoNumber === 0){
    currentPhotoNumber = photos.length-1;
  } else {
    currentPhotoNumber -= 1;
  }
  showPhoto(currentPhotoNumber);
}

function showNextPhoto() {
  if(currentPhotoNumber === photos.length - 1) {
    currentPhotoNumber = 0;
  } else {
    currentPhotoNumber += 1;
  }
  showPhoto(currentPhotoNumber);
}


























//SCROLLING TO TOP

  const html = document.documentElement;
  const body = document.body;
  const scrollToTopButton = document.querySelector('.btn--up');

  scrollToTopButton.addEventListener('click', ()=>{
    scrollToTop(300,3);
  });


function scrollToTop(totalTime, easingPower) {
  var timeInterval = 1;

  var scrollTop = Math.round(body.scrollTop || html.scrollTop);

  var timeLeft = totalTime;
  var scrollByPixel = setInterval(function() {
    var percentSpent = (totalTime - timeLeft) / totalTime;
    if (timeLeft >= 0) {
      var newScrollTop = scrollTop * (1 - easeInOut(percentSpent, easingPower));
      body.scrollTop = newScrollTop;
      html.scrollTop = newScrollTop;
      //console.log(easeInOut(percentSpent,easingPower));
      timeLeft--;
    } else {
      clearInterval(scrollByPixel);
      //Add hash to the url after scrolling
      //window.location.hash = hash;
    }
  }, timeInterval);
}

function easeInOut(t, power) {
  if (t < 0.5) {
    return 0.5 * Math.pow(2 * t, power);
  } else {
    return 0.5 * (2 - Math.pow(2 * (1 - t), power));
  }
}


