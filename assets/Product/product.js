const rootElement = document.getElementById('root');
const cafeElement = document.getElementById('cafe');
const fruitElement = document.getElementById('fruit');
const teaElement = document.getElementById('tea');
const cakeElement = document.getElementById('cake');
const rootDetail = document.getElementById('detail');
// const ProductAPI = 'http://localhost:1337/api/productions';
const ProductAPI = 'https://teahappy.herokuapp.com/api/productions';

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
        <div class="product-info">
		    <h3 class="product-name">${data.attributes.Name}</h3>
		    <div class="price-box">
			    <span class="gia">Giá:</span> ${data.attributes.Cost}₫
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
            <div class="row">
                <div class="item-img">
                    <img src=${index.attributes.PhotoURL} alt="" />
                </div>
                <div class="detail-info">
                    <h1>${index.attributes.Name}</h1>
                    <i>Mô tả đang cập nhật</i>
                    <h2>Giá: <span>${index.attributes.Cost}₫</span></h2>
                    <div class="detail-info-number-item">
                        <span>Số lượng: </span>
                        <input class="cart-quantity-input" type="number" value="1">
                    </div>
                    <div class="detail-button row">
                        <a href="../User/cart.html" class="">
                            <button class="detail-button-add ti-shopping-cart">
                                <span>Thêm vào giỏ hàng</span>
                            </button>
                        </a>
                        <a href="../User/cart.html" class="">  
                            <button class="button-buy"><span>Mua ngay</span> </button>
                        </a>
                    </div>
                </div>
                </div>
                <div class="main-detail">
                    <h2>Chi tiết sản phẩm</h2>
                    <p>Vải là một loại quả được nhiều người yêu thích không chỉ khi ăn quả hay khi chế biến thành món trà vải thơm ngon. Nhân lúc mùa vải đang rộ các bạn hãy thử tự làm cho mình những cốc trà vải thật ngon để thưởng thức trong hè nha.</p>
                </div>
           `;
           rootDetail.innerHTML = html;
        }
    }
}
