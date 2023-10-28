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
        <div class="w-4/5 mx-auto my-10">
            <h1 class="text-3xl font-bold">Products</h1>
            <h5 class="text-l text-gray-600">Our current product collection!</h5>
            <div class="flex flex-row my-5 flex-wrap justify-around">
                { allProducts ?
                allProducts.map(product => (
                    // <ProductCard key={product.SKU_ID} data={product}/>
                    <a href={`/products/${product.SKU_ID}`} key={product.SKU_ID} className="card" class="relative block w-3/12 h-300 mx-3 my-2 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100" >
                        <div class="block top-0 right-0 bottom-0 left-0 ease-in-out duration-300 hover:scale-110">
                            <img class="h-40 mx-auto" src={product.PictureMain}/>
                            <h5 class="mb-2 text-center text-xl font-bold tracking-tight text-gray-900 dark:text-white">{product.ItemName}</h5>
                            <p class="text-center font-normal text-gray-700 dark:text-gray-400">£{product.SalesPrice}</p>
                        </div>
                    </a>
                ))
                : <p>Products could not be rendered</p>}
            </div>
        </div>
    )
}

export default Product;