const rootElement = document.getElementById('root');

let newsAPI = 'http://localhost:1337/api/news-sites';

function start() {
    GetNewsSite(renderNewsSite);
}

start();

//function get
function GetNewsSite(callback) {
    fetch(newsAPI)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

function renderNewsSite(datas) {
    console.log(datas.data);
    let htmls = datas.data.map(function (data) {
        return `
            <li>
                <h2>${data.attributes.Title}</h2>
                <img src=${data.attributes.PhotoURL} alt="" />
            </li>

        `;
    });
    rootElement.innerHTML = htmls.join('');
}
{/* <p>${data.attributes.Content}</p> */}


