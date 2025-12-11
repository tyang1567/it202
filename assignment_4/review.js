document.addEventListener('DOMContentLoaded', () => {
    loadSelected();
});

function loadSelected() {
    const container = document.getElementById('selectedContent');
    fetch('/api/selected-product')
        .then(res => {
            if (!res.ok) {
                throw new Error('No product selected');
            }
            return res.json();
        })
        .then(product => {
            console.log('product data:', product);
            renderSelected(product);
        })
        .catch(err => {
            console.error('Error loading product:', err);
            container.innerHTML = '<div class="p-6 text-center text-red-600">No product selected.</div>'
        });
}

// Display the product details
function renderSelected(product) {
    const container = document.getElementById('selectedContent');
    container.innerHTML = `
        <img class="w-full h-64 object-cover mb-4 rounded" src="${product.image}" alt="${product.name}">
        <h2 class="text-xl font-semibold mb-2">${product.name}</h2>
        <p class="text-gray-600 mb-2">${product.description}</p>
        <p class="text-gray-800 font-bold mb-4">$${product.price.toFixed(2)}</p>
        <button id="submitBtn" class="bg-green-600 hover:bg-green-700 text-white font-medium rounded-md px-4 py-2.5 shadow">
            Submit Order
        </button>
    `;
    document.getElementById('submitBtn').addEventListener('click', () => submitOrder(product));
}

function submitOrder(product) {
    const payload = {
        productId: product.id,
        productName: product.name,
        price: product.price
    };

    fetch('/api/submit-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Failed to submit order');
        }
        return res.json();
    })
    .then(data => {
        const confirmationDiv = document.getElementById('confirmation');
        confirmationDiv.innerHTML = `<div class="mt-4 p-4 bg-green-50 border border-green-200 text-green-800 rounded">${data.message}</div>`;
    })
    .catch(err => {
        console.error('Error submitting order:', err);
    });
}