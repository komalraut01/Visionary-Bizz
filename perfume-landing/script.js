document.addEventListener("DOMContentLoaded", function () {
    const products = [
        { id: 1, name: "Luxury Oud Perfume", image: "images/perfume1.jpg", price: "$49" },
        { id: 2, name: "Rose Attar", image: "images/attar1.jpg", price: "$29" },
        { id: 3, name: "Arabian Bakhoor", image: "images/bakhoor1.jpg", price: "$35" }
    ];

    const productList = document.getElementById("product-list");
    const cart = [];

    if (productList) {
        products.forEach(product => {
            const productCard = `
                <div class="col-md-4">
                    <div class="card">
                        <img src="${product.image}" class="card-img-top" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.price}</p>
                            <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `;
            productList.innerHTML += productCard;
        });

        document.getElementById("product-list").addEventListener("click", function (event) {
            if (event.target.classList.contains("add-to-cart")) {
                const productId = event.target.getAttribute("data-id");
                cart.push(productId);
                document.getElementById("cart-count").textContent = cart.length;
                alert("Product added to cart!");
            }
        });
    }

    // ✅ Apply Dark Mode on Page Load
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
    }

    darkModeToggle?.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
        } else {
            localStorage.setItem("darkMode", "disabled");
        }
    });

    document.getElementById("search-input")?.addEventListener("input", function () {
        const query = this.value.toLowerCase();
        document.querySelectorAll(".card").forEach(card => {
            const title = card.querySelector(".card-title").textContent.toLowerCase();
            card.style.display = title.includes(query) ? "block" : "none";
        });
    });

    // ✅ Register Form Handling
    document.getElementById("register-form")?.addEventListener("submit", function (event) {
        event.preventDefault();
        const email = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (password !== confirmPassword) {
            alert("❌ Passwords do not match!");
            return;
        }

        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPassword", password);
        alert("✅ Registration successful! You can now login.");
        window.location.href = "login.html";
    });

    // ✅ Login Form Handling
    document.getElementById("login-form")?.addEventListener("submit", function (event) {
        event.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        const storedEmail = localStorage.getItem("userEmail");
        const storedPassword = localStorage.getItem("userPassword");

        if (email === storedEmail && password === storedPassword) {
            alert("✅ Login successful!");
            window.location.href = "index.html"; // Redirect to home
        } else {
            alert("❌ Invalid email or password!");
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const cartCount = document.getElementById("cart-count");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");

    // Load cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Update cart count
    function updateCartCount() {
        cartCount.textContent = cart.length;
    }

    // Add to Cart functionality
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const id = this.getAttribute("data-id");
            const name = this.getAttribute("data-name");
            const price = this.getAttribute("data-price");

            // Create a product object
            const product = { id, name, price };

            // Add to cart array
            cart.push(product);

            // Save to localStorage
            localStorage.setItem("cart", JSON.stringify(cart));

            // Update cart count
            updateCartCount();

            alert(`${name} has been added to the cart!`);
        });
    });

    updateCartCount();
});
