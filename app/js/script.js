for (let j = 1; j <= 3; j++) {
    axios.get('https://swapi.dev/api/starships/?page=' + j)
        .then((response) => {

            response.data.results.forEach((starship, i) => {

                document.querySelector

                document.querySelector("#list-of-starships").innerHTML += `
                    <li class="starship">
                        ${starship.name}


                    </li>
                    <ol id="starships-for-${i * j}"></ol>
                    `;

                starship.pilots.forEach((pilot) => {
                    axios.get(pilot).then((response) => {
                        console.log(response)

                        document.querySelector("#starships-for-" + (i * j)).innerHTML += `
                    <li>
                        ${response.data.name}
                    </li>

                
                `;
                    })
                });

            });

        });
}