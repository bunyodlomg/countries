const cardsContainer = document.querySelector(".cards-container"),
    form = document.querySelector("form"),
    mode = document.querySelector(".dark-mode-btn"),
    spinner = document.querySelector(".spinner"),
    input = document.querySelector("input"),
    api = `https://restcountries.com/v3.1/all`,
    request = new XMLHttpRequest();
AOS.init();
request.addEventListener("readystatechange", () => {
    if (request.readyState == 4 && request.status == 200) {
        spinner.classList.add("hidden");
        newCountry()
    }
})

request.open("GET", api);
request.send();

function createCountry(obj) {
    createCountry(obj)
}
function newCountry() {
    country()
    const myRegex = /^[a-zA-Z]{1,20}$/
    input.addEventListener('input', () => {
        if (myRegex.test(input.value)) {
            cardsContainer.innerHTML = ''
            country()
        } else {
            cardsContainer.innerHTML = ''
            country()
        }

    });
    form.select.addEventListener('change', (e) => {
        console.log(1);
    });
};


mode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode')
})
function country() {
    const obj = JSON.parse(request.responseText).filter((country) => {
        return country.name.common.toLowerCase().includes(input.value.toLocaleLowerCase());
    });
    obj.forEach(country => {
        createCountry(country);
        console.log();
    });
}
function createCountry(obj) {
    const { capital, flags, name, region, population } = obj;
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
        <img src="${flags.svg}" class="card-img" />
        <div class="card-body">
        <h5 class="card-title">${name.common}</h5>
        <p><b>Population: </b>${population.toLocaleString()}</p>
        <p><b>Region: </b>${region}</p>
        <p>
        <b>Capital: ${capital ? capital[0] : 'No Capital'}</b>
        </p>
        </div>
        `
    div.setAttribute('data-aos', 'flip-left')
    cardsContainer.appendChild(div)
}