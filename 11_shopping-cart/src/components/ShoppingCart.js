import {useState} from "react";

const items = [
    {name: "apple", price: 0.39},
    {name: "banana", price: 0.79},
    {name: "tomatoes", price: 3.99}
];

function ShoppingCart() {
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        const cartClone = [...cart];
        const itemInCart = cartClone.find((i) => item.name === i.name);

        if (itemInCart) {
            itemInCart.quantity += 1;
            setCart(cartClone);
        } else {
            setCart((prevCart) => [...prevCart, {...item, quantity: 1}]);
        }
    };

    const increaseCount = (name) => {
        const cartClone = [...cart];
        const item = cartClone.find((i) => i.name === name);

        item.quantity += 1;
        setCart(cartClone);
    };

    const decreaseCount = (name) => {
        let cartClone = [...cart];
        const item = cartClone.find((i) => i.name === name);

        if (item.quantity > 1) item.quantity -= 1;
        else cartClone = cartClone.filter((i) => i.name !== name);

        setCart(cartClone);
    };

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
                            <button onClick={() => addToCart(item)}>
                                add to cart
                            </button>
                        </div>
                    ))}
                </div>
                <div>
                    <h2>cart</h2>
                    {cart.length > 0 ? (
                        cart.map((item) => (
                            <div key={item.name}>
                                <h3>{item.name}</h3>
                                <p>
                                    <button
                                        onClick={() => decreaseCount(item.name)}
                                    >
                                        -
                                    </button>
                                    {item.quantity}
                                    <button
                                        onClick={() => increaseCount(item.name)}
                                    >
                                        +
                                    </button>
                                </p>
                                <p>
                                    subtotal: $
                                    {(item.quantity * item.price).toFixed(2)}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p>add an item to your cart</p>
                    )}
                </div>
            </div>
            <div className='total'>
                <h2>
                    total: $
                    {cart
                        .reduce((acc, i) => acc + i.quantity * i.price, 0)
                        .toFixed(2)}
                </h2>
            </div>
        </div>
    );
}

export default ShoppingCart;
