const rootElement = document.getElementById('root');
const cafeElement = document.getElementById('cafe');
const fruitElement = document.getElementById('fruit');
const teaElement = document.getElementById('tea');
const cakeElement = document.getElementById('cake');
const rootDetail = document.getElementById('detail');
const ProductAPI = 'http://localhost:1337/api/productions';

function ResAPI() {
    GetProductions(RenderProduct);
    GetProductions(GetDetail);
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
        <img src=${data.attributes.PhotoURL} alt="" />
        <button>Thêm vào giở hàng</button>
        <div class="product-info">
		    <h3 class="product-name">${data.attributes.Name}</h3>
		    <div class="price-box">
			    <span class="gia">Giá:</span> ${data.attributes.Cost}₫
			</div>
		</div>

	</div>
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
        <img src=${data.attributes.PhotoURL} alt="" />
        <button>Thêm vào giở hàng</button>
        <div class="product-info">
		    <h3 class="product-name">${data.attributes.Name}</h3>
		    <div class="price-box">
			    <span class="gia">Giá:</span> ${data.attributes.Cost}₫
			</div>
		</div>

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
        <img src=${data.attributes.PhotoURL} alt="" />
        <button>Thêm vào giở hàng</button>
        <div class="product-info">
		    <h3 class="product-name">${data.attributes.Name}</h3>
		    <div class="price-box">
			    <span class="gia">Giá:</span> ${data.attributes.Cost}₫
			</div>
		</div>
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
        <img src=${data.attributes.PhotoURL} alt="" />
        <button>Thêm vào giở hàng</button>
        <div class="product-info">
		    <h3 class="product-name">${data.attributes.Name}</h3>
		    <div class="price-box">
			    <span class="gia">Giá:</span> ${data.attributes.Cost}₫
			</div>
		</div>
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
                <p>${index.attributes.Introduce}</p>
                <h2>${index.attributes.Name}</h2>
                </div>
            </div>
           `;
           rootDetail.innerHTML = html;
        }
    }
}

