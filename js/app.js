const searchBar = document.querySelector(".search-bar");

let charactersTable = [];

//Events
getCaracters();

searchBar.addEventListener("keyup", e => {
	let { value } = e.target;

	value = value.toLowerCase();

	let searchCharacters = charactersTable.filter(caracter => {
		return (
			caracter.name.toLowerCase().includes(value) ||
			caracter.house.toLowerCase().includes(value)
		);
	});

	displayCaracters(searchCharacters);
});

//Functions
function displayCaracters(charactersArray) {
	let caracterItems = charactersArray
		.map(caracter => {
			return `
            <li class="caracter">
            <div class="caracter-infos">
                <h1 class="caracter-name">
                    ${caracter.name}
                </h1>
                <p class="caracter-house">
                    ${caracter.house}
                </p>
            </div>
            <div class="caracter-image">
                <img src="${caracter.image}" alt="${caracter.name}">
            </div>
        </li>
            `;
		})
		.join("");

	document.querySelector(".caracters").innerHTML = caracterItems;
}

async function getCaracters() {
	try {
		const response = await fetch("https://hp-api.herokuapp.com/api/characters");
		charactersTable = await response.json();
        displayCaracters(charactersTable);
	} catch (error) {
        console.log(error);
	}
}
