import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '₹';
    const delivery_fee = 10;
    
    // Dynamic backend URL detection for network access
    const getBackendUrl = () => {
        const envUrl = import.meta.env.VITE_BACKEND_URL;
        if (envUrl === 'AUTO_DETECT') {
            // Use current window location for dynamic host detection
            return `${window.location.protocol}//${window.location.host}`;
        }
        return envUrl;
    };
    
    const backendUrl = getBackendUrl();
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('')
    const navigate = useNavigate();


    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error('Select Product Size');
            return;
        }

        let cartData = structuredClone(cartItems);
        let isNewItem = false;

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
                isNewItem = true;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
            isNewItem = true;
        }
        setCartItems(cartData);

        // Save to localStorage for persistence
        localStorage.setItem('cartData', JSON.stringify(cartData));

        // Show success toast notification
        if (isNewItem) {
            toast.success('Item added to cart!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            toast.success('Quantity updated in cart!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

        // Save to database if user is logged in
        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } })
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }

    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {

        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;

        setCartItems(cartData)

        // Save to localStorage for persistence
        localStorage.setItem('cartData', JSON.stringify(cartData));

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } })
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }

    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            const itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    const quantity = Number(cartItems[items][item]) || 0;
                    if (quantity > 0) {
                        // Prefer pre-book price when applicable; otherwise use actual_price, price, or discountPrice
                        const priceCandidate = itemInfo
                            ? (itemInfo.is_prebooking ? itemInfo.pre_book_price : (itemInfo.actual_price ?? itemInfo.price ?? itemInfo.discountPrice))
                            : 0;
                        const unitPrice = Number(priceCandidate) || 0;
                        totalAmount += unitPrice * quantity;
                    }
                } catch (error) {
                    // Ignore and continue; safest behavior is to skip invalid entries
                }
            }
        }
        return totalAmount;
    }

    const getProductsData = async () => {
        try {

            const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.success) {
                setProducts(response.data.products.reverse())
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getUserCart = async ( token ) => {
        try {
            
            const response = await axios.post(backendUrl + '/api/cart/get',{},{headers:{token}})
            if (response.data.success) {
                setCartItems(response.data.cartData)
                // Save to localStorage for consistency
                localStorage.setItem('cartData', JSON.stringify(response.data.cartData))
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Load cart data from localStorage
    const loadCartFromLocalStorage = () => {
        try {
            const savedCartData = localStorage.getItem('cartData');
            if (savedCartData) {
                const parsedCartData = JSON.parse(savedCartData);
                setCartItems(parsedCartData);
                return parsedCartData;
            }
        } catch (error) {
            console.log('Error loading cart from localStorage:', error);
        }
        return {};
    }

    // Synchronize localStorage cart with database when user logs in
    const syncCartWithDatabase = async (token) => {
        try {
            const localCartData = localStorage.getItem('cartData');
            if (localCartData) {
                const parsedCartData = JSON.parse(localCartData);
                
                // Use update instead of add to set correct quantities
                for (const itemId in parsedCartData) {
                    for (const size in parsedCartData[itemId]) {
                        const quantity = parsedCartData[itemId][size];
                        if (quantity > 0) {
                            // Update cart with correct quantity instead of adding one by one
                            await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } });
                        }
                    }
                }
                
                // Clear localStorage after sync
                localStorage.removeItem('cartData');
                
                // Get updated cart from database
                await getUserCart(token);
            }
        } catch (error) {
            console.log('Error syncing cart with database:', error);
        }
    }

    // Clear cart data (used when order is placed)
    const clearCart = () => {
        setCartItems({});
        localStorage.removeItem('cartData');
    }

    useEffect(() => {
        getProductsData()
        
        // Load cart from localStorage on app start
        loadCartFromLocalStorage()
    }, [])

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            const savedToken = localStorage.getItem('token')
            setToken(savedToken)
        }
    }, [])

    useEffect(() => {
        if (token) {
            // Check if there's localStorage data to sync before fetching from database
            const localCartData = localStorage.getItem('cartData');
            if (localCartData) {
                // Sync localStorage cart with database
                syncCartWithDatabase(token);
            } else {
                // No localStorage data, just fetch from database
                getUserCart(token);
            }
        }
    }, [token])

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, setCartItems,
        getCartCount, updateQuantity,
        getCartAmount, navigate, backendUrl,
        setToken, token, loadCartFromLocalStorage, syncCartWithDatabase, clearCart
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;