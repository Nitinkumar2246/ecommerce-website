/* =========================
   PRODUCTS
========================= */

const products = [

    {
        id: 1,

        name: "Wireless Headphones",

        price: 1499,

        category: "Electronics",

        image:
            "https://picsum.photos/400/300?random=1"
    },


    {
        id: 2,

        name: "Smart Watch",

        price: 2499,

        category: "Electronics",

        image:
            "https://picsum.photos/400/300?random=2"
    },


    {
        id: 3,

        name: "Running Shoes",

        price: 1999,

        category: "Fashion",

        image:
            "https://picsum.photos/400/300?random=3"
    },


    {
        id: 4,

        name: "Backpack",

        price: 999,

        category: "Accessories",

        image:
            "https://picsum.photos/400/300?random=4"
    },


    {
        id: 5,

        name: "Mobile Phone",

        price: 14999,

        category: "Electronics",

        image:
            "https://picsum.photos/400/300?random=5"
    },


    {
        id: 6,

        name: "Laptop",

        price: 49999,

        category: "Electronics",

        image:
            "https://picsum.photos/400/300?random=6"
    }

];



/* =========================
   CART
========================= */

let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];



/* =========================
   DISPLAY PRODUCTS
========================= */

function displayProducts(productList) {

    const productsContainer =
        document.getElementById("products");


    productsContainer.innerHTML = "";


    if (productList.length === 0) {

        productsContainer.innerHTML = `

            <h3>
                No products found
            </h3>

        `;

        return;
    }


    productList.forEach(product => {

        const productCard =
            document.createElement("div");


        productCard.classList.add(
            "product-card"
        );


        productCard.innerHTML = `

            <a
                href="product.html?id=${product.id}"
            >

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </a>


            <h3>

                <a
                    href="product.html?id=${product.id}"
                >

                    ${product.name}

                </a>

            </h3>


            <p class="price">

                ₹${product.price}

            </p>


            <button
                class="add-cart"
                onclick="addToCart(${product.id})"
            >

                Add to Cart

            </button>

        `;


        productsContainer.appendChild(
            productCard
        );

    });

}


displayProducts(products);



/* =========================
   ADD TO CART
========================= */

function addToCart(id) {

    const product =
        products.find(
            item => item.id === id
        );


    const existingProduct =
        cart.find(
            item => item.id === id
        );


    if (existingProduct) {

        existingProduct.quantity++;

    }

    else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    saveCart();

    updateCart();


    alert(
        product.name +
        " added to cart!"
    );

}



/* =========================
   SAVE CART
========================= */

function saveCart() {

    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );

}



/* =========================
   UPDATE CART
========================= */

function updateCart() {

    const cartItems =
        document.getElementById(
            "cartItems"
        );


    const cartCount =
        document.getElementById(
            "cartCount"
        );


    const cartTotal =
        document.getElementById(
            "cartTotal"
        );


    if (!cartItems) {

        return;

    }


    cartItems.innerHTML = "";


    let total = 0;

    let count = 0;


    cart.forEach(item => {

        total +=
            item.price *
            item.quantity;


        count += item.quantity;


        const cartItem =
            document.createElement(
                "div"
            );


        cartItem.classList.add(
            "cart-item"
        );


        cartItem.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >


            <div
                class="cart-item-info"
            >

                <h4>
                    ${item.name}
                </h4>

                <p>
                    ₹${item.price}
                </p>


                <div
                    class="quantity"
                >

                    <button
                        onclick="
                        decreaseQuantity(
                            ${item.id}
                        )"
                    >
                        -
                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        onclick="
                        increaseQuantity(
                            ${item.id}
                        )"
                    >
                        +
                    </button>

                </div>

            </div>


            <button
                class="remove-btn"
                onclick="
                removeFromCart(
                    ${item.id}
                )"
            >

                Remove

            </button>

        `;


        cartItems.appendChild(
            cartItem
        );

    });


    cartCount.textContent = count;

    cartTotal.textContent = total;

}



/* =========================
   INCREASE QUANTITY
========================= */

function increaseQuantity(id) {

    const item =
        cart.find(
            item => item.id === id
        );


    if (item) {

        item.quantity++;

    }


    saveCart();

    updateCart();

}



/* =========================
   DECREASE QUANTITY
========================= */

function decreaseQuantity(id) {

    const item =
        cart.find(
            item => item.id === id
        );


    if (!item) {

        return;

    }


    if (item.quantity > 1) {

        item.quantity--;

    }

    else {

        removeFromCart(id);

        return;

    }


    saveCart();

    updateCart();

}



/* =========================
   REMOVE CART ITEM
========================= */

function removeFromCart(id) {

    cart =
        cart.filter(
            item => item.id !== id
        );


    saveCart();

    updateCart();

}



/* =========================
   OPEN CART
========================= */

document
    .getElementById("cartBtn")
    .addEventListener(
        "click",
        () => {

            document
                .getElementById("cart")
                .classList.add(
                    "active"
                );

        }
    );



/* =========================
   CLOSE CART
========================= */

document
    .getElementById("closeCart")
    .addEventListener(
        "click",
        () => {

            document
                .getElementById("cart")
                .classList.remove(
                    "active"
                );

        }
    );



/* =========================
   SEARCH
========================= */

document
    .getElementById("searchInput")
    .addEventListener(
        "input",
        function () {

            const searchText =
                this.value.toLowerCase();


            const filteredProducts =
                products.filter(
                    product =>

                    product.name
                        .toLowerCase()
                        .includes(
                            searchText
                        )

                );


            displayProducts(
                filteredProducts
            );

        }
    );



/* =========================
   CATEGORY FILTER
========================= */

function filterProducts(category) {

    if (category === "All") {

        displayProducts(products);

        return;

    }


    const filteredProducts =
        products.filter(
            product =>
                product.category === category
        );


    displayProducts(
        filteredProducts
    );

}



/* =========================
   SHOP NOW
========================= */

function scrollToProducts() {

    document
        .getElementById(
            "productsSection"
        )
        .scrollIntoView({
            behavior: "smooth"
        });

}



/* =========================
   CHECKOUT
========================= */

document
    .getElementById("checkoutBtn")
    .addEventListener(
        "click",
        () => {

            if (cart.length === 0) {

                alert(
                    "Your cart is empty!"
                );

                return;

            }


            alert(
                "Order placed successfully!"
            );


            cart = [];


            saveCart();

            updateCart();

        }
    );



/* =========================
   INITIAL CART
========================= */

updateCart();