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
            <div>
                <div style={{textAlign:'center',paddingTop:"10px", fontSize:20}}>
                    <h1 className='font-normal leading-relaxed text-inherit antialiased'>{productData[0].ItemName}</h1>
                </div>

                <div className="flex flex-row w-4/5 mx-auto mt-5">
                    <div className="container mx-auto">
                    <img src={productData[0].PictureMain} style={{width:'200px' }}></img>
                    </div>
                    <div className="container mr-5 border-solid">
                    {productData[0].Online ? (<p className='block font-semibold text-xl font-normal leading-relaxed text-inherit antialiased '>Product is available online</p>):(<p className='block font-semibold text-xl font-normal leading-relaxed text-inherit antialiased bold'>Product is available only in store</p>)}
                    <p className='block font-sans text-xl font-normal leading-relaxed text-inherit antialiased'>{productData[0].ProductDetail}</p>
                    <div>
                        <div className='flex flex-row mt-5'>
                            <p className='block font-sans text-xl font-normal leading-relaxed text-inherit antialiased'>Quantity in stock: {productData[0].QtyInStock}</p>
                            <p className='block font-semibold text-xl font-normal leading-relaxed text-inherit antialiased ml-5'>Price: £{productData[0].SalesPrice}</p>
                            <Button className='ml-10'>Buy now</Button>
                        </div>
                    </div>
                </div>
                    </div>
                </div>
        )
}