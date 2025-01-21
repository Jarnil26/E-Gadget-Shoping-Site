let products = [];

// Fetch products from JSON file
async function fetchProducts() {
  const response = await fetch('./data/products.json');
  products = await response.json();
  displayProducts(products);
  loadCategories();
}

// Display products in the grid
function displayProducts(productList) {
  const productGrid = document.getElementById('products');
  productGrid.innerHTML = '';
  productList.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Category: ${product.category}</p>
      <p>Price: ${product.price}</p>
      <button class="buy-button" onclick="addToCart('${product.name}')">Buy</button>
    `;
    productGrid.appendChild(productCard);
  });
}

// Load categories dynamically
function loadCategories() {
  const categories = ['All', ...new Set(products.map(p => p.category))];
  const categoryList = document.getElementById('categories');
  categoryList.innerHTML = '';
  categories.forEach(category => {
    const li = document.createElement('li');
    li.textContent = category;
    li.onclick = () => filterProducts(category);
    categoryList.appendChild(li);
  });
}

// Filter products by category
function filterProducts(category) {
  if (category === 'All') {
    displayProducts(products);
  } else {
    const filtered = products.filter(product => product.category === category);
    displayProducts(filtered);
  }
}

// Search products
function searchProducts() {
  const query = document.getElementById('search').value.toLowerCase();
  const filtered = products.filter(product =>
    product.name.toLowerCase().includes(query)
  );
  displayProducts(filtered);
}

// Add product to cart
function addToCart(productName) {
  alert(`${productName} added to cart successfully!`);
}

// Initialize
window.onload = fetchProducts;
