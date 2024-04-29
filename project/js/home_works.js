// GMAIL BLOCK //

const gmailInput = document.querySelector('#gmail_input')
const gmailButton = document.querySelector('#gmail_button')
const gmailResult = document.querySelector('#gmail_result')

const regExp = /(\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)/

gmailButton.onclick= () => {
    if (regExp.test(gmailInput.value)) {
        gmailResult.innerHTML = 'ok'
        gmailResult.style.color = 'green'
    }else {
        gmailResult.innerHTML = 'not ok'
        gmailResult.style.color = 'red'
    }
}

// MOVE BLOCK //

const parentBlock = document.querySelector('.parent_block')
const childBlock = document.querySelector('.child_block')

let positionX = 0
let positionY = 0

const maxParentWidth = parentBlock.offsetWidth - childBlock.offsetWidth
const maxParentHeigth  = parentBlock.offsetHeight - childBlock.offsetHeight


//Test 2
const moveBlock = () => {
    if (positionX < maxParentWidth && positionY === 0){
        positionX += 6
        childBlock.style.left = `${positionX}px`
        requestAnimationFrame(moveBlock)
    }else if (positionX >= maxParentWidth && positionY <= maxParentHeigth){
        positionY += 6
        childBlock.style.top = `${positionY}px`
        requestAnimationFrame(moveBlock)
    }else if (positionX >= 1 && positionY >= maxParentHeigth){
        positionX -= 6
        childBlock.style.left = `${positionX}px`
        requestAnimationFrame(moveBlock)
    }else if (positionX >= 0 && positionY > 0){
        positionY -= 6
        childBlock.style.top = `${positionY}px`
        requestAnimationFrame(moveBlock)
    }
}

moveBlock()


// ANALOG CLOCK

const seconds = document.getElementById("seconds");
let timer;
let time = 0;

function startTimer() {
    timer = setInterval(function () {
        time++;
        let hours = Math.floor(time / 3600);
        let minutes = Math.floor((time - hours * 3600) / 60);
        let seconds = time - hours * 3600 - minutes * 60;
        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        document.getElementById("seconds").innerHTML = `${hours}:${minutes}:${seconds}`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function resetTimer() {
    clearInterval(timer);
    time = 0;
    document.getElementById("seconds").innerHTML = "00:00:00";
}

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("stop").addEventListener("click", stopTimer);
document.getElementById("reset").addEventListener("click", resetTimer);