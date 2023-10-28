//will show a view of all orders which should be able to be sorted/filtered
import React, {useEffect, useState } from 'react';
import '../App.css';
import { getAllProducts } from '../services';
import categories from './categories';

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

function Product() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        if (selectedCategory === 'all') {
          // If no category is selected, display all products
          setFilteredProducts(allProducts);
        } else {
          // Filter products based on the selected category
          const filtered = allProducts.filter((product) => product.Category.startsWith(selectedCategory));
          setFilteredProducts(filtered);
        }
      }, [selectedCategory, filteredProducts]);

    return (
        <div class="w-4/5 mx-auto my-10">
            <div class='flex flex-row justify-between mt-5'>
                <h1 class="text-3xl font-bold">Products</h1>
                <div class='order-last flex flex-col '>
                    <label htmlFor="categorySelect" class='font-sm font-bold'>Select a Category:</label>
                    <select id='categorySelect'
                    onChange={(event) => setSelectedCategory(event.target.value)}
                    class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded-lg focus:outline-none focus:border-indigo-500 focus:shadow-outline-indigo active:bg-gray-100"
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
                { filteredProducts.length > 0 ?
                filteredProducts.map(product => (
                    // <ProductCard key={product.SKU_ID} data={product}/>
                    <a href={`/products/${product.SKU_ID}`} key={product.SKU_ID} className="card" class="relative block w-3/12 h-300 mx-3 my-2 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100" >
                        <div class="block top-0 right-0 bottom-0 left-0 ease-in-out duration-300 hover:scale-110">
                            <img class="h-40 mx-auto" src={product.PictureMain} alt={product.SKU_ID}/>
                            <h5 class="mb-2 text-center text-xl font-bold tracking-tight text-gray-900 dark:text-white">{product.ItemName}</h5>
                            {product.QtyInStock > 0 ? (<p class="text-center font-small text-green-700 mt-0">In Stock</p>) :
                            (<p class="text-center font-small text-red-700 mt-2">Not In Stock</p>) }
                            <p class="text-center font-normal text-gray-700 dark:text-gray-400 mt-3">£{product.SalesPrice}</p>
                        </div>
                    </a>
                ))
                : <h1 class="center text-2xl font-bold">No products available in this category.</h1>}
            </div>
        </div>
    )
}

export default Product;