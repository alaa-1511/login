
let productName = document.getElementById('productName');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let productCategory = document.getElementById('productCategory');
let productDescription = document.getElementById('productDescription');
let productImage = document.getElementById('productImage');
let SearchInput = document.getElementById('SearchInput');
let addbtn = document.getElementById('addbtn');
let updatebtn = document.getElementById('updatebtn');
let logout=document.getElementById('logout');
let productsContainer = [];


logout.addEventListener('click',function(e) {
    e.preventDefault();
    window.location.href = "index.html";
})
// Load products from localStorage
if (localStorage.getItem("products") !== null) {
    productsContainer = JSON.parse(localStorage.getItem("products"));
    displayProduct();
}

// Calculate total
function getTotal() {
    if (price.value !== '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#FF8C9E';
    } else {
        total.innerHTML = '';
        total.style.background = '#FF4E88';
    }
}

// Add new product
function addProdect() {
    let product = {
        productName: productName.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        productCategory: productCategory.value,
        productDescription: productDescription.value,
        productImage: productImage.files[0] ? `imgs/${productImage.files[0].name}` : "imgs/default.jpg"
    };

    productsContainer.push(product);
    localStorage.setItem("products", JSON.stringify(productsContainer));
    clearProdect();
    displayProduct();
}

// Display products
function displayProduct() {
    let box = "";
    for (let i = 0; i < productsContainer.length; i++) {
        box += `<div class="col-sm-6 col-lg-4">
                    <div class="card text-center">
                        <div class="card-img">
                            <img src="${productsContainer[i].productImage}" alt="Product Image">
                        </div>
                        <div class="card-body">
                            <h2>${productsContainer[i].productName}</h2>
                            <p>${productsContainer[i].productDescription}</p>
                            <h3>Price: ${productsContainer[i].total}</h3>
                            <h3>Category: ${productsContainer[i].productCategory}</h3>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button>
                            <button class="btn btn-primary" onclick="formUpdate(${i})">Update</button>
                        </div>
                    </div>
                </div>`;
    }
    document.getElementById('rowData').innerHTML = box;
}

// Clear input fields
function clearProdect() {
    productName.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    productCategory.value = '';
    productDescription.value = '';
    productImage.value = '';
}

// Delete a product
function deleteProduct(index) {
    productsContainer.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(productsContainer));
    displayProduct();
}

// Search products
function searchProduct() {
    let term = SearchInput.value.toLowerCase();
    let box = "";
    for (let i = 0; i < productsContainer.length; i++) {
        if (productsContainer[i].productName.toLowerCase().includes(term)) {
            box += `<div class="col-sm-6 col-lg-4">
                        <div class="card text-center">
                            <div class="card-img">
                                <img src="${productsContainer[i].productImage}" alt="Product Image">
                            </div>
                            <div class="card-body">
                                <h2>${productsContainer[i].productName}</h2>
                                <p>${productsContainer[i].productDescription}</p>
                                <h3>Price: ${productsContainer[i].total}</h3>
                                <h3>Category: ${productsContainer[i].productCategory}</h3>
                            </div>
                            <div class="card-footer">
                                <button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button>
                                <button class="btn btn-primary" onclick="formUpdate(${i})">Update</button>
                            </div>
                        </div>
                    </div>`;
        }
    }
    document.getElementById('rowData').innerHTML = box;
}

// Update product
let updateIndex;
function formUpdate(index) {
    updateIndex = index;
    addbtn.classList.add('d-none');
    updatebtn.classList.remove('d-none');
    productName.value = productsContainer[index].productName;
    price.value = productsContainer[index].price;
    taxes.value = productsContainer[index].taxes;
    ads.value = productsContainer[index].ads;
    discount.value = productsContainer[index].discount;
    total.innerHTML = productsContainer[index].total;
    productCategory.value = productsContainer[index].productCategory;
    productDescription.value = productsContainer[index].productDescription;
}

function UpdateProduct() {
    productsContainer[updateIndex].productName = productName.value;
    productsContainer[updateIndex].price = price.value;
    productsContainer[updateIndex].taxes = taxes.value;
    productsContainer[updateIndex].ads = ads.value;
    productsContainer[updateIndex].discount = discount.value;
    productsContainer[updateIndex].total = total.innerHTML;
    productsContainer[updateIndex].productCategory = productCategory.value;
    productsContainer[updateIndex].productDescription = productDescription.value;

    if (productImage.files[0]) {
        productsContainer[updateIndex].productImage = `imgs/${productImage.files[0].name}`;
    }

    localStorage.setItem("products", JSON.stringify(productsContainer));
    displayProduct();
    clearProdect();

    addbtn.classList.remove('d-none');
    updatebtn.classList.add('d-none');
}
