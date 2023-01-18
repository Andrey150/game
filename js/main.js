const BGs= [
    '001.svg',
    '002.svg',
    '003.svg',
    '004.svg',
    '005.svg',
    '006.svg',
    '007.svg',
    '008.svg',
    '009.svg',
    '010.svg',
    '011.svg',
    '012.svg',
    '013.svg',
    '014.svg',
    '015.svg',
    '016.svg',
    '017.svg',
    '018.svg',
    
    

];

const settings = {
    width: 4,
    height: 5,
};

let firstCard = null;

const gameField = document.getElementById('game-field');
const bannerBg = '019.svg';
const banner = document.createElement('img');


banner.setAttribute('src' , 'image/019.svg');
banner.classList.add('banner');

const gameHeader= document.getElementById('game-header'); 
gameHeader.after(banner);
let cardsCount = null;


let isBlocked = false;
let timer =null;
function handleCardClick(event) {
    window.clearTimeout(timer);
    if (!isBlocked) {
        const cell = event.currentTarget;
        const bg = cell.dataset.bg;

        cell.style.backgroundImage = `url(image/${bg})`;
        cell.classList.toggle('open');

        if (!firstCard) {
            firstCard = {
                card: cell, 
                bg: bg,
            }
    
        } else {
            if (firstCard.bg === bg) {
                cardsCount -= 2;
                firstCard = null;
            } else {
                isBlocked = true;

                

                timer = setTimeout(function(){
                    cell.classList.toggle('open');
                    firstCard.card.classList.toggle('open');
                    cell.style.backgroundImage = '';
                    firstCard.card.style.backgroundImage = '';
                    firstCard = null;
                    isBlocked = false;
                }, 600);
            }

        }

        setTimeout(function() {
             if (cardsCount === 0){
                gameField.innerHTML= '<h2>Ты победил, поздравляю!</h2>'
             }

        }, 600); 
    }
};  

function handelStartButtonClick () {
    gameField.innerHTML = '';

    cardsCount =settings.width * settings.height;
    const usedBg = [];
    const cardsBgs = [];

    for (let i = 0; i < cardsCount; i++) {
        let selectedBg;
        if (i < cardsCount / 2) {
            const cardsBgIndex = Math.floor(Math.random() * BGs.length);  //генератор случайного числа
        
            selectedBg = BGs[cardsBgIndex];
            usedBg.push(selectedBg);
            
        } else  {
            selectedBg = usedBg.pop();
        }

        cardsBgs.push(selectedBg);

    };

    cardsBgs.sort(() => Math.random() - 0.5);

    let iterator = 0;

    for (let i = 0; i < settings.height; i++) {
        const row = document.createElement('div');
        row.classList.add('row'); 

        for (let j = 0; j < settings.width; j++) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.bg = cardsBgs[iterator];
            card.addEventListener('click' , handleCardClick);

            row.appendChild(card);

            iterator++;
        }
        
        gameField.appendChild(row);
    }
}

const startButton = document.getElementById('start-button');
startButton.addEventListener('click' , handelStartButtonClick ); 