

var families=[{family:'diamonds',icon:'♦️'},{family:'clubs',icon:'♣️'},{family:'spades',icon:'♠️'},{family:'hearts',icon:'❤️'}];
var cards = [];
var cardDivs = document.querySelectorAll('.card')
var dealerArea = document.querySelector(".dealerArea");
var graveArea = document.querySelector(".graveArea");
var dealBtn = document.querySelector(".dealBtn");
var score=0;
var cardPlays=0;
var cardDOMS = document.querySelectorAll('.card');
var captionDOM = document.querySelector(".caption");
var captionToPlayerDOM = document.querySelector(".captionToPlayer");
var cardsLeftDOM = document.querySelector(".cardsLeft");
var resetBtn = document.querySelector(".resetButton");
var highscoreDOM = document.querySelector(".highscore");

resetBtn.style.display='none'
var expressions = ["Invalid move: Color on color no no","Invalid move: Bad number sequence"]

//dealer shuffle hand counter(if you go thru whole deck and still equals zero, ask player if they want to quit)
var cardsPlayed = 0
var dealerRef=0;

var scoreDOM = document.querySelector(".score");
var cardsPlayedDOM = document.querySelector(".cardsPlayed");

let highScore = parseInt(sessionStorage.getItem('highscore')) || 0;

highscoreDOM.innerHTML = highScore;



families.forEach(f=>{
    for(let i=1;i<14;i++){
        let cardDiv = document.createElement("div");
        let topRow = document.createElement("div")
        let botRow = document.createElement("div")

        cardDiv.className = 'playercard'
        cardDiv.draggable = true;
        cardDiv.id=i;
        topRow.className='top-row'
        botRow.className="bottom-row"
        let val = i;
        if(val === 11){
            val="J"
        }
        else if(val === 12){
            val="Q"
        }
        else if(val === 13){
            val="K"
        }
        topRow.innerHTML = `<h4>${val}</h4><h4>${f.icon}</h4>`
        botRow.innerHTML = `<h4>${f.icon}</h4><h4>${val}</h4>`


        if(f.family === "diamonds" || f.family === "hearts"){
            // console.log('wtf??')
            topRow.classList.add('red')
            botRow.classList.add('red')
            cardDiv.setAttribute('data-color','red')
        }
        else{
            topRow.classList.add('black')
            botRow.classList.add('black')
            cardDiv.setAttribute('data-color','black')

        }

        // console.log(topRow)
        cardDiv.appendChild(topRow);
        cardDiv.appendChild(botRow);

        cards.push(cardDiv);
    }
})


cards=cards.sort((a,b)=>.5 - Math.random())


console.log(cards.length)
let cardCounter=1;
let dealerIdx=0;
let leftOverCards=[];

while(cardCounter < 8){
for(let i=0;i<cardCounter;i++){
    cardDivs[i].appendChild(cards[dealerIdx])
    dealerIdx++
    // console.log("DealerIdx: " + dealerIdx)

}


cardCounter++;
}


function dealerCards(){
for(let i=28;i<cards.length-1;i++){
    leftOverCards.push(cards[i])
}
console.log(leftOverCards[3])
leftOverCards.forEach(c=>{
    dealerArea.appendChild(c)
})

console.log("LEFTOVERCARDS: " + leftOverCards.length)
dealerRef = leftOverCards.length;
cardsLeftDOM.innerHTML = dealerRef
}

dealerCards()
let currCardss;
let clickCard1;
let clickCard2;

cards=[...cards,...cardDOMS]

console.log(cards.length)


cards.forEach(c=>{
    c.ondragstart=(e)=>dragStart(e);
    c.ondragend=(e)=>dragEnd(e);
    c.ondragover=(e)=>dragOver(e);
    c.ondragleave=(e)=>dragLeave(e);
    c.ondragenter=(e)=>dragEnter(e);
    c.ondrop=(e)=>dragDrop(e);
    c.onclick=(e)=>{
        console.log("what the frig??")
        // if(!clickCard1){
        // clickCard1 = e.target
        // }
        // else{
        //     clickCard2= e.target;

        //     e.target.appendChild(clickCard1)
        //     clickCard1.style.top="25px"
        //     clickCard1,clickCard2;

        // }
         }
})










let currentCard={div:"",value:"",color:""}

function dragStart(e){
    // console.log('dragStart()')
    currentCard.div = e.target;
    currentCard.value = parseInt(e.target.id);
    currentCard.color = e.target.getAttribute('data-color')
}

function dragEnd(e){
    // console.log('dragEnd()')
    
}

function dragOver(e){
    e.preventDefault();
    // console.log('dragOver()')
}

function dragLeave(e){
    e.preventDefault();
    // console.log('dragLeave()')
}

function dragEnter(e){
    e.preventDefault();
//    console.log('dragEnter()')
}

function dragDrop(e){
    // console.log('dragDrop()')
    console.log(e.target.children)
    let targetCard={};
    targetCard.div = e.target;
    targetCard.value = parseInt(e.target.id);
    targetCard.color = e.target.getAttribute('data-color')
    console.log(targetCard)

    if(!Array.from(e.target.children).length){
        console.log("empty card area!!!")
        e.target.appendChild(currentCard.div)
    }

    if(checkHand(currentCard,targetCard)){
        e.target.appendChild(currentCard.div);
        currentCard.div.style.top="25px"
    }

    
   


    
}


function checkHand(curr,target){
    console.log(curr)
    console.log(target)

    if(target.value - curr.value !== 1){
        console.log("invalid move! Bad number range")
       showCaption(expressions[1])
        return false;
    }

    else if(target.color === curr.color){
        console.log("invalid move! Bad color move")
        showCaption(expressions[0])

        return false;
    }

    else{
        console.log("looks good!")
        score+=100;
        cardPlays++
        scoreDOM.innerHTML = score
        cardsPlayedDOM.innerHTML = cardPlays
        
        return true;
    }
}

function showCaption(capt){
    captionToPlayerDOM.innerHTML = capt

    setTimeout(()=>{
        captionToPlayerDOM.innerHTML = ""
    },1500)
}


// console.log(leftOverCards)
dealBtn.onclick=dealCards;

function dealCards(){
    console.log("deal some cards!!")
   
        let newCards = leftOverCards.splice(0,3)
        newCards.forEach(c=>{
        graveArea.appendChild(c)
        })

        if(dealerArea.children.length === 0){
            console.log("no more cards!!!")
            setTimeout(recycleDeck,1250);
        }
    
}


function recycleDeck(){
    if(graveArea.children.length < dealerRef){
        console.log('you made some moves!!')
        dealerRef = graveArea.children.length
        cardsLeftDOM.innerHTML = dealerRef

    }
    else{
        console.log("no moves made that cycle")
        captionDOM.innerHTML = "No moves made that cycle!"
        resetBtn.style.backgroundColor='green'
        resetBtn.style.display='block'
        setTimeout(()=>{
            captionDOM.innerHTML = ""
        },1500)
    }
    Array.from(graveArea.children).forEach(c=>{
        dealerArea.append(c)
        leftOverCards.push(c)
    })
}


resetBtn.onclick=restartGame;


function restartGame(){
    console.log("Time for a new hand huh?")


    if(score > highScore){
        console.log("Congrats, you logged a highscore!!");
        sessionStorage.setItem('highscore', score)
    }

    setTimeout(()=>{   
         window.location.reload()
    },1500)
}


