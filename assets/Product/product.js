const rootElement = document.getElementById('root');
const cafeElement = document.querySelector('#root .cafe');
const fruitElement = document.querySelector('#root .fruit');
const teaElement = document.querySelector('#root .tea');
const cakeElement = document.querySelector('#root .cake');
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
    //reder cafes
    let cafes = res.data.map(data => {
        console.log(data);
        if (data.attributes.Class == "cafe") 
        return `
        <li class="item-${data.id}">
            <h2>${data.attributes.Name}</h2>
            <img src=${data.attributes.PhotoURL} alt="" />
        </li>
        `;
    });
    cafeElement.innerHTML = cafes.join('');

    //render fruits  
    let fruits = res.data.map(data => {
        console.log(data);
        if (data.attributes.Class == "fruit") 
        return `
        <li class="item-${data.id}">
            <h2>${data.attributes.Name}</h2>
            <img src=${data.attributes.PhotoURL} alt="" />
        </li>
        `;
    });
    fruitElement.innerHTML = fruits.join('');

    //render teas
    let teas = res.data.map(data => {
        console.log(data);
        if (data.attributes.Class == "tea") 
        return `
        <li class="item-${data.id}">
            <h2>${data.attributes.Name}</h2>
            <img src=${data.attributes.PhotoURL} alt="" />
        </li>
        `;
    });
    teaElement.innerHTML = teas.join('');

    //render cakes
    let cakes = res.data.map(data => {
        console.log(data);
        if (data.attributes.Class == "cake") 
        return `
        <li class="item-${data.id}">
            <h2>${data.attributes.Name}</h2>
            <img src=${data.attributes.PhotoURL} alt="" />
        </li>
        `;
    });
    cakeElement.innerHTML = cakes.join('');
}

function GetDetail(res) {
    
    for (let index of res.data) {
        const itemSite = document.querySelector('.item-'+index.id);
        
        itemSite.onclick = function () {
           rootElement.remove();
           let html = `
            <div class="itemDetail"> 
                
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

