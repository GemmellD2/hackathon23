const PRODUCTS_API_URL = "http://localhost:8000/api/products";
const PRODUCTS_BY_ID_API_URL = "http://localhost:8000/api/products/getProduct/";
const ORDERS_API_URL = "http://localhost:8000/api/orders"

async function getAllProducts() {
    const res = await fetch(PRODUCTS_API_URL);
    const object = await res.json();
    return object;
}

async function getProductById(id) {
    const res = await fetch(PRODUCTS_BY_ID_API_URL + id)
    const object = await res.json();
    return object;
}

async function getAllOrders() {
    const res = await fetch("http://localhost:8000/api/orders/")
    const object = await res.json();
    return object;
}

async function getAllCustomers() {
    const res = await fetch("http://localhost:8000/api/customers/")
    const object = await res.json();
    return object;
}

module.exports = {
    getAllCustomers,
    getAllOrders,
    getProductById,
    getAllProducts,
}