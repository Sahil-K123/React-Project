

// function App() {
//   return (
//     <>
//       <h1>hii</h1>
//     </>
//   );
// }

// export default App;


import { useState } from 'react'

function FilterableSearchProduct(props){
    const [filterText,setfilterText] = useState('');
    const [inStockOnly,setInStockOnly] = useState(false);

    return(
        <div>
            <SearchBar filterText={filterText} inStockOnly={inStockOnly} onFilterTextChange={setfilterText} onInStockOnlyChange={setInStockOnly}/>
            <ProductTable products={props.product} filterText={filterText} inStockOnly={inStockOnly}/>
        </div>
    );
}

function ProductCategoryRow({Category})
{
    return(
        <tr colspan="2">
            <th>{Category}</th>
        </tr>
    );
}

function ProductRow({product}){
    const name = product.stocked ? product.name : 
    <span style={{color:'red'}}>
    {product.name}
    </span>;



    return(
        <tr>
            <td>{name}</td>
            <td>{product.price}</td>
        </tr>
    );
}



function ProductTable({products}){

    const rows = [];
    let lastCategory = null;

    products.forEach(product => {
        if(product.category !== lastCategory){
            rows.push(
                <ProductCategoryRow 
                    Category={product.category}
                    key={product.category}
                />
            );
        }
        rows.push(
            <ProductRow 
                product={product}
                key={product.name}
            />
        );
        
    });
    
    return(
      <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Prices</th>
            </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
}

function SearchBar({filterText , inStockOnly , onFilterTextChange , onInStockOnlyChange}){
    return(
        <form>
            <input type="text" value={filterText} placeholder="Search for a Product" onChange={(e) => onFilterTextChange(e.target.value)} />
            <br />
            <label>
            <input type="checkbox" checked={inStockOnly} onChange={(e) => onInStockOnlyChange(e.target.checked)} />
            {' '}
            Only show Products in stock
            </label>
        </form>
    );
}




const PRODUCTS = [
    {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
    {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
    {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
    {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
    {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
    {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
  ];

export default function App(){
    return(
        <FilterableSearchProduct product={PRODUCTS}/>
    );
}
