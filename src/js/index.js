const cards = document.querySelectorAll('.bar-btn');
const arrow = document.querySelector('.how-card__arrow')
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

    e.preventDefault();
    const current = e.currentTarget;
    current.classList.add('active');

    moveArrow(current);

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
  const currentOverlay = this.parentNode.parentNode;
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



//NAV SCROLLING

let navOverlay = document.querySelector('.nav-overlay');
let navOverlayHeader = navOverlay.querySelector('.nav-overlay__header');

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      if(e.target.classList.contains('btn--tiles')){
        return;
      }
      e.preventDefault();
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
  });
});
