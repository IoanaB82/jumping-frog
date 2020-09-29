
let updateWidth = function(){
  let availableWidth = document.querySelector('.header').offsetWidth;
let transitionWidth = availableWidth + 500;
console.log( availableWidth, transitionWidth);
return transitionWidth;
}



var tl = anime.timeline({
    duration: 15000,
    autoplay: true,
    loop: true,
    
  });
  
  tl.add({
    targets: '.scene__cloud',
    translateX: updateWidth,
    direction: 'alternate',
    delay: anime.stagger(1500),
    easing: 'easeOutQuad'
  });

 

  //generate DROPS on click
  let clouds = document.querySelectorAll('.scene__cloud');
 
  let cloudsArray = [...clouds];
  cloudsArray.forEach(cloud => {

    let clickedPath = cloud.querySelector('svg path')
    clickedPath.addEventListener('click', generateDrops);
    
   
  });
 
  let totalDrops = 0;
  

  function generateDrops(event) { 
    
      createDrops(event);
      
      //setTimeout(deleteDrops(), 2000);
  }


  function createDrops(event) {
   
    let clicked = event.target.parentNode;
    console.log(clicked+'create');
    let rain = document.createElement('div');
    rain.classList.add('scene__rain');
    clicked.after(rain);
    //containerElement = clicked.getElementsByClassName('.rain');
    //container = containerElement[0];
    console.log(clicked);
    let i = 0;
    while (i<5) {
  
    let x = Math.floor(Math.random() * 100);
    let y = Math.floor(Math.random() * 10);
    let duration = Math.random() * 1; 
    let drop = document.createElement('div');
   
    drop.style.width = "10px";
    drop.style.height = "10px";
     drop.style.top = y+'px';
    drop.style.left= x+'px';
    
    drop.style.borderRadius = "0% 50% 50% 50%";
   drop.classList.add('scene__drop');
    
    drop.style.backgroundColor = 'blue';
    drop.style.transform ='rotate(50deg)';
   
   
    drop.style.animationDuration = 2 + duration+'s';
   
    
    rain.appendChild(drop);
    totalDrops++;
    i++;
   
    }

    setTimeout(deleteDrops =>{
      clicked.parentNode.removeChild(rain);
    }, 2000);
   
  }
  


  //get all the frogs in an array
  let frogsContainer = document.querySelector('.scene__frog');
let frogs = frogsContainer.getElementsByTagName('img');
let frogsArray = [ ...frogs ];

//add animation on the frogs
  var path = anime.path('#hills');
  var animation = anime({
    targets: frogsArray,
    translateX: path('x'),
    translateY: path('y'),
    rotate: path('angle'),
    easing: 'linear',
    duration: 10000,
    delay: anime.stagger(100),
    loop: true,
  
  });
  animation.play();


let stopButton = document.getElementById('stop');
let moreButton = document.getElementById('more');
  stopButton.addEventListener('click', toggleButtonStop);
moreButton.addEventListener('click', toggleButtonMore);

  function toggleButtonStop (event) {
    
    if(event.target.value == "stop") {
        animation.pause();
        stopButton.value = "start";
        stopButton.innerHTML = "Start the frog";
    }

    else if(event.target.value == "start") {
      animation.play();
      stopButton.value = "stop";
      stopButton.innerHTML = "Stop the frog";
    }
    
  }

  function toggleButtonMore (event) {
     if(event.target.value === "more") {
          if(frogsArray.length !==3) {
            addFrog();
            let j = frogsArray.length;
            
           anime({
            targets: '.scene__frog img:nth-child('+j+')',
            translateX: path('x'),
            translateY: path('y'),
            rotate: path('angle'),
            easing: 'linear',
            duration: 10000,
    
            loop: true,
           });

            }
         if(frogsArray.length===3){moreButton.value = "delete";
          moreButton.innerHTML = "Delete frogs";} 
      }
        
    

      else if(event.target.value === "delete") {
      
      if(frogsArray.length!==1) {
        deleteFrog();
        console.log(frogsArray.length);
      }

     if(frogsArray.length ===1) {
        moreButton.value = "more";
        moreButton.innerHTML = "More frogs";
      }
          
    }

    
  }

  function addFrog() {
    let newFrog = document.createElement('img');
          newFrog.src = '../img/giphy1.gif';
          newFrog.classList.add('frog__img');
          frogsContainer.appendChild(newFrog);
          frogsArray.push(newFrog);
          
  }

  function deleteFrog() {
    let lastFrog = frogsContainer.lastChild;
    frogsContainer.removeChild(lastFrog);
    frogsArray.splice(0,1);
  
    
  }

