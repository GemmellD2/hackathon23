//will show a view of all orders which should be able to be sorted/filtered
import React, { Component, useEffect, useState } from 'react';
import '../App.css';
import { getAllProducts } from '../services';

const allProducts = await getAllProducts();

const ProductCard = (key, data) => { 
    return (
        <li key={data.SKU_ID} className="card" >
            <h2>{data.ItemName}</h2>
            <p>{data.SKU_ID}</p>
            <p>{data.ItemDescription}</p>
            <p>{data.ItemPrice}</p>
            <p>{data.ItemQuantity}</p>
        </li>
    )
} 

const Product = () => {

    console.log(allProducts)

    return (
        <div class="w-4/5 mx-auto">
            <h1 class="text-3xl font-bold">Products</h1>
            <div class="flex flex-row my-5 flex-wrap justify-around [&>*:nth-child(2+3n)]">
                { allProducts ?
                allProducts.map(product => (
                    // <ProductCard key={product.SKU_ID} data={product}/>
                    <a href={`/products/${product.SKU_ID}`} key={product.SKU_ID} className="card" class="block w-3/12 mx-3 my-2 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" >
                        <img class="h-40 mx-auto" src={product.PictureMain}/>
                        <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{product.ItemName}</h5>
                        <p class="text-center font-normal text-gray-700 dark:text-gray-400">£{product.SalesPrice}</p>
                    </a>
                ))
                : <p>Products could not be rendered</p>}
            </div>
        </div>
    )
}

export default Product;