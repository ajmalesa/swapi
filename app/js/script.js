// Initial page to look for starships
let currentPage = 1;
let initialPage = "https://swapi.dev/api/starships/?page=" + currentPage;

// Function we will call with url of the next page of starships
function getNextPageOfStarships(url) {

    // Reset content of current page on new page request
    document.querySelector("#list-of-starships").innerHTML = "";
    document.querySelector(".main-container").classList.add("uk-hidden");

    axios.get(url)

    // If we get a response, append to page
    .then((response) => {
        for (let i = 0; i < response.data.results.length; i++) {
            document.querySelector("#list-of-starships").innerHTML += `
                    <li class="starship">
                        <a class="uk-accordion-title">${response.data.results[i].name}</a>
                        <div class="pilots-for-starships uk-accordion-content" id="pilots-for-${i + url[url.length-1]}"></div>
                        <hr class="divider">
                    </li>
                `;

            for (let j = 0; j < response.data.results[i].pilots.length; j++) {
                axios.get(response.data.results[i].pilots[j])
                    .then((pilot) => {

                        document.querySelector("#pilots-for-" + i + url[url.length - 1]).innerHTML += `
                                <div>
                                    <p>${pilot.data.name}</p>
                                </div>
                            `;
                    })
            }

            if (response.data.results[i].pilots.length === 0) {
                document.querySelector("#pilots-for-" + i + url[url.length - 1]).innerHTML += `
                <div>
                    No pilots found
                </div>
            `;
            }
        }

        if (response.data.previous !== null) {
            document.querySelector(".previous-button").removeAttribute("disabled");
        } else {
            document.querySelector(".previous-button").setAttribute("disabled", "");
        }
        if (response.data.next !== null) {
            document.querySelector(".next-button").removeAttribute("disabled");
        } else {
            document.querySelector(".next-button").setAttribute("disabled", "");
        }

        document.querySelectorAll(".divider")[document.querySelectorAll(".divider").length - 1].remove();
        document.querySelector(".main-container").classList.remove("uk-hidden");
        document.querySelector(".main-container").classList.add("fade-in");
        document.querySelector(".loading-container").classList.add("fade-out");
    })

    // If we are not able to get a response, let the user know and log the error to make it easy to find in devtools
    .catch((err) => {
        document.querySelector(".loading-container").classList.add("fade-out");
        document.querySelector(".main-container").classList.add("fade-in");
        document.querySelector(".main-container").classList.remove("uk-hidden");
        document.querySelector("#list-of-starships").innerHTML = "<span class='uk-text-danger'>Could not get starships. Contact administrator.</span>";
        console.error(err);
    });
}

// Call function defined above, which will keep being called as long as there are more pages of starships
getNextPageOfStarships(initialPage);

document.querySelector(".next-button").addEventListener("click", () => {
    currentPage += 1;
    let nextPage = "https://swapi.dev/api/starships/?page=" + currentPage;
    getNextPageOfStarships(nextPage);
})

document.querySelector(".previous-button").addEventListener("click", () => {
    currentPage -= 1;
    let prevPage = "https://swapi.dev/api/starships/?page=" + currentPage;
    getNextPageOfStarships(prevPage);
})