sidebar = document.querySelector('.side-bar');
cartbar = document.querySelector('.cart-items-sidebar');

var allCategories = [];
var cartItemCount = 0;
var cartItems = [];

function sidebarOpen(){
    sidebar.classList.add("active");
}

function sidebarClose(){
    sidebar.classList.remove("active");
}

function cartOpen(){
    cartbar.classList.add("toggle-cart");
}

function cartClose(){
    cartbar.classList.remove("toggle-cart");
}

function loadAll(){
    loadCategories();
    loadProducts("https://fakestoreapi.com/products");
    getCartItemsCount();
}

function loadProducts(url){
    document.querySelector('.products-container').innerHTML = '';
    fetch(url)
    .then(function(resp){
        return resp.json()
    })
    .then(function(products){
        products.map(function(product){
            var div = document.createElement('div');
            div.className = "card-box";
            div.innerHTML = `
            <img src="${product.image}" />
            <span class="card-tag">NEW</span>
            <div class="product-title">${product.title}</div>
            <div class="card-footer-part d-flex justify-content-between align-items-center mx-2">
                <span class="product-price">$${product.price}</span>
                <button onclick="addToCart(${product.id})" class="btn rounded-circle fs-4 bi bi-cart2"></button>
            </div>
            `

            document.querySelector('.products-container').appendChild(div);
        })
    })
}

function loadCategories(){
    fetch("https://fakestoreapi.com/products/categories")
    .then(function(resp){
        return resp.json()
    })
    .then(function(categories){
        allCategories = categories;
        allCategories.unshift('all');
        allCategories.map(function(category){
            var option = document.createElement('option');
            option.text = category;
            option.value = category;
            document.getElementById('category-dropdown').appendChild(option);

            var li = document.createElement('li');
            li.onclick = function(){
                loadProducts(`https://fakestoreapi.com/products/category/${category}`);
            }
            li.innerHTML = `<a href="#products-section">${category}</a>`;
            document.querySelector('.categories-list').appendChild(li);
        })
    })
}

function categoryChange(){
    var categoryName = document.getElementById('category-dropdown').value;
    if(categoryName === "all"){
        loadProducts("https://fakestoreapi.com/products");
    }
    else{
        loadProducts(`https://fakestoreapi.com/products/category/${categoryName}`);
    }
}

function addToCart(id){
    fetch(`https://fakestoreapi.com/products/${id}`)
    .then(function(resp){
        return resp.json()
    })
    .then(function(product){
        cartItems.push(product);
        alert(`${product.title}\n\nAdded to cart`);
        getCartItemsCount();
    })
}

function removeItem(id){
    var itemIndex = cartItems.findIndex(function(item){
        return item.id === id;
    })
    cartItems.splice(itemIndex,1);
    getCartItemsCount();
    loadCartItems();
}

function getCartItemsCount(){
    var lblCount = document.querySelector('.cart-count');
    cartItemCount = cartItems.length;
    if(cartItemCount === 0){
        lblCount.innerHTML = '';
    }
    else{
        lblCount.classList.add("badge", "rounded-circle", "bg-danger");
        lblCount.innerHTML = cartItemCount;
    }
}

function loadCartItems(){
    cartOpen();
    if(cartItemCount === 0){
        document.querySelector(".cart-empty").style.display = "block";
        document.querySelector('table').style.display = "none";
        document.querySelector(".place-order").innerHTML = '';
        document.querySelector('.cart-content').classList.add("d-flex", "justify-content-center", "text-center", "align-items-center");
        document.querySelector('.cart-empty').innerHTML = `
        <div>
        <div class="fs-1">&#128543;</div>
        <span>Cart is empty.</span>
        </div>
        `;
    }else{
        document.querySelector(".cart-empty").style.display = "none";
        document.querySelector('table').style.display = "block";
        document.querySelector('.cart-content').classList.remove("d-flex", "justify-content-center", "text-center", "align-items-center")
        document.querySelector('tbody').innerHTML = '';
        cartItems.map(function(item){
            var tr = document.createElement('tr');

            tImage = document.createElement('td');
            tTitle = document.createElement('td');
            tPrice = document.createElement('td');
            tRemove = document.createElement('td');

            tImage.innerHTML = `<img src=${item.image} width="50px" height="50px">`;
            tTitle.innerHTML = item.title;
            tPrice.innerHTML = `<span class="fw-bold">$${item.price}</span>`;
            tRemove.innerHTML = `<button onclick="removeItem(${item.id})" class="btn bi bi-trash-fill"></button>`;

            tr.appendChild(tImage);
            tr.appendChild(tTitle);
            tr.appendChild(tPrice);
            tr.appendChild(tRemove);

            document.querySelector('tbody').appendChild(tr);
        })
        document.querySelector(".place-order").innerHTML = `
            <button class="btn btn-warning" onclick="placeOrder()">Place order</button>    
        `
    }
}

function placeOrder(){
    var flag = confirm("Confirm Order?");
    if(flag){
        alert("Order Placed Succesfully..!")
        cartItemCount = 0;
        cartItems = [];
        loadCartItems();
    }
}