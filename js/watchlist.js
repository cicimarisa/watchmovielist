import { assignRemoveWhitelistBtn } from "./util.js"

const api_key = "4a5c19ec2e7c7f5afb9799fa30045760"
const base_url = "https://api.themoviedb.org"
const watchlistsFromLocal = JSON.parse(localStorage.getItem("watchlist") || "[]").map(wl => JSON.parse(wl))

async function renderHtml() {
    if (watchlistsFromLocal.length > 0) {
        const res = await fetch(`${base_url}/3/genre/movie/list?api_key=${api_key}`)
        const genres = (await res.json()).genres

        const moviesHtml = watchlistsFromLocal.map(item => {
            let genresOfMovie = []
            for (let genre_id of item.genre_ids) {
                genresOfMovie.push((genres.find(genr => genr.id === genre_id)).name)
            }


            const imgLink = `<img src="https://www.themoviedb.org/t/p/w440_and_h660_face/${item.backdrop_path}" alt="">`


            console.log(genresOfMovie.length)
            return `<div class="movie-container d-flex">
                ${item.backdrop_path ? imgLink : ''}
                <div class="${item.backdrop_path ? 'w-80' : 'w-100'}">
                    <h3>${item.title} <small class="rating">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" viewBox="0 0 75.84 71.367"><path id="star" d="M625.854,147.656s3.831-27.535,8.531-27.535,10.267,27.535,10.267,27.535,27.37.8,28.132,4.434S647.7,162.176,647.7,162.176s5.977,27.63,2.648,29.237S634.385,168.6,634.385,168.6s-14.393,24.418-17.971,22.812,3.659-29.237,3.659-29.237-24.5-6.456-23.051-10.086S625.854,147.656,625.854,147.656Z" transform="translate(-596.961 -120.121)" fill="#ffdc00"/></svg>
                    ${item.vote_average}</small></h3>
                    <p class="strong"><span class="${genresOfMovie.length > 0 ? 'genre' : ''}">${genresOfMovie.join(" ")}</span><span><button class="remove" id="${item.id}">-</button> Remove</span></p>
                    <p>${item.overview}</p>
                </div>
            </div>`
        }).join("")

        document.getElementById("movie-section").innerHTML = moviesHtml
        assignRemoveWhitelistBtn(watchlistsFromLocal, renderHtml)
    } else{
        document.getElementById("movie-section").innerHTML = `<p class="start-text" id="text-start">Search and Add in Watchlist</p>`
    }

}

renderHtml()