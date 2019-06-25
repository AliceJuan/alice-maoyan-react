import axios from 'axios'

export function fetch (url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, params).then(response => {
            resolve(response.data)
        }).catch((error) => {
            reject(error)
        })
    })
}

export default {
    getAllCity () {
        return fetch('./json/all_city.json')
    },
    getAllFilms (params) {
        return fetch('./json/ten-films.json', params)
    },
    getExpectFilms (params) {
        return fetch('./json/expect_films.json', params)
    },
    getComingFilms (params) {
        return fetch('./json/coming_films.json', params)
    },
    searchFilms (keyword) {
        return fetch('./json/all_films.json', keyword)
    },
    getCinemaData (params) {
        return fetch('./json/bj_cinema.json', params)
    },
    getMovieCinemaData (params) {
        return fetch('./json/film-cinema-info.json', params)
    },
    getFilmDetailsData (params) {
        return fetch('./json/film-details.json', params)
    },
    getFilmComments (params) {
        return fetch('./json/movie-comments.json', params)
    },
    getCinemaDetailsData (params) {
        return fetch('./json/cinema_details.json', params)
    }
}