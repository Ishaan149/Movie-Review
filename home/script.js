const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=49b416295197e18dccabebaedd3f1576&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=49b416295197e18dccabebaedd3f1576&query=";

const main = document.getElementById("movie_container");
const form = document.getElementById("form");
const search = document.getElementById("query");

returnMovies(APILINK)


function returnMovies(url){
    fetch(url).then(res => res.json())
        .then(function(data){
        console.log(data.results);
        data.results.forEach(element => {

            const div_card = document.createElement('div');
            div_card.setAttribute('class', 'card');


            const image = document.createElement('img');
            image.setAttribute('class', 'thumbnail');
            image.setAttribute('id', 'image');

            const title = document.createElement('h3');
            title.setAttribute('id', 'title');

            const center = document.createElement('center');

            title.innerHTML = `${element.title}<br> <a href = "movie.html?id=${element.id}&title=${element.title}">reviews</a>`;

            image.src = IMG_PATH + element.poster_path;

            center.appendChild(image);
            div_card.appendChild(center);
            div_card.appendChild(title);
            main.appendChild(div_card);
        });
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    main.innerHTML = '';

    const searchItem = search.value;

    if (searchItem){
        document.getElementById('week_heading').textContent = 'Showing Results...';
        returnMovies(SEARCHAPI + searchItem);
        search.value = "";
    }
    else{
        document.getElementById('week_heading').textContent = "This Week's Best Sellers...";
        returnMovies(APILINK);
    }
});
