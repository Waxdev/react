const API_TOKEN = "b6cdec94d5fbb8d23938c1d7704adac8"

export function getFilmsFromApiWithSearchedText(text, page) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + '&page=' + page

    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.log(error));
}

export function getImageFromApi (name) {
    return 'https://image.tmdb.org/t/p/w300' + name
}

export function getFilmDetailFromApi(id) {
    const url = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN + '&language=fr'

    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.log(error));
}