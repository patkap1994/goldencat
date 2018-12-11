//NAV HAMBURGER
const hamburgerBtn = document.querySelector('.main-nav__hamburger');
const hamburgerList = document.querySelector('.main-nav__list');
const navOverlay = document.querySelector('.nav-overlay');
const navOverlayHeader = navOverlay.querySelector('.nav-overlay__header');

let hamburgerMenuOpened = false;

hamburgerBtn.addEventListener('click', ()=>{
  hamburgerBtn.classList.toggle('active');
  hamburgerMenuOpened = !hamburgerMenuOpened;
  toggleMenu();
});

function toggleMenu() {
  if(hamburgerMenuOpened) {
    hamburgerList.classList.add('active');

    setTimeout(()=>{
      hamburgerList.classList.add('show');
    }, 100);
  } else {
    hamburgerList.classList.remove('show');

    setTimeout(()=>{
      hamburgerList.classList.remove('active');
    },300);
  }
}


//SCROLLING TO SECTIONS WITH NAV LINKS
document.querySelectorAll('a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    if(e.target.dataset.navtext){
      if (hamburgerMenuOpened) {
        document.querySelector(this.getAttribute('href')).scrollIntoView();
        hamburgerMenuOpened = !hamburgerMenuOpened;
        hamburgerList.classList.remove('show');

        setTimeout(()=>{
          hamburgerBtn.classList.remove('active');
          hamburgerList.classList.remove('active');
        },300);

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
      }, 1000);}
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

function scaleBox(e) {
  boxes.forEach(box=>{
    box.classList.remove('active');
  });

  e.currentTarget.classList.add('active');
}

function scaleMiddleBox() {
  boxes.forEach(box=>{
    box.classList.remove('active');
  });

  boxes[1].classList.add('active');
}

//WHY US TILES
const tiles = document.querySelectorAll('.tile');
const closeBtn = document.querySelectorAll('.overlay__btn');
const overlay = document.querySelector('.overlay');
const overlayContainer = document.querySelectorAll('.overlay__container');

tiles.forEach((tile)=>{
  tile.addEventListener('click', openWindow);
});

closeBtn.forEach((btn)=>{
  btn.addEventListener('click', closeWindow);
});

function openWindow(e) {
  e.preventDefault();
  if(e.target.classList.contains('btn--tiles')) {
    let overlayNumber = e.target.dataset.overlaynumber; 

    this.classList.add('slide-out');
    setTimeout(()=>{
      document.body.style.overflow = 'hidden';
      this.classList.add('scale-up');
      setTimeout(()=>{
        overlay.classList.add('active');
      }, 500);
      setTimeout(()=>{
        overlayContainer[overlayNumber].classList.add('show');
      }, 700);
    }, 300);
  } 
}

function closeWindow() {
  const currentOverlayContainer = this.parentNode.parentNode;

  currentOverlayContainer.classList.remove('show');

  setTimeout(()=>{
    overlay.classList.remove('active');
    tiles.forEach((tile)=>{
      setTimeout(()=>{
        if(tile.classList.contains('scale-up')){
          tile.classList.remove('scale-up');
          document.body.style.overflowY = 'auto';
          setTimeout(()=>{
            tile.classList.remove('slide-out');
            }, 500);
        }
      }, 200);
    });
  }, 500);  
}


//PHOTO GALLERY
const photos = document.querySelectorAll('.gallery__container img');
const galleryOverlay = document.querySelector('.gallery-overlay');
const overlayPhoto = document.querySelector('.gallery-overlay__photo');
const prevBtn = document.querySelector('.gallery-overlay__btn--prev');
const nextBtn = document.querySelector('.gallery-overlay__btn--next');

let galleryActive = false;
let currentPhotoNumber;

photos.forEach((photo, i)=>{
  photo.addEventListener('click', ()=>{
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
  const src = photos[i].src;
  const newSrc = src.replace('_small.jpg', '.jpg');

  overlayPhoto.src = newSrc;

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

//SHOW MORE PHOTOS
const showMoreBtn = document.querySelector('.gallery__button');
let showingMorePhotos = false;

showMoreBtn.addEventListener('click', toggleMorePhotos);

function toggleMorePhotos() {
  showingMorePhotos = !showingMorePhotos;

  photos.forEach((photo)=>{
    if(showingMorePhotos && window.getComputedStyle(photo).display == 'none') {
      photo.classList.add('show');
    } else {
      photo.classList.remove('show');
    }
    showMoreBtn.innerHTML = showingMorePhotos ? 'Pokaż mniej' : 'Pokaż więcej';
  });
}


