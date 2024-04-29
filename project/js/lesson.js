// Phone BLOCK //

const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')

const regExp = /^\+966 [2579][0-9] [0-9] [0-9] [0-9]/

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = 'ok'
        phoneResult.style.color = 'green'
    } else {
        phoneResult.innerHTML = 'not ok'
        phoneResult.style.color = 'red'
    }
}

// Tap Content Block

const tabContentBlocks = document.querySelectorAll('.tab_content_block')
const tabContentItems = document.querySelectorAll('.tab_content_item')
const tabParent = document.querySelector('.tab_content_items')


let currentSlideIndex = 0
const slideInterval = setInterval(() => {
    hideTabContent()
    currentSlideIndex = (currentSlideIndex + 1) % tabContentBlocks.length
    showTabContent(currentSlideIndex)
}, 3000)

const hideTabContent = () => {
    tabContentBlocks.forEach((item) => {
        item.style.display = 'none'
    })
    tabContentItems.forEach((item) => {
        item.classList.remove('tab_content_item_active')
    })
}

const showTabContent = (index = 0) => {
    tabContentBlocks[index].style.display = 'block'
    tabContentItems[index].classList.add('tab_content_item_active')
    currentSlideIndex = index
}

tabParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabContentItems.forEach((item, index) => {
            if (event.target === item) {
                clearInterval(slideInterval)
                hideTabContent()
                showTabContent(index)
            }
        })
    }

}

// Converter

const usdInput = document.querySelector("#usd");
const somInput = document.querySelector("#som");
const euroInput = document.querySelector("#eur");

const CovertorData = async() => {
    try {
        const response = await fetch("../data/converter.json");
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}

const converter = async(element, target1, target2, current) => {
    element.oninput = async() => {
        const data = await CovertorData();
        switch (current) {
            case 'som':
                target1.value = (element.value / data.usd).toFixed(2);
                target2.value = (element.value / data.eur).toFixed(2);
                break;
            case 'usd':
                target1.value = (element.value * data.usd).toFixed(2);
                target2.value = (element.value * data.usd / data.eur).toFixed(2);
                break;
            case 'eur':
                target1.value = (element.value * data.eur).toFixed(2);
                target2.value = (element.value * data.eur / data.usd).toFixed(2);
                break;
            default:
                break;
        }
        element.value === '' && (target1.value = '')
        element.value === '' && (target2.value = '')
    }
}

converter(somInput, usdInput, euroInput, 'som')
converter(usdInput, somInput, euroInput, 'usd')
converter(euroInput, somInput, usdInput, 'eur')

// Card Switcher

let count = 1

const card = document.querySelector('.card')
const btnNext = document.querySelector('#btn-next')
const btnPrev = document.querySelector('#btn-prev')


const loadCard = async () => {
    try {
        const response = await  fetch(`http://jsonplaceholder.typicode.com/todos/${count}`)
        const data = await response.json()
        card.innerHTML = `
      <P>${data.title}<P/>
      <P style="color: ${data.completed ? 'green' : 'red'}">${data.completed}<P/>
      <span>${data.id}</span>
      `
    } catch (err) {
        console.log(err)
    }


}

btnNext.onclick = () => {
    count++
    if (count > 200) {
        count = 1
    }
    loadCard()
}

btnPrev.onclick = () => {
    count--
    if (count < 1) {
        count = 200
    }
    loadCard()
}

loadCard()

fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })

// weather

const inputSearch = document.querySelector('.cityName')
const cityName = document.querySelector('.city')
const cityTemp = document.querySelector('.temp')

const API = "http://api.openweathermap.org/data/2.5/weather"
const API_KEY = 'e417df62e04d3b1b111abeab19cea714'
const citySearch = () => {
    inputSearch.oninput = async (event) => {
        try {
            const response = await fetch(`${API}?q=${event.target.value}&appid=${API_KEY}`)
            const data = await response.json()
            cityName.innerHTML = data.name || "Город не найден..."
            cityTemp.innerHTML = data.main?.temp ? Math.round(data.main.temp - 273.15) + '&deg;C' : '///'
        } catch (err) {
            console.log(err)
        }
    }
}

citySearch()

