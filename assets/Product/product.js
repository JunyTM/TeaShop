const rootElement = document.getElementById('root');
const rootDetail = document.getElementById('detail');
const ProductAPI = 'http://localhost:1337/api/productions';

function ResAPI() {
    GetProductions(RenderProduct);
}

ResAPI();

function GetProductions(callback) {
    fetch(ProductAPI)
        .then((res) => {
            return res.json();
        })
        .then(callback)
        .catch((err) => {
            alert('server error: ' + err);
        });
}

function RenderProduct(res) {
    let htmls = res.data.map(data => {
        console.log(data);
        return `
        <li class="item-${data.id}">
            <h2>${data.attributes.Name}</h2>
            <img src=${data.attributes.PhotoURL} alt="" />
        </li>
        `;
    });
    rootElement.innerHTML = htmls.join('');
}