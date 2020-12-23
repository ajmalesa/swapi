for (let j = 1; j <= 3; j++) {
    axios.get('https://swapi.dev/api/starships/?page=' + j)
        .then((response) => {
            response.data.results.forEach((starship, i) => {
                document.querySelector("#list-of-starships").innerHTML += `
                    <li class="starship">
                        ${starship.name}
                    </li>
                    <ol id="starships-for-${i * j}"></ol>
                `;

                starship.pilots.forEach((pilot) => {
                    axios.get(pilot).then((response) => {
                        document.querySelector("#starships-for-" + (i * j)).innerHTML += `
                            <ol>
                                ${response.data.name}
                            </ol>
                        `;
                    }).catch((err) => {
                        document.querySelector("#starships-for-" + (i * j)).innnerHTML = "Could not get pilot. Contact administrator.";
                        console.log(err);
                    })
                });
            });

        }).catch((err) => {
            document.querySelector("#list-of-starships").innerHTML = "Could not get starship. Contact administrator.";
            console.error(err)
        });
}