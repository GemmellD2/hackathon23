//will show a products details
import React from 'react';
import '../App.css';

var productData
const id = window.location.pathname.split("/")[2]

export const Product = () => {
    
    // Send a POST request with JSON data to https://example.com/api
    console.log(productData)
        return (
            <div>
                <h1>{productData[0].ItemName}</h1>
            </div>
        )
}