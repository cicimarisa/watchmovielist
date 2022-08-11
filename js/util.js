const assignRemoveWhitelistBtn =  (watchlist, renderHtml) => {
    const removeButton = document.getElementsByClassName("remove")
    for (let button of removeButton) {
        button.addEventListener("click", event => {
            event.preventDefault()
            const findIndex = watchlist.findIndex(item => item.id == button.id)
            watchlist.splice(findIndex,1)
            localStorage.setItem("watchlist", JSON.stringify(watchlist.map(wl => JSON.stringify(wl))))
            renderHtml()
        })
    }
}

const assignAddWhitelistBtn = (movies, watchlist, renderHtml) => {
    const addButton = document.getElementsByClassName("add")
    for (let button of addButton) {
        button.addEventListener("click", event => {
            event.preventDefault()
            watchlist.unshift(JSON.stringify(movies.find(item => item.id == button.id)))
            localStorage.setItem("watchlist", JSON.stringify(watchlist))
            renderHtml()
        })
    }
}

export {assignRemoveWhitelistBtn, assignAddWhitelistBtn}