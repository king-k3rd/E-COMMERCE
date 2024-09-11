import { createContext, useContext, useEffect, useState } from "react";
import useAlert from "../hooks/useAlerts";
import AuthContext from "./AuthContext";
import useLocalStorage from "../hooks/useLocalStorage";

const EcomContext = createContext()

export const EcomProvider = ({ children }) => {
    const [product, setProduct] = useState([]);
    const { alertInfo, showHide } = useAlert();
    const [ cartItems, setCartItems ] = useState([]);
    const [ order, setOrder ] = useState(null);
    const [state, dispatch] = useContext(AuthContext);
    const isAuthenticated = state.accessToken !== null;
    const { setItem, getItem } = useLocalStorage();

    useEffect(() => {
        fetchData()
    }, [])
    
    useEffect(()=>{
        fetchCart()
    },[cartItems])

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/product");
            const data = await response.json();
            setProduct(data);
        } catch (error) {
            console.log(error);
        }
    }
    
    const featuredProduct = product.filter((product) => product.featured === true)
    const topSellingProduct = product.filter((product) => product.topSelling === true)

    // adding items to cart
    const addToCart = async (productId, quantity, product) => {
        if (isAuthenticated) {
            try {
                const res = await fetch("http://localhost:8000/api/add-to-cart", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": `${localStorage.getItem("auth-token")}`
                    },
                    body: JSON.stringify({ productId, quantity })
                })
                const data = await res.json();
                if (res.ok) {
                    setCartItems(data);
                    showHide("success", "You have successfully added item to cart");
                } else {
                    showHide("error", "product was not added to cart")
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            const storedCart = JSON.parse(getItem("cart")) || { products: []};
            const itemIndex = storedCart.products.findIndex(
                (item) => item.product._id === productId
            );

            if (itemIndex >= 0) {
                storedCart.products[itemIndex].quantity += 1
                storedCart.products[itemIndex].amount = 
                 product.price * storedCart.products[itemIndex].quantity;
            } else {
                storedCart.products.push({
                    product,
                    quantity: 1,
                    amount: product.price * 1,
                });
                console.log(product)
            }
            localStorage.setItem("cart", JSON.stringify(storedCart));
            showHide("success", "Product added to cart successfully");
            setCartItems(storedCart)
            // this line set the  cartItems state to match local storage
        }
    }

    // fetch cart
    const fetchCart = async () => {
        if (isAuthenticated) {
            const res = await fetch("http://localhost:8000/api/cart", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": `${localStorage.getItem("auth-token")}`
                }
            })
            const data = await res.json();
            if (res.ok) {
                setCartItems(data.products && data)
            } else {
                showHide("error", "Could not get cart")
            }
        } else {
            const localCart = getItem("cart");
            console.log(localCart);
            if (localCart) {
                setCartItems(JSON.parse(localCart));
            } else {
                setCartItems([]);
            }
        }
    };

    // // adding items to cart
    // const addToCart = (product) => {
    //     const existingItems = cartItems.findIndex(items => items.name === product.name);

    //     if (existingItems !== -1) {
    //         const itemsInCart = [...cartItems]
    //         const updateCartItems = itemsInCart[existingItems]
    //         updateCartItems.quantity += Number(product.quantity)
    //         updateCartItems.amount = Number(updateCartItems.price * updateCartItems.quantity)
    //         setCartItems(itemsInCart)
    //         showHide("error", `${product.name} already exist in your cart..`)
    //     } else {
    //         setCartItems([
    //             ...cartItems,
    //             {...product, amount: product.price * product.quantity}
    //         ])
    //         showHide("success", `${product.name} added to cart successfully`)
    //     }
    // }

    //calculate Subtotal
    const calculateSubtotal = () => {
        return cartItems.products?.reduce((acc, curr) => acc + curr.amount , 0)
    }

    //calcuate vat
    const calculateVat = ( vat=0.075 ) => {
        const subtotal = calculateSubtotal()
        return subtotal * vat;
    }

    //calculate total amount
    const calculateTotalAmount = () => {
        const vat = calculateVat()
        const subtotal = calculateSubtotal()
        return subtotal + vat
    }

    //remove cart items 
    const removeCartItems = async(productId) => {
        if ( window.confirm("Are you sure you want to delete?..")) {
            if (isAuthenticated) {
                try {
                        const res = await fetch("http://localhost:8000/api/delete-cart", {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                                "auth-token": `${localStorage.getItem("auth-token")}`
                            },
                            body: JSON.stringify({ productId })
                        })
                        const data = await res.json();
                        if (res.ok) {
                            showHide("success", "Product successfully deleted from cart ");
                            setCartItems( data )
                        }
                    }catch (error) {
                        console.log(error)
                    }
            } else {
                const storedCart = JSON.parse(localStorage.getItem("cart")) || {
                    products: [],
                };
                const itemIndex = storedCart.products.findIndex(
                    (item) => item.product._id === productId
                );

                if (itemIndex >= 0) {
                    storedCart.products.splice(itemIndex, 1)
                    localStorage.setItem("cart", JSON.stringify(storedCart));
                    setCartItems(storedCart)
                    showHide("success", "Product removed from cart successfully");
                } else {
                    showHide("error", "Product not found in cart");
                }
            }
        }
    };

    // //remove cart items
    // const removeCartItems = (name) => {
    //     if (window.confirm("Are you sure you want to delete?..")) {
    //         const deleteItems = cartItems.filter((items) => items.name !== name);
    //         setCartItems(deleteItems);
    //         showHide("success", "Product deleted Successfully")
    //     }
    // }

    //update cart items
    const updateCartItems = async (productId, quantity) => {
        if (isAuthenticated) {
            try {
                const res = await fetch("http://localhost:8000/api/update-cart", {
                    method:  "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": `${localStorage.getItem("auth-token")}`,
                    },
                    body: JSON.stringify({ productId, quantity })
                })
                const data = await res.json();
                if (res.ok) {
                    const existingItems = cartItems.products?.findIndex(items => items.product._id === productId);
                    if (existingItems !== 1) {   
                        const itemsInCart = [...cartItems.products]
                        const updateCartItems = itemsInCart[existingItems]
                        updateCartItems.quantity = parseInt(quantity)
                        updateCartItems.amount = updateCartItems.product.price * updateCartItems.quantity
                        setCartItems({ ...cartItems, products: itemsInCart})
                    }
                }else{
                    showHide("error", "Could not update cart");
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            const storedCart = JSON.parse(localStorage.getItem("cart")) || {
                products: [],
            };
            const itemIndex = storedCart.product.findIndex(
                (item) => item.product._id === productId
            );

            if (itemIndex >= 0) {
                if (quantity === 0) {
                    storedCart.products.splice(itemIndex, 1)
                } else {
                    storedCart.products[itemIndex].quantity = parseInt(quantity, 10);
                    storedCart.products[itemIndex].amount = 
                    storedCart.products[itemIndex].product.price * storedCart.products[itemIndex].quantity;
                }
                localStorage.setitem("cart", JSON.stringify(storedCart));
                setCartItems(storedCart)
                showHide("success", "Cart updated succesfully!..")
            }
        }
    };
    
    // //update cart items
    // const updateCartItems = (id, newQuantity) => {
    //     const existingItems = cartItems.findIndex(items => items.id ===id);
    //     const itemsInCart = [...cartItems]
    //     const updateCartItems = itemsInCart[existingItems]
    //     updateCartItems.quantity = parseInt(newQuantity, 10)
    //     updateCartItems.amount = updateCartItems.price * updateCartItems.quantity
    //     setCartItems(itemsInCart)
    // }

    const createOrder = async (transaction_id, orderId) => {
        try {
            const res = await fetch("http://localhost:8000/api/payment/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": `${localStorage.getItem("auth-token")}`
                },
                body: JSON.stringify({ transaction_id, orderId })
            })
            const data = await res.json();
            if (res.ok) {
                setOrder(data.order)
                console.log(data.order);
                setCartItems([]);
            } else {
                showHide("error", "Insufficient Funds!... Credit your acct boss");
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <EcomContext.Provider value={{
            product,
            alertInfo,
            cartItems,
            featuredProduct,
            topSellingProduct,
            isAuthenticated,
            showHide,
            addToCart,
            calculateVat,
            calculateSubtotal,
            calculateTotalAmount,
            removeCartItems,
            updateCartItems,
            createOrder,
            setCartItems,
            fetchCart,
            order,
        }}>
                {children}
        </EcomContext.Provider>
    )
}

export default EcomContext;
