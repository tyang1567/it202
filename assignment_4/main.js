document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/products')
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to fetch products');
            }
            return res.json();
        })
        .then(products => {
            console.log('loaded products:', products);
            const container = document.getElementById('products');
            container.innerHTML = products.map(product => createCard(product)).join('');
            
            products.forEach(product => {
                document.getElementById(`buy-${product.id}`).addEventListener('click', () => {
                    selectProduct(product.id);
                });
            });
        })
        .catch(err => {
            console.error('Failed to load products:', err);
            document.getElementById('products').innerText = 'Failed to load products.';
        });
});

function createCard(product) {
    return `
        <div class="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <a href="#">
                <img class="w-full h-48 object-cover" src="${product.image}" alt="${product.name}">
            </a>
            <div class="p-6 text-center">
                <a href="#" class="block">
                    <h5 class="mt-3 mb-4 text-xl font-semibold tracking-tight text-gray-900">${product.name}</h5>
                </a>
                <p class="text-gray-600 mb-3">${product.description}</p>
                <p class="text-gray-800 font-bold mb-4">$${product.price.toFixed(2)}</p>
                <button id="buy-${product.id}" class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md px-4 py-2.5 shadow">
                    Buy
                </button>
            </div>
        </div>
    `;
}

// Send selected product id to server
function selectProduct(id) {
    console.log('selecting product id:', id);
    fetch('/api/select-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Failed to select product');
        }
        window.location.href = '/review.html';
    })
    .catch(err => {
        console.error('Error selecting product:', err);
        alert('Could not select product. Please try again.');
    });
}