
const cart = [];


document.addEventListener("DOMContentLoaded", function() {
    const menu = document.getElementById('menu');
    const close = document.getElementById('close');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const totalPriceElement = document.getElementById('totalPriceElement');
    const contactForm = document.getElementById('contactForm');
    const checkoutForm = document.getElementById('checkout-form');

    
    if (menu && close) {
        menu.addEventListener("click", toggleMenu);
        close.addEventListener("click", toggleMenu);
    }

    
    function addToCart(product) {
        console.log("Adding to cart:", product); 
        const existingProduct = cart.find(item => item.name === product.name);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartDisplay();
        alert(`${product.name} has been added to your cart!`);
    }

    
    function updateCartDisplay() {
        if (!cartItemsContainer || !totalPriceElement) return;
        cartItemsContainer.innerHTML = "";
        let totalPrice = 0;

        cart.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <h2>${item.name}</h2>
                <p>Price: $${item.price.toFixed(2)}</p>
                <input type="number" value="${item.quantity}" min="1" class="cart-quantity" data-index                <input type="number" value="${item.quantity}" min="1" class="cart-quantity" data-index="${index}">
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
            totalPrice += item.price * item.quantity;
        });

        totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
    }

    
    if (cartItemsContainer) {
        cartItemsContainer.addEventListener("input", (event) => {
            if (event.target.classList.contains("cart-quantity")) {
                const index = event.target.dataset.index;
                const quantity = parseInt(event.target.value);
                if (quantity < 1) {
                    removeFromCart(index);
                } else {
                    cart[index].quantity = quantity;
                    updateCartDisplay();
                }
            }
        });

        cartItemsContainer.addEventListener("click", (event) => {
            if (event.target.classList.contains("remove-item")) {
                const index = event.target.dataset.index;
                removeFromCart(index);
            }
        });
    }

    

    
    document.querySelectorAll('.product button').forEach(button => {
        button.addEventListener('click', function() {
            const productElement = this.parentElement;
            const productName = productElement.querySelector('h2').textContent;
            const productPrice = parseFloat(productElement.querySelector('.price').textContent.replace('$', ''));
            addToCart({ name: productName, price: productPrice });
        });
    });

    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const nameField = contactForm.querySelector('input[name="name"]');
            const messageField = contactForm.querySelector('textarea[name="message"]');

            if (!nameField.value.trim() || !messageField.value.trim()) {
                alert("Please fill out all fields before submitting.");
                return;
            }

            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    
    function validateCheckoutForm() {
        const form = document.getElementById('checkout-form');
        const inputs = form.querySelectorAll('input');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });

        return isValid;
    }

    
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(event) {
            event.preventDefault();
            if (validateCheckoutForm()) {
                alert('Checkout successful! Thank you for your purchase.');
                checkoutForm.reset();
            } else {
                alert('Please fill out all fields before proceeding.');
            }
        });
    }
});