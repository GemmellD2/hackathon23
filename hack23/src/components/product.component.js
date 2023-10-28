//will show a products details
import React from 'react';
import '../App.css';
import {getProductById} from "../services"
import { Button } from "@material-tailwind/react";

var productData
const id = window.location.pathname.split("/")[2]

productData = await getProductById(id)

export const Product = () => {
    
    // Send a POST request with JSON data to https://example.com/api
    console.log(productData)
        return (
            <div class="w-4/5 mx-auto my-10">
                
                <div className="flex flex-row my-5 items-center">
                    <div className="container mr-5 w-1/3 flex flex-row justify-center">
                        <img class="max-h-screen w-full h-fit" src={productData[0].PictureMain}></img>
                    </div>
                    <div className="w-2/3 mr-5 border-solid">
                        <h1 class="font-bold text-3xl">{productData[0].ItemName}</h1>
                        <h5 class="text-sm text-gray-600 mb-5">{productData[0].SKU_ID}</h5>
                        <p className='block font-sans text-base font-normal leading-relaxed text-inherit antialiased'>{productData[0].ProductDetail}</p>
                        
                        <div className='mt-2'>
                            <div>
                                {productData[0].Online ? 
                                    (<p className='block font-semibold text-green-500 text-sm leading-relaxed antialiased '>Product is available online</p>)
                                    :(<p className='block my-2 font-semibold text-red-500 text-sm leading-relaxed antialiased'>Product is available only in store</p>)}
                                <p className='block font-sans text-sm font-normal leading-relaxed text-inherit antialiased'>Quantity in stock: {productData[0].QtyInStock}</p>
                            </div>
                            
                            <p className='block font-semibold text-2xl font-normal leading-relaxed text-inherit antialiased mt-5'>Price: £{productData[0].SalesPrice}</p>
                            
                        </div>
                        <Button className='mt-2 ease-in-out duration-300 hover:bg-red-500 hover:scale-110 '>Buy now</Button>
                    
                    </div>
                </div>
            </div>
        )
}