let cart = JSON.parse(localStorage.getItem('cart')) || {}; // retrieve cart from localstorage
window.onload = function() { // exec on load

  // dict mapping product ids to product names and associatded prices
  let productNames = {
    "1": { "name": "Velocity Vortex", "price": 50 },
    "2": { "name": "Urban Gliders", "price": 48 },
    "3": { "name": "Neon Nomads", "price": 56 },
    "4": { "name": "Eclipse Runners", "price": 64 },
    "5": { "name": "Quantum Quicks", "price": 72 },
    "6": { "name": "Mythic Mesh", "price": 80 },
    "7": { "name": "Skywalk Sneaks", "price": 88 },
    "8": { "name": "Rebel Racers", "price": 96 },
    "9": { "name": "Phantom Flex", "price": 130 },
    "10": { "name": "Halo Hikers", "price": 112 },
  };

  let cartContainer = document.querySelector('.itemsInCart'); // select div thatll display cart items
  let totalPrice = 0; // init total

  for (let id in cart) { // iter thru cart
    let quantity = cart[id]; // get quantity by measuring howm nay of same id there is in cart

    // get prod name and price using prod id
    let productName = productNames[id].name;
    let productPrice = productNames[id].price;
    let productImage = "Shoe " + id + ".jpg";

    // update total price
    totalPrice += quantity * productPrice;

    // get price from local storage
    let storedPrice = localStorage.getItem('totalPrice');
    if (storedPrice >0) {
      totalPrice = parseFloat(storedPrice);
    }

    // create HTML for the cart item
    let cartItemHtml = `<div class="cart-item" data-id="${id}" style="color: white;">
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
          localStorage.removeItem('totalPrice');
          localStorage.removeItem('voucherCodesUsed');
          cartContainer.innerHTML = '<p>No items in cart</p>';
        }

      } else {
        // update quantity
        let quantityElement = cartItem.querySelector('.quantity');
        quantityElement.textContent = 'Quantity: ' + cart[id];
      }

      // update cart in localstorage
      localStorage.setItem('cart', JSON.stringify(cart));
      localStorage.removeItem('voucherCodesUsed');
      localStorage.setItem('totalPrice', totalPrice - productNames[id].price);
      window.location.reload(); // reload the page to show new total
    });
  }
  // same check as before to see if cart is empty
  if (Object.keys(cart).length === 0) {
    // remove totalprice in localstorage
    localStorage.removeItem('totalPrice');
    localStorage.removeItem('voucherCodesUsed');
    cartContainer.innerHTML = '<p>No items in cart</p>';
  }

  // get clear cart button
  let clearButton = document.querySelector('.clear button');
  clearButton.addEventListener('click', function() {
    // clear cart
    cart = {};
    // update localstorage
    localStorage.setItem('cart', JSON.stringify(cart));
      localStorage.removeItem('totalPrice');
      localStorage.removeItem('voucherCodesUsed');
      localStorage.removeItem('visited');
      
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

let used = false; // must be globaL to prevent resetting to false each invocation of applyVoucher
let voucherCodesUsed = JSON.parse(localStorage.getItem('voucherCodesUsed')) || {};
function applyVoucher() {
  let voucherCode = document.getElementById('voucherCode').value.trim();
  let discount = 0;


      const discount1 = { // discount object with getters and setters as methods
          code: "20OFF",
          discount: 20,
          used: false,
          getCode : function() {
              return this.code;
          },getDiscount : function() {
              return this.discount;
          },getUsed : function() {
              return this.used;
          },setUsed : function(value) {
              this.used = value;
          }};

    const discount2 = {
      code: "DONKEYSFORSALE",
      discount: 100,
      used: false,
      getCode : function() {
          return this.code;
      },getDiscount : function() {
          return this.discount;
      },getUsed : function() {
          return this.used;
      },setUsed : function(value) {
          this.used = value;
      }};

  let voucherCodes = [ // dict holding discount objects
    { code: discount1 },
    { code: discount2 },
  ];

    let voucherValid = false;
    let discountObject;
    console.log(discount1.getUsed);

// check the used from localStorage
for (let i = 0; i < voucherCodes.length; i++) {
    if (voucherCodes[i].code.getCode() === voucherCode) {
        if (voucherCodesUsed[voucherCode]) {
            alert(voucherCode+" already used!");
            return;
        } else {
            voucherValid = true;
            discount = voucherCodes[i].code.getDiscount();
            discountObject = voucherCodes[i].code;
            break;
        }
    }
}

// If the voucher code is valid, mark it as used in localStorage
if (voucherValid) {
    voucherCodesUsed[voucherCode] = true;
    localStorage.setItem('voucherCodesUsed', JSON.stringify(voucherCodesUsed)); // stringify coverts 2 string
} else {
    alert("Invalid voucher code!");
    return;
  }
    for (let i = 0; i < voucherCodes.length; i++) {
        if (voucherCodes[i].code.getCode() === voucherCode) {
            used = true;
            voucherCodes[i].code.setUsed(true);
            break;
        }
    }

  // Apply discount
  let totalElement = document.querySelector('.total span');
  let totalPrice = parseFloat(totalElement.textContent);
  let newTotalPrice = totalPrice * (100 - discount) / 100;
  // store new price in local storage
  localStorage.setItem('totalPrice', newTotalPrice);

  // Prevent total price from going negative
  if (newTotalPrice < 0) {
    newTotalPrice = totalPrice; // resetting back to original total price
  }

  totalElement.textContent = newTotalPrice.toFixed(2);
  alert("Voucher applied successfully!");

  // clear the input field
  document.getElementById('voucherCode').value = '';
}

function login() {
  var username = prompt("Please enter your username:");
  var password = prompt("Please enter your password:");
  if (username === "admin" && password === "admin") {
    alert("Login successful!");
    alert("Thank you For shopping at StepUp")
  } else {
    alert("Login failed!");
  }
}