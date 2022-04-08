const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
		'X-RapidAPI-Key': '1806d2d467mshf0f94ce6c6a4438p14e81fjsna9a8426069f4'
	}
};

fetch('https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
