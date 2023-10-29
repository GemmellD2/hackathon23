const PRODUCTS_API_URL = "http://localhost:8000/api/products";
const PRODUCTS_BY_ID_API_URL = "http://localhost:8000/api/products/getProduct/";
const ORDERS_API_URL = "http://localhost:8000/api/orders";
const ORDERS_BY_ID_API_URL = "http://localhost:8000/api/customers/getOrders/";
const CUSTOMERS_API_URL = "http://localhost:8000/api/customers/";

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
    const res = await fetch(ORDERS_API_URL)
    const object = await res.json();
    return object;
}

async function getOrdersById(id){
    const res = await fetch(ORDERS_BY_ID_API_URL + id)
    const object = await res.json();
    return object;
}

async function getAllUserIds(){
    const res = await fetch(CUSTOMERS_API_URL);
    const object = await res.json();
    const allUserIds = [];

    object.forEach(user => {
        const userId = user.Id;
        allUserIds.push(userId);
    });

    return allUserIds;
}

async function getCustomerById(id){
    const res = await fetch(CUSTOMERS_API_URL + id)
    const object = await res.json();
    return object;
}

module.exports = {
    getAllOrders,
    getProductById,
    getAllProducts,
    getOrdersById,
    getAllUserIds,
    getCustomerById,
}