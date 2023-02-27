import {useState} from "react";

const items = [
    {name: "apple", price: 0.39},
    {name: "banana", price: 0.79},
    {name: "tomatoes", price: 3.99}
];

function ShoppingCart() {
    const cart = [{name: "apple", quantity: 3, price: 0.39}];

    return (
        <div>
            <h1>shopping cart</h1>
            <div className='cart'>
                <div className='items'>
                    <h2>items</h2>
                    {items.map((item) => (
                        <div key={item.name}>
                            <h3>{item.name}</h3>
                            <p>${item.price}</p>
                            <button>add to cart</button>
                        </div>
                    ))}
                </div>
                <div>
                    <h2>cart</h2>
                    {cart.map((item) => (
                        <div key={item.name}>
                            <h3>{item.name}</h3>
                            <p>
                                <button>-</button>
                                {item.quantity}
                                <button>+</button>
                            </p>
                            <p>subtotal: {item.quantity * item.price}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className='total'>
                <h2>total: </h2>
            </div>
        </div>
    );
}

export default ShoppingCart;
