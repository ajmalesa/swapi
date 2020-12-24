// Initial page to look for starships
let initialPage = "https://swapi.dev/api/starships/?page=1"

// Function we will call with url of the next page of starships
function getNextPageOfStarships(url) {
    axios.get(url)

    // If we get a response, append to page
    .then((response) => {
        for (let i = 0; i < response.data.results.length; i++) {
            document.querySelector("#list-of-starships").innerHTML += `
                    <li class="starship">
                        ${response.data.results[i].name}
                    </li>
                    <ul class="pilots-for-starships" id="pilots-for-${i + url[url.length-1]}"></ul>
                `;

            for (let j = 0; j < response.data.results[i].pilots.length; j++) {
                axios.get(response.data.results[i].pilots[j])
                    .then((pilot) => {

                        document.querySelector("#pilots-for-" + i + url[url.length - 1]).innerHTML += `
                                <li>
                                    ${pilot.data.name}
                                </li>
                            `;
                    })
            }
        }

        // As long as there is a next page of starships, recursively call function to get next page
        if (response.data.next !== null) {
            getNextPageOfStarships(response.data.next);
        }

    })

    // If we are not able to get a response, let the user know and log the error to make it easy to find in devtools
    .catch((err) => {
        document.querySelector("#list-of-starships").innerHTML = "Could not get starship. Contact administrator.";
        console.error(err);
    });
}

// Call function defined above, which will keep being called as long as there are more pages of starships
getNextPageOfStarships(initialPage);