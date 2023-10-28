import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../services';
import { Input } from '@material-tailwind/react';
import './searchbar.css';

const allProducts = await getAllProducts();

function Searchbar() {
  const [inputValue, setInputValue] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (inputValue === ''){
        setShowDropdown(false);
        return;
    }
    // Filter products based on the inputValue
    const filtered = allProducts.filter((product) =>
      product.ItemName.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredProducts(filtered);
    setShowDropdown(filtered.length > 0);
    console.log(filtered);
    console.log(showDropdown)
  }, [inputValue]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="searchbar-container relative">
        <Input
              type="search"
              placeholder="Search"
              containerProps={{
                className: "min-w-[288px]",
              }}
              className=" !border-t-blue-gray-300 pl-9 placeholder:text-blue-gray-300 focus:!border-blue-gray-300"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={inputValue}
              onChange={handleInputChange}
            />
      {showDropdown && (
        <div className="dropdown absolute mt-2 w-72 bg-white border border-gray-300 shadow-lg max-h-40 overflow-y-auto">
          <div className="dropdown-entries">
            {filteredProducts.map((product, index) => (
              <div key={index} className={`entry p-2 border-b border-gray-200 ${index === 0 ? 'border-t' : ''}`}>
                {/* <div className="entry-image w-12 h-12 bg-gray-200 rounded-full mr-2"><img src={product.PictureMain}></img></div> */}
                <div className="entry-details">
                  <a href={`/products/${product.SKU_ID}`} className="text-lg font-semibold">{product.ItemName}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Searchbar;
