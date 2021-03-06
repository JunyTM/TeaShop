const rootElement = document.getElementById('root');
const rootDetail = document.getElementById('detail');


// const newsAPI = 'http://localhost:1337/api/news-sites';
const newsAPI = 'https://teahappy.herokuapp.com/api/news-sites';
function start() {
    GetNewsSite(renderNewsSite);
    GetNewsSite(GetDetail);
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

function renderNewsSite(res) {
    // console.log(res.data);
    let htmls = res.data.map(function (data) {
        return `
            <li class="site-${data.id}">
                <h2>${data.attributes.Title}</h2>
                <img src=${data.attributes.PhotoURL} alt="" />
            </li>
        `;
    });
    rootElement.innerHTML = htmls.join('');
}

function GetDetail(res) {
    
    for (let index of res.data) {
        const itemSite = document.querySelector('.site-'+index.id);
        
        itemSite.onclick = function () {
           rootElement.remove();
           let html = `
            <div class="siteDetail"> 
                <img src=${index.attributes.PhotoURL} alt="" />
                <div class="content-site">
                <h2>${index.attributes.Title}</h2>
                <p>${index.attributes.Content}</p>
                </div>
            </div>
           `;
           rootDetail.innerHTML = html;
        }
    }

}


