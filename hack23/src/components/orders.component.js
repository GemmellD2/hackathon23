//will show a view of all orders which should be able to be sorted/filtered
import React from "react";
import '../App.css';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { getOrdersById, getAllOrders } from "../services";


var userId = localStorage.getItem('userId');
var isLoggedIn = localStorage.getItem('isLoggedIn');

if (userId == "admin"){
    var orderData = await getAllOrders();
}
else{
    var orderData = await getOrdersById(parseInt(userId))
}

export function Orders() {
const [openAccordions, setOpenAccordions] = React.useState([]);
const handleOpen = (index) => {
    if (openAccordions.includes(index)) {
      setOpenAccordions(openAccordions.filter((i) => i !== index));
    } else {
      setOpenAccordions([...openAccordions, index]);
    }
  };

return (
    <div className="w-4/5 mx-auto my-10">
    <div>
        <h1 className="font-bold text-3xl">Your Orders</h1>
        {isLoggedIn ? (<h2></h2>) : (<h2 className="font-bold text-2xl mt-10">You're not logged in, so no orders.</h2>)}
    </div>
    <div>
    {orderData.map((item, index) => (
        <Accordion open={openAccordions.includes(index)} key={index}>
        <AccordionHeader onClick={() => handleOpen(index)}>Order {index + 1} - ID #{item.Id}</AccordionHeader>
        <AccordionBody className="p-4">
<p className="text-lg font-semibold">Order Date: {item.DateCreated}</p>
<p className="mb-4">Number of Items: {item.Products.length}</p>
<ul>
    {item.Products.map((product, productIndex) => (
    <li key={productIndex} className="mb-4 p-4 border border-gray-300 rounded-lg">
        <div className="flex items-center">
        <img src={product.PictureMain} alt={product.ItemName} className="w-20 h-20 object-contain rounded" />
        <div className="ml-4">
            <p className="text-xl font-semibold">{product.ItemName}</p>
            <p className="text-gray-600">Brand: {product.BrandName}</p>
            <p className="text-blue-600 font-semibold">Price: £{product.SalesPrice}</p>
        </div>
        </div>
    </li>
    ))}
</ul>
<div className="mt-4">
            {userId != "admin" ?
            (<iframe
            width="100%"
            height="300"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-4.2593393,55.8469494,-4.2293393,55.8669494&layer=mapnik&marker=55.8569494,-4.2443393">
            </iframe>)
            : (<h1></h1>) }
    </div>
</AccordionBody>
    </Accordion>
    ))}
    </div>
    </div>
);
}

export default Orders;