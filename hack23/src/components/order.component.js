//will show a view of all orders which should be able to be sorted/filtered
import React from "react";
import '../App.css';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { getOrderById, getAllOrders, getCustomerById } from "../services";
import categories from './categories';
import { useState, useEffect } from "react";

const customer = await getCustomerById(localStorage.getItem('userId'));
const orderId = window.location.pathname.split("/")[2]
console.log(orderId)

function getLoyalty(){
    if (customer.length == 0)
        return 0;
    
    return customer[0].LoyaltyLevel;
}

const loyalty = getLoyalty();

function getPrice(product){
    var initialPrice = product.SalesPrice
    if (loyalty === 3)
        return 0.9 * initialPrice;
    else if (loyalty === 2 && (product.Category.startsWith('GU') || product.Category.startsWith('ACGB')))
        return 0.9 * initialPrice
    else if (loyalty === 1 && product.Category.startsWith("GU"))
        return 0.95 * initialPrice

    return initialPrice
}

var userId = localStorage.getItem('userId');
var isLoggedIn = localStorage.getItem('isLoggedIn');
var orderData = await getOrderById(parseInt(orderId))

function mapDeliveryStatus(status){
    if (status === 1){
        return "Order Placed"
    }
    else if (status === 2){
        return "Order Dispatched"
    }
    else if (status === 3){
        return "Order Delivering"
    }
    else if (status === 4){
        return "Order Delivered"
    }
    else if (status === 5){
        return "Order Completed"
    }
    else if (status === 6){
        return "Order Cancelled"
    }
}

export function Order() {
return (
    <div className="w-4/5 mx-auto my-10">
        <div>
            <div className='flex flex-row justify-between'>
                <h1 className="font-bold text-3xl">Your Order: #{orderId}</h1>
            </div>
            {isLoggedIn ? (<h2></h2>) : (<h2 className="font-bold text-2xl mt-10">You're not logged in, so no orders.</h2>)}
        </div>
        <div>
        {orderData.map((item, index) => (
            <div>
                <p className="text-lg font-semibold text-gray-600">Order Date: {item.DateCreated}</p>
                <p className="text-lg font-semibold text-gray-600">Order Status: {mapDeliveryStatus(item.OrderStatus)}</p>

                <p className="font-semibold text-xl mb-1 mt-4">Order Summary</p>
                <p className="mb-4">Number of Items: {item.Products.length}</p>
                <ul>
                    {item.Products.map((product, productIndex) => (
                        <li key={productIndex} className="mb-4 p-4 border border-gray-300 rounded-lg">
                            <div className="flex items-center">
                            <img src={product.PictureMain} alt={product.ItemName} className="w-20 h-20 object-contain rounded" />
                            <div className="ml-4">
                                <p className="text-xl font-semibold">{product.ItemName}</p>
                                <p className="text-gray-600">Brand: {product.BrandName}</p>
                                {product.SalesPrice === getPrice(product) ?
                                (<p className="text-blue-600 font-semibold">Price: £{product.SalesPrice}</p>)
                                :
                                (<div><p className="text-gray-700 font-semibold line-through">Price: £{product.SalesPrice}</p> <span className="text-red-700">Discounted Price: £{getPrice(product).toFixed(2)}</span></div>)
                                }
                            </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <p className="font-semibold text-lg mb-1">Order Total: £{item.OrderTotal}</p>
                <hr class="my-4 h-0.5 border-t-0 bg-grey-200 opacity-100" />
                <div>
                    <p className="font-semibold text-xl mb-1">Delivery Address</p>
                    <p>{item.ShippingAddress.city}</p>
                    <p>{item.ShippingAddress.street_name}</p>
                    <p>{item.ShippingAddress.street_address}</p>
                    <p>{item.ShippingAddress.zip_code} {item.ShippingAddress.country}</p>
                    <p>{item.ShippingAddress.country}</p>
                </div>
                <p className="font-semibold text-lg mb-1 mt-4">Map</p>
                <div className="mt-2">
                        
                        <iframe
                        width="100%"
                        height="300"
                        src="https://www.openstreetmap.org/export/embed.html?bbox=-4.2593393,55.8469494,-4.2293393,55.8669494&layer=mapnik&marker=55.8569494,-4.2443393">
                        </iframe>
                </div>
            </div>
        ))}
        </div>
    </div>
);
}

export default Order;