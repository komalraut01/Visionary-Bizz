document.addEventListener("DOMContentLoaded", function () {
    const products = [
        { id: 1, name: "Luxury Oud Perfume", image: "images/perfume1.jpg", price: "$49" },
        { id: 2, name: "Rose Attar", image: "images/attar1.jpg", price: "$29" },
        { id: 3, name: "Arabian Bakhoor", image: "images/bakhoor1.jpg", price: "$35" }
    ];

    const productList = document.getElementById("product-list");
    const cart = [];

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

    // ✅ Event Delegation for "Add to Cart" buttons
    document.getElementById("product-list").addEventListener("click", function (event) {
        if (event.target.classList.contains("add-to-cart")) {
            const productId = event.target.getAttribute("data-id");
            cart.push(productId);
            document.getElementById("cart-count").textContent = cart.length;
            alert("Product added to cart!"); // Optional confirmation
        }
    });

    // ✅ Dark Mode Toggle
    document.getElementById("dark-mode-toggle").addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
    });

    // ✅ Search Functionality
    document.getElementById("search-input").addEventListener("input", function () {
        const query = this.value.toLowerCase();
        document.querySelectorAll(".card").forEach(card => {
            const title = card.querySelector(".card-title").textContent.toLowerCase();
            card.style.display = title.includes(query) ? "block" : "none";
        });
    });
});
