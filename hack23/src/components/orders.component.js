//will show a view of all orders which should be able to be sorted/filtered
import React from "react";
import '../App.css';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Button,
} from "@material-tailwind/react";
import { getOrdersById, getAllOrders, getCustomerById } from "../services";
import categories from './categories';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const customer = await getCustomerById(localStorage.getItem('userId'));

function getLoyalty(){
    if (customer.length === 0)
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

if (userId === "admin"){
    var orderData = await getAllOrders();
}
else{
    var orderData = await getOrdersById(parseInt(userId))
}

function getUniqueCategories() {
    const uniqueCategories = new Set();
  
    orderData.forEach((order) => {
      order.Products.forEach((product) => {
        uniqueCategories.add(product.Category);
      });
    });
  
    return Array.from(uniqueCategories);
}

export function Orders() {
const [openAccordions, setOpenAccordions] = React.useState([]);
const [selectedCategory, setSelectedCategory] = useState('all');
const [filteredOrders, setFilteredOrders] = useState([]);
const navigate = useNavigate();

useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredOrders(orderData);
    } else {
      const filtered = orderData.filter((order) =>
        order.Products.some((product) => product.Category.startsWith(selectedCategory))
      );
      setFilteredOrders(filtered);
    }
  }, [selectedCategory, filteredOrders]);

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
        <div className='flex flex-row justify-between'>
        <h1 className="font-bold text-3xl">Your Orders</h1>
        <div class='order-last flex flex-col '>
          <label htmlFor="categorySelect" class='font-sm font-bold'>Filter your Orders:</label>
          <select id='categorySelect'
            onChange={(event) => setSelectedCategory(event.target.value)}
            class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded-lg focus:outline-none focus:border-indigo-500 focus:shadow-outline-indigo active-bg-gray-100"
          >
            <option value='all' class="text-l">All orders</option>
            {getUniqueCategories().map((category, index) => (
              <option class="text-l" key={index} value={category}>
                {categories[category.split('_')[0]]}
              </option>
            ))}
            </select>
        </div>
        </div>
        {isLoggedIn ? (<h2></h2>) : (<h2 className="font-bold text-2xl mt-10">You're not logged in, so no orders.</h2>)}
    </div>
    <div>
    {filteredOrders.map((item, index) => (
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
<a href={`/orders/${item.Id}`}><Button className='mt-2 ease-in-out duration-300 hover:bg-red-500 hover:scale-110'>Details</Button></a>
<div className="mt-4">
            {userId !== "admin" ?
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