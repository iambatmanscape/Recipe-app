async function call(recipe) {
const url = `https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe?query=${recipe}`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'a8a9e9c4c3mshe0ef4e4ee113ad7p1c9a4fjsned93ec320d25',
		'X-RapidAPI-Host': 'recipe-by-api-ninjas.p.rapidapi.com'
	}
};


	const response = await fetch(url, options);
	const result = await response.json();
	return result;

}
export default call;