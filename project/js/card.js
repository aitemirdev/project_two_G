const URL = 'https://jsonplaceholder.typicode.com/posts'
const LOL = document.querySelector('.LOL')

const nan = async (url) => {
    try {
        const response = await fetch(url)
        const data = await response.json()
        data.forEach(data => {
            const create = document.createElement('div')
            create.classList.add('card')
            create.innerHTML = `
            <div class="car">
                <div class="image"><img src="https://th.bing.com/th/id/OIP.7OQ3YhCOF_6HbLJ8uq-IHgHaEK?rs=1&pid=ImgDetMain" alt="image"></div>
                <h3 class="title">${data.title}</h3>
                <p class="body">${data.body}</p>
                <button class="btn">LOL</button>
            </div>
            `
            LOL.append(create)
        })
    }catch (error) {
        alert(error);
    }
}

nan(URL)