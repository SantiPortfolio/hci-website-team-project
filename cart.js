let cart = JSON.parse(localStorage.getItem('cart')) || {}; // retrieve cart from localstorage
window.onload = function() {

    // dict mapping product ids to product names and associatded prices
    let productNames = {
        "1": {"name": "Shoe 1", "price": 40},
        "2": {"name": "Shoe 2", "price": 48},
        "3": {"name": "Shoe 3", "price": 56},
        "4": {"name": "Shoe 4", "price": 64},
        "5": {"name": "Shoe 5", "price": 72},
        "6": {"name": "Shoe 6", "price": 80},
        "7": {"name": "Shoe 7", "price": 88},
        "8": {"name": "Shoe 8", "price": 96},
        "9": {"name": "Shoe 9", "price": 104},
        "10": {"name": "Shoe 10", "price": 112},
    };

    let cartContainer = document.querySelector('.itemsInCart'); // select div thatll display cart items
    let totalPrice = 0;

    for (let id in cart) {
        let quantity = cart[id];

        // get prod name and price using prod id
        let productName = productNames[id].name;
        let productPrice = productNames[id].price;
        let productImage = "Shoe " + id + ".png";
        console.log(productImage);

        // update total price
        totalPrice += quantity * productPrice;

        // create HTML for the cart item
        let cartItemHtml = `<div class="cart-item" data-id="${id}">
                <p>Product Name: ${productName}</p>
                <p class="quantity">Quantity: ${quantity}</p>
                <p class="price">Price: £${productPrice}</p>
                <img src="${productImage}" alt="Shoe Picture ${id}" style="width: 200px; height: auto;">
                <br>
                <button class="remove-button">Remove</button>
            </div>`;

        // add HTML to cart container
        cartContainer.innerHTML += cartItemHtml;
    }

    // show toatl price
    let totalElement = document.querySelector('.total span');
    totalElement.textContent = totalPrice.toFixed(2);

    // event listeners on remove buttons
    let removeButtons = document.querySelectorAll('.remove-button');
    for (let i = 0; i < removeButtons.length; i++) {
        removeButtons[i].addEventListener('click', function(event) {
            let cartItem = event.target.parentElement;
            let id = cartItem.getAttribute('data-id');
            // decrement the quantity
            cart[id]--;
            // if quantity is zero remove item from cart
            if (cart[id] === 0) {
                delete cart[id];
                // remove cart item from HTML
                cartItem.remove();
                // if no more items cahnge HTML in cart container
                if (Object.keys(cart).length === 0) {
                    cartContainer.innerHTML = '<p>No items in cart</p>';
                }

            } else {
                // update quantity
                let quantityElement = cartItem.querySelector('.quantity');
                quantityElement.textContent = 'Quantity: ' + cart[id];
            }

            // update cart in localstorage
            localStorage.setItem('cart', JSON.stringify(cart));
            window.location.reload(); // reload the page to show new total
        });
    }
    // same check as before to see if cart is empty
    if (Object.keys(cart).length === 0) {
        cartContainer.innerHTML = '<p>No items in cart</p>';
    }

    // get clear cart button
    let clearButton = document.querySelector('.clear button');
    clearButton.addEventListener('click', function() {
        // clear cart
        cart = {};
        // update localstorage
        localStorage.setItem('cart', JSON.stringify(cart));
        // reload page
        window.location.reload();
    });

    updateCartDisplay();
}



function updateCartDisplay() {
    // number of items in cart
    let numItems = Object.values(cart).reduce((a, b) => a + b, 0);
    document.querySelector('.cart p').textContent = `Shopping Cart (${numItems})`;
}