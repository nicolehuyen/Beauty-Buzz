import { useNavigate } from 'react-router-dom'
import './ShoppingBag.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { deleteBagItemThunk, loadShoppingBagThunk } from '../../redux/shoppingBag'
import { loadProductsThunk } from '../../redux/product'
import { loadUsersThunk } from '../../redux/user'

function ShoppingBag() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const bag = useSelector(state => state.bag)
    const bagItems = Object.values(bag)
    const productsObj = useSelector((state) => state.product)
    const products = Object.values(productsObj)
    const user = useSelector(state => state.user)
    const [quantities, setQuantities] = useState({})

    useEffect(() => {
        if(!sessionUser) navigate('/')
        dispatch(loadShoppingBagThunk())
        dispatch(loadProductsThunk())
        dispatch(loadUsersThunk())
    }, [dispatch, sessionUser, navigate])

    const removeFromBag = (itemId) => {
        dispatch(deleteBagItemThunk(itemId))
    }

    const totalQuantity = bagItems.reduce((total, item) => total + item.quantity, 0)

    const handleQuantityChange = (itemId, newQuantity) => {
        setQuantities({ ...quantities, [itemId]: newQuantity })
    }

    return (
        <div className="bag-container">
            <div className="bag-left">
                <div className="bag-title">
                    <h2>Bag</h2>
                    <p>{totalQuantity <= 1 ? `${totalQuantity} item` : `${totalQuantity} items`}</p>
                </div>
                <div>
                    {!bagItems.length ? (
                        <div className="bag-items">
                            <h1>Your bag is empty</h1>
                            <p>Keep shopping and add something.</p>
                        </div>
                    ) : (
                        bagItems.map(item => (
                            <div key={item.id} className="bag-item">
                                <div className="bag-item-details">
                                    <img className='bag-item-image' src={products[item?.product_id - 1]?.image} alt='product-image' onClick={() => navigate(`/products/${products[item?.product_id - 1]?.id}`)}/>
                                    <div className='bag-seller-product'>
                                        <p className='bag-seller-name' onClick={() => navigate(`/products/${products[item?.product_id - 1]?.id}`)}>{user[products[item?.product_id - 1]?.seller_id]?.first_name} {user[products[item?.product_id - 1]?.seller_id]?.last_name}</p>
                                        <p className='bag-product-name' onClick={() => navigate(`/products/${products[item?.product_id - 1]?.id}`)}>{products[item?.product_id - 1]?.name}</p>
                                    </div>
                                </div>
                                <div className='price-quantity-remove'>
                                    <p className='bag-price'>${(Number(products[item?.product_id - 1]?.price) * Number(quantities[item.id] || item?.quantity)).toFixed(2)}</p>
                                    {/* <p>Quantity: {item?.quantity}</p> */}
                                    <p>
                                        <select value={quantities[item.id] || item.quantity} onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}>
                                            {[...Array(10).keys()].map((number) => (
                                                <option key={number + 1} value={number + 1}>{number + 1}</option>
                                            ))}
                                        </select>
                                    </p>
                                    {/* <button onClick={() => removeFromBag(item?.id)}>REMOVE</button> */}
                                    <button onClick={() => {
                                        if (quantities[item.id] && quantities[item.id] > 1) {
                                            handleQuantityChange(item.id, quantities[item.id] - 1);
                                        } else {
                                            removeFromBag(item.id);
                                        }
                                    }}>REMOVE</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div className="bag-right">
                <h2 style={{paddingBottom: 10}}>Order Summary</h2>
                <div className="order-subtotal">
                    <p>Subtotal</p>
                    <p>$0.00</p>
                </div>
                <div className="order-shipping">
                    <p>Shipping</p>
                    <p>FREE</p>
                </div>
                <div className="order-tax">
                    <p>Tax</p>
                    <p>$0.00</p>
                </div>
                <div className="order-total">
                    <p>Total</p>
                    <p>$0.00</p>
                </div>
                <div className='checkout-button'>
                    <button className='checkout'>CHECKOUT</button>
                </div>
            </div>
        </div>
    )
}

export default ShoppingBag
