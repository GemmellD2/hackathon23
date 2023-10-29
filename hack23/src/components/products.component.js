import React, { useEffect, useState } from 'react';
import '../App.css';
import { getAllProducts, getCustomerById } from '../services';
import categories from './categories';
import { useAuth } from '../AuthContext';
import { Button } from "@material-tailwind/react";

const allProducts = await getAllProducts();
const itemsPerPage = 50; // Number of products to display per page
const customer = await getCustomerById(localStorage.getItem('userId'));

function getLoyalty(){
    if (customer.length == 0)
        return 0;
    
    return customer[0].LoyaltyLevel;
}

const loyalty = getLoyalty();

function Product() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoggedIn, login, logout } = useAuth();
  
  useEffect(() => {
    if (selectedCategory === 'all') {
      // If no category is selected, display all products
      setFilteredProducts(allProducts);
    } else {
      // Filter products based on the selected category
      const filtered = allProducts.filter((product) =>
        product.Category.startsWith(selectedCategory)
      );
      setFilteredProducts(filtered);
      // Reset the current page to 1 when the category changes
      setCurrentPage(1);
    }
  }, [selectedCategory, filteredProducts]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const productsToDisplay = filteredProducts.slice(startIndex, endIndex);

  return (
    <div class="w-4/5 mx-auto my-10">
      <div class='flex flex-row justify-between mt-5'>
        <h1 class="text-3xl font-bold">Products</h1>
        <div class='order-last flex flex-col '>
          <label htmlFor="categorySelect" class='font-sm font-bold'>Select a Category:</label>
          <select id='categorySelect'
            onChange={(event) => setSelectedCategory(event.target.value)}
            class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded-lg focus:outline-none focus:border-indigo-500 focus:shadow-outline-indigo active-bg-gray-100"
          >
            <option value='all' class="text-l">All products</option>
            {Object.keys(categories).map((category, index) => (
              <option class="text-l" key={index} value={category}>
                {categories[category]}
              </option>
            ))}
          </select>
        </div>
      </div>
      <h5 class="text-l text-gray-600">Our current product collection!</h5>
      <div class="flex flex-row my-5 flex-wrap justify-around">
        {productsToDisplay.length > 0 ? (
          productsToDisplay.map(product => (
            <a href={`/products/${product.SKU_ID}`} key={product.SKU_ID} className="card" class="relative block w-3/12 h-300 mx-3 my-2 p-6 bg-white border border-gray-200 rounded-lg shadow hover-bg-gray-100">
              <div class="block top-0 right-0 bottom-0 left-0 ease-in-out duration-300 hover-scale-110">
                <img class="h-40 mx-auto" src={product.PictureMain} alt={product.SKU_ID}/>
                <h5 class="mb-2 text-center text-xl font-bold tracking-tight text-gray-900 dark-text-white">{product.ItemName}</h5>
                {product.QtyInStock > 0 ? (<p class="text-center font-small text-green-700 mt-0">In Stock</p>) :
                (<p class="text-center font-small text-red-700 mt-2">Not In Stock</p>) }
                {
                loyalty === 0 ?
                (<p class="text-center font-normal text-black-700 dark-text-black-400 mt-3">£{product.SalesPrice}</p>)
                : (loyalty === 1 && product.Category.startsWith("GU")) ?
                (
                <div><p class="text-center font-normal text-gray-700 dark-text-black-400 mt-3 line-through">£{product.SalesPrice}</p>
                 <p class="text-center font-normal text-red-700 dark-text-black-400 mt-3">£{(0.95 * product.SalesPrice).toFixed(2)}</p>
                 <p className='font-bold text-center text-red-800'>Save {(0.05 * product.SalesPrice).toFixed(2)} £!!</p>
                 </div>
                )
                : (loyalty === 2 && (product.Category.startsWith('GU') || product.Category.startsWith('ACGB'))) ?
                (
                    <div><p class="text-center font-normal text-gray-700 dark-text-gray-400 mt-3 line-through">£{product.SalesPrice}</p>
                    <p class="text-center font-normal text-red-700 dark-text-black-400 mt-3">£{(0.9 * product.SalesPrice).toFixed(2)}</p>
                    <p className='font-bold text-center text-red-800'>Save {(0.1 * product.SalesPrice).toFixed(2)} £!!</p>
                    </div>
                )
                : (loyalty === 3) ?
                (
                    <div><p class="text-center font-normal text-gray-700 dark-text-gray-400 mt-3 line-through">£{product.SalesPrice}</p>
                    <p class="text-center font-normal text-red-700 dark-text-black-400 mt-3">
                        £{(0.9 * product.SalesPrice).toFixed(2)}
                    </p>
                    <p className='font-bold text-center text-red-800'>Save {(0.1 * product.SalesPrice).toFixed(2)} £!!</p>
                    </div>
                ) : (<p></p>)
                }
              </div>
            </a>
          ))
        ) : (
          <h1 class="center text-2xl font-bold">No products available in this category.</h1>
        )}
      </div>
      <div class="flex justify-center">
        <Button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          color="black"
          ripple="light"
          className="py-2 px-4 rounded-lg"
        >
          Previous
        </Button>
        <span class="py-2 px-2">{currentPage}</span>
        <Button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          color="black"
          ripple="light"
          className="py-2 px-4 rounded-lg"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default Product;
