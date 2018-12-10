//CARDS
const cards = document.querySelectorAll('.bar-btn');
const arrow = document.querySelector('.how-card__arrow');
const cardContainers = document.querySelectorAll('.how-card__container');
const halfOfArrow = arrow.clientWidth / 2;

window.addEventListener('load', ()=>{
  const current = cards[0];
  current.classList.add('active');

  moveArrow(current);
});

window.addEventListener('resize', ()=>{
  let current;
  cards.forEach((card)=>{
    if(card.classList.contains('active')) {
      current = card;
    }
  });
  moveArrow(current);
});

cards.forEach((card)=>{
  card.addEventListener('click', (e) => { 
    cards.forEach((card)=>{
      card.classList.remove('active');
    });

    cardContainers.forEach((container)=>{
      container.classList.remove('active');
      container.classList.remove('show');
    });

    e.preventDefault();
    const current = e.currentTarget;
    const currentCard = e.currentTarget.dataset.numberOfCard;
    console.log(currentCard);

    current.classList.add('active');
    moveArrow(current);

    cardContainers[currentCard].classList.add('active');

    setTimeout(()=>{
      cardContainers[currentCard].classList.add('show');
    }, 100);

  });
});

const moveArrow = (current) => {
  const middleOfCard = (current.offsetLeft + current.clientWidth / 2);
  arrow.style.left = `${middleOfCard - halfOfArrow}px`;
}


//BOXES
const boxes = document.querySelectorAll('.box');

boxes.forEach((box)=>{
  box.addEventListener('mouseout', (e)=> {
    boxes.forEach((box)=>{
      box.classList.remove('active');
      if(e.relatedTarget != box) {
        boxes[1].classList.add('active');
      }
    });
  });

  box.addEventListener('mouseover', (e)=> {
    boxes.forEach((box)=>{
      box.classList.remove('active');
      e.currentTarget.classList.add('active');
    });
  });
});


//WHY US TILES
const tiles = document.querySelectorAll('.tile');
const overlay = document.querySelectorAll('.overlay');
const closeBtn = document.querySelectorAll('.overlay__btn');

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
        overlay[overlayNumber].classList.add('active');
      }, 500);
      setTimeout(()=>{
        overlay[overlayNumber].classList.add('show');
      }, 900);
    }, 300);
  } 
}

function closeWindow() {
  const currentOverlay = this.parentNode.parentNode.parentNode;
  currentOverlay.classList.remove('show');

  setTimeout(()=>{
    tiles.forEach((tile)=>{
      currentOverlay.classList.remove('active');
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



//NAV 
const hamburgerBtn = document.querySelector('.main-nav__hamburger');
const navOverlay = document.querySelector('.nav-overlay');
const navOverlayHeader = navOverlay.querySelector('.nav-overlay__header');
const hamburgerList = document.querySelector('.main-nav__list');

hamburgerBtn.addEventListener('click', ()=>{
  hamburgerBtn.classList.toggle('active');
  hamburgerList.classList.toggle('active');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
      if(e.target.classList.contains('btn--tiles') || e.target.classList.contains('gallery__button')){
        return;
      } else if (e.target.parentNode.parentNode.classList.contains('active')) {
        setTimeout(()=>{
          document.querySelector(this.getAttribute('href')).scrollIntoView();
          e.target.parentNode.parentNode.classList.remove('active');
          hamburgerBtn.classList.remove('active');
        }, 200)
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
  });
});

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


