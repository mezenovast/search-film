
let request;

if (window.XMLHttpRequest) {
	request = new XMLHttpRequest();
} else {
	request = new ActiveXObject('Microsoft.XMLHTTP');
}

const apiKey = '381f737b';

const title = document.getElementById('title');
const type = document.getElementById('type');
const button = document.getElementById('button');
const container = document.querySelector('.container');
const cardContainer = document.querySelector('.card_container');
const buttonShow = document.querySelector('.button_show');

const wrapper = document.createElement('div');
wrapper.classList.add('wrapper');

const posterMovie = document.createElement('img');
posterMovie.classList.add('poster');

const wrapMovie = document.createElement('div');
wrapMovie.classList.add('wrap_movie');

const nameMovie = document.createElement('h3');
nameMovie.classList.add('name_movie');

const typeMovie = document.createElement('p');
typeMovie.classList.add('type_movie');

const dateMovie = document.createElement('p');
dateMovie.classList.add('date_movie');

const buttonDetails = document.createElement('button');
buttonDetails.classList.add('button');

wrapper.append(posterMovie, wrapMovie);
wrapMovie.append(typeMovie, nameMovie, dateMovie, buttonDetails);


const getMoviesList = () => {

	request.onload = () => {

		document.getElementById('error').textContent = '';

		if (request.status === 200 && request.response.Response === 'True') {

			const resultSearch = request.response.Search;

			for (let part of resultSearch) {

				const elemClone = wrapper.cloneNode(true);

				const posterClone = elemClone.querySelector('.poster');
				posterClone.src = part.Poster;

				const nameClone = elemClone.querySelector('.name_movie');
				nameClone.textContent = part.Title;

				const typeClone = elemClone.querySelector('.type_movie');
				typeClone.textContent = part.Type;

				const dateClone = elemClone.querySelector('.date_movie');
				dateClone.textContent = part.Year;

				const buttonClone = elemClone.querySelector('.button');
				buttonClone.textContent = 'Details';

				container.firstElementChild.style.display = 'block';

				cardContainer.append(elemClone);

				buttonShow.style.display = 'block';
			}

		} else if (request.response.Response === 'False') {

			document.getElementById('error').textContent = 'This request was not found!';

		}

	};

};

button.onclick = () => {

	const url_first = `http://www.omdbapi.com/?s=${title.value}&type=${type.value}&apikey=${apiKey}`;
	request.open('get', url_first);
	request.responseType = 'json';
	request.send();

	getMoviesList();
};

title.onkeydown = (event) => {

	if (event.key === 'Enter') {

		const url_first = `http://www.omdbapi.com/?s=${title.value}&type=${type.value}&apikey=${apiKey}`;
		request.open('get', url_first);
		request.responseType = 'json';
		request.send();

		getMoviesList();

	}

};


cardContainer.addEventListener('click', (event) => {

	const wrapInfo = document.body.querySelector('.wrap-info');
	const titleInfo = document.body.querySelector('.title-film-info');

	if (wrapInfo) {

		wrapInfo.remove();
		titleInfo.remove();

	}

	if (event.target.tagName === 'BUTTON') {

		const titleInfo = event.target.closest('.wrap_movie').firstElementChild.nextElementSibling.textContent;
		const typeInfo = event.target.closest('.wrap_movie').firstElementChild.textContent;
		const url_second = `http://www.omdbapi.com/?t=${titleInfo}&type=${typeInfo}&apikey=${apiKey}`;

		request.open('get', url_second);

		request.responseType = 'json';
		request.send();

		request.onload = () => {

			const popup = document.getElementById('popup');
			const closeIcon = document.querySelector('.popup_close');
			const popupArea = document.querySelector('.popup_area');


			if (request.status === 200) {

				console.log(request.response);


				const posterInfo = document.getElementById('img-info');
				posterInfo.src = request.response.Poster;

				const titleInfo = document.querySelector('.title-info');
				titleInfo.textContent = request.response.Title;

				const releasedInfo = document.querySelector('.Released-info');
				releasedInfo.textContent = request.response.Released;

				const genreInfo = document.querySelector('.Genre-info');
				genreInfo.textContent = request.response.Genre;

				const countryInfo = document.querySelector('.Country-info');
				countryInfo.textContent = request.response.Country;

				const directorInfo = document.querySelector('.Director-info');
				directorInfo.textContent = request.response.Director;

				const writerInfo = document.querySelector('.Writer-info');
				writerInfo.textContent = request.response.Writer;

				const actorsInfo = document.querySelector('.Actors-info');
				actorsInfo.textContent = request.response.Actors;

				const awardsInfo = document.querySelector('.Awards-info');
				awardsInfo.textContent = request.response.Awards;

				popup.style.display = 'block';

				closeIcon.onclick = function () {
					popup.style.display = 'none';
				}

				popupArea.onclick = function () {
					popup.style.display = 'none';
				}

			}

		};

	}

});

let i = 2;

buttonShow.addEventListener('click', () => {

	const url_third = `http://www.omdbapi.com/?s=${title.value}&page=${i}&type=${type.value}&apikey=${apiKey}`;
	request.open('get', url_third);
	request.responseType = 'json';
	request.send();

	getMoviesList();
	i++;

});