//will show a view of all orders which should be able to be sorted/filtered
import React, { Component } from 'react';
import '../App.css';
const API_URL = "http://localhost:8000/api/products"

async function getAllProducts() {
    const res = await fetch(API_URL);
    const object = await res.json();
    console.log(object);
    return object;
}   

export default class Products extends Component {

    render() {
        getAllProducts();
        return (
            <div>
                <h1>Products</h1>

            </div>
        )}
}