const cards = document.querySelectorAll('.flip-card');

let flipCard = false;
let desableCards = false;
let firstCard, secondCard;

function flipCards() {
    
    if(desableCards) return;
    if(this === firstCard) return;

    this.classList.add('flip');


    if(!flipCard) {
        flipCard = true;
        firstCard = this;
        return
    }
    
    secondCard = this;
    
    checkValue();
}

const unflipCards = () => {
    desableCards = true;

    setTimeout(()=> {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetPlay();

        

    }, 1500);
}

const removeClick = () => {
    firstCard.removeEventListener('click', flipCards);
    secondCard.removeEventListener('click', flipCards);
    
    resetPlay();

    changePoints();
}

const checkValue = () => {
    let isMatch = firstCard.dataset.maincard === secondCard.dataset.maincard;
    isMatch ? removeClick() : unflipCards();
}

const resetPlay = () => {
    [flipCard, desableCards] = [false, false];
    [firstCard, secondCard] = [null, null];
}

const changePoints = () => {
    let progress = document.getElementById('progress')
   
    let quantiPars = 1.001
    quantiPars++

    let changeProgress = (quantiPars / cards.length) * 100
    changeProgress.toFixed(1)
    progress.value += changeProgress

    const pointsEnd = progress.value

    showModal(pointsEnd)
}

const reloadGame = (event) => {
    document.location.reload(true);
}

const hideModal = () => {
    endGameModal.style.display = 'none';
}

const btnReload = document.getElementById('btn-reload');
const btnCancel = document.getElementById('btn-cancel');

btnReload.addEventListener('click', reloadGame)
btnCancel.addEventListener('click', hideModal)

let [minutes, seconds] = [0, 0]

let getMinutes = document.getElementById('minutes');
let getSeconds = document.getElementById('seconds');

const gameTime = () => {

    seconds++;

    if(seconds == 60) {
        seconds = 0;
        minutes++;
    }

    getMinutes.innerText = returnData(minutes);
    getSeconds.innerText = returnData(seconds);

}

const varInterval = setInterval(gameTime, 1000)

let endGameModal = document.getElementById('menu-float')

const showModal = (pointsEnd) => {

    if(pointsEnd >= 100) {
        endGameModal.style.display = 'flex';
        
        clearInterval(varInterval)
    }
}

const returnData = (times) => {
    return times >= 10 ? times : `0${times}`;
}

(shuffle => {
    cards.forEach(card => {
        let radomPosition = Math.floor(Math.random() * 24)
        card.style.order = radomPosition;
    })
})();

cards.forEach(card => card.addEventListener('click', flipCards));

gameTime();
