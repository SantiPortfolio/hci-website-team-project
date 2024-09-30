let cart = JSON.parse(localStorage.getItem('cart')) || {}; // get cart from localstorage

// event listener on each add to cart button
document.querySelectorAll('.product button').forEach(button => {
  button.addEventListener('click', event => {
    let id = event.target.dataset.id; // get product id

    // add product to cart or increase quantity
    if (id in cart) {
      cart[id]++;
    } else {
      cart[id] = 1;
    }

    // store mod cart in localstorage
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.removeItem('voucherCodesUsed');
    localStorage.removeItem('totalPrice');
    // refresh cart display
    updateCartDisplay();

    // make the cart flash
    let cartElement = document.querySelector('.cart');
    cartElement.classList.add('flash');
    setTimeout(() => {
      cartElement.classList.remove('flash');
    }, 1000);
  });
});

function updateCartDisplay() {
  // number of items in cart
  let numItems = Object.values(cart).reduce((a, b) => a + b, 0);
  document.querySelector('.cart p').textContent = `Shopping Cart (${numItems})`;
}

// updatec art display on page load
window.onload = updateCartDisplay;