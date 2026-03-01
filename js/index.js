let galery = document.getElementById("galery")
let bigPh = document.getElementById("bigPh")
let board = document.getElementById("board")
let timer = document.getElementById("timer")
let gameInterface = document.getElementById("gameInterface")
let gameEnd = document.getElementById("gameEnd")
let loadingScreen = document.getElementById("loadingScreen")

document.body.style.overflow = 'hidden';
window.addEventListener("load",()=>{
  document.body.style.overflow = '';
  loadingScreen.style.marginTop = "-100vh"
})

//n=total semua foto
for(i = 0; i < 77; i++){
  galery.insertAdjacentHTML("beforeend", `<img src="src/${i}.jpg" class="img">`);
}

let srcInfo = null;

galery.addEventListener("click",function(event){
  if(event.target.tagName==='IMG'){
    srcInfo = event.target.src
    bigPh.children[0].src = srcInfo
    bigPh.className = "big-ph"
    document.body.style.overflow = 'hidden';
  }
})

bigPh.addEventListener("click",function(){
  bigPh.className = "big-ph-hidden"
  document.body.style.overflow = '';
})

//Mini game

// let timerVar = null
// let startTimer = ()=>{
//   timerVar = setInterval(()=>{
//     timer.innerHTML = parseInt(timer.innerHTML)+1
//   },1000)
// }

// let stopTimer = ()=>{
//   clearInterval(timerVar)
//   timer.innerHTML = 0
// }

// startTimer();

// function getPairs() {
//   const nums = new Set();
//   while (nums.size < 6) nums.add(Math.floor(Math.random() * 77));
//   return [...nums, ...nums].sort(() => Math.random() - 0.5);
// }

// let pairs = getPairs();

// for(i = 0; i < 12; i++){
//   board.insertAdjacentHTML("beforeend", `
//   <div class="card">
//     <div class="card-closed"></div>
//     <div class="card-content">
//       <img src="src/${pairs[i]}.jpg" class="card-img">
//     </div>
//   </div>
//   `);
// }

// //get cardState
// let cardState = []
// let allCardDom = document.querySelectorAll(".card")
// for(let i = 0; i < allCardDom.length; i++){
//   cardState.push({
//     src: allCardDom[i].children[1].children[0].src,
//     isOpened: false,
//     dom: allCardDom[i]
//   })
// }

// let openCard = (elem)=>{
//   elem.isOpened = true
//   elem.dom.children[0].className="card-opened"
// }

// let closeCard = (elem)=>{
//   elem.isOpened = false
//   elem.dom.children[0].className="card-closed"
// }

// let cardHold = null
// let pairSolved = 0
// for(let i = 0; i < cardState.length; i++){
//   cardState[i].dom.addEventListener("click",()=>{
//     if(cardState[i].isOpened==false && cardHold==null){
//       openCard(cardState[i])
//       cardHold = [cardState[i].src,i]
//     }else if(cardState[i].isOpened==false && cardHold!=null){
//       openCard(cardState[i])
//       if(cardHold[0]==cardState[i].src){
//         setTimeout(()=>{
//           pairSolved += 1
//           cardHold = null
//           if(pairSolved==6){
//             //winning
//             pairSolved = 0
//             stopTimer();
//             alert("you won")
//           }
//         },300)
//       }else{
//         setTimeout(()=>{
//           closeCard(cardState[i])
//           closeCard(cardState[cardHold[1]])
//           cardHold = null
//         },500)
//       }
//     }
//   })
// }

let timerVar = null
let pairs = null
let cardState = []
let cardHold = null
let pairSolved = 0

let startTimer = ()=>{
  timerVar = setInterval(()=>{
    timer.innerHTML = parseInt(timer.innerHTML)+1
  },1000)
}

let stopTimer = ()=>{
  clearInterval(timerVar)
  timer.innerHTML = 0
}

let openCard = (elem)=>{
  elem.isOpened = true
  elem.dom.children[0].className="card-opened"
}

let closeCard = (elem)=>{
  elem.isOpened = false
  elem.dom.children[0].className="card-closed"
}

function closeInt(arrayDom) {
  arrayDom.forEach(el => {
    el.style.pointerEvents = 'none';
  });
}

function openInt(arrayDom) {
  arrayDom.forEach(el => {
    el.style.pointerEvents = 'auto';
  });
}

function startGame (){
  document.body.style.overflow = 'hidden';
  gameEnd.style.visibility = "hidden"
  //tampilkan game interface
  gameInterface.style.visibility = "visible"
  
  //get pairs
  const nums = new Set();
  while (nums.size < 6) nums.add(Math.floor(Math.random() * 77));
  pairs = [...nums, ...nums].sort(() => Math.random() - 0.5);
  
  //fill board with pairs
  for(i = 0; i < 12; i++){
    board.insertAdjacentHTML("beforeend", `
    <div class="card">
      <div class="card-closed">
        <h2 class="text-center m-auto font-chau text-white text-6xl">?</h2>
      </div>
      <div class="card-content">
        <img src="src/${pairs[i]}.jpg" class="card-img">
      </div>
    </div>
    `);
  }
  
  //fill cardState
  let allCardDom = document.querySelectorAll(".card")
  for(let i = 0; i < allCardDom.length; i++){
    cardState.push({
      src: allCardDom[i].children[1].children[0].src,
      isOpened: false,
      dom: allCardDom[i]
    })
  }
  
  //fill event to card
  for(let i = 0; i < cardState.length; i++){
    cardState[i].dom.addEventListener("click",()=>{
      if(cardState[i].isOpened==false && cardHold==null){
        openCard(cardState[i])
        cardHold = [cardState[i].src,i]
      }else if(cardState[i].isOpened==false && cardHold!=null){
        closeInt(allCardDom)
        openCard(cardState[i])
        if(cardHold[0]==cardState[i].src){
          setTimeout(()=>{
            pairSolved += 1
            cardHold = null
            if(pairSolved==6){
              //winning
              gameEnd.children[0].children[0].innerHTML = `Selesai dalam : ${timer.innerHTML} detik`
              stopTimer();
              timerVar = null
              pairs = null
              cardState = []
              cardHold = null
              pairSolved = 0
              board.innerHTML = ""
              gameEnd.style.visibility = "visible"
            }
            openInt(allCardDom)
          },300)
        }else{
          setTimeout(()=>{
            closeCard(cardState[i])
            closeCard(cardState[cardHold[1]])
            cardHold = null
            openInt(allCardDom)
          },500)
        }
      }
    })
  }
  
  //start timer
  startTimer();
}

let closeGame = ()=>{
  gameInterface.style.visibility = "hidden"
  gameEnd.style.visibility = "hidden"
  document.body.style.overflow = '';
}