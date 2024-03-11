import { useNavigate } from 'react-router-dom'
import './ShoppingBag.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { clearBagThunk, deleteBagItemThunk, loadShoppingBagThunk, updateBagItemThunk } from '../../redux/shoppingBag'
import { loadProductsThunk } from '../../redux/product'
import { loadUsersThunk } from '../../redux/user'
import { createOrderThunk } from '../../redux/order'

function ShoppingBag() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const bag = useSelector(state => state.bag)
    const bagItems = Object.values(bag)
    const productsObj = useSelector((state) => state.product)
    const products = Object.values(productsObj)
    const user = useSelector(state => state.user)
    const [quantities, setQuantities] = useState(() => {
        const savedQuantities = localStorage.getItem('quantities')
        return savedQuantities ? JSON.parse(savedQuantities) : {}
    })
    const [placeOrder, setPlaceOrder] = useState(false)

    useEffect(() => {
        if(!sessionUser) navigate('/')
        dispatch(loadShoppingBagThunk())
        dispatch(loadProductsThunk())
        dispatch(loadUsersThunk())
    }, [dispatch, sessionUser, navigate])

    if (!bag || !productsObj || !user) return null

    const removeFromBag = (itemId) => {
        dispatch(deleteBagItemThunk(itemId))
    }

    const totalQuantity = bagItems.reduce((total, item) => total + (item.quantity), 0)

    const handleQuantityChange = (itemId, newQuantity) => {
        const item = bagItems.find(item => item.id === itemId)
        if (item) {
            const { buyer_id, product_id } = item
            dispatch(updateBagItemThunk({ buyer_id, product_id, quantity: newQuantity}, itemId))
            const updatedQuantities = { ...quantities, [itemId]: newQuantity }
            setQuantities(updatedQuantities)
            localStorage.setItem('quantities', JSON.stringify(updatedQuantities))
        }
    }

    // order summary
    const subtotal = bagItems.reduce((total, item) => total + (Number(products[item.product_id - 1]?.price) * (quantities[item.id] || item.quantity)), 0)

    const shipping = subtotal >= 35 ? 0 : 5.99

    const taxRate = 0.0625
    const tax = subtotal * taxRate

    const total = subtotal + tax + shipping

    // checkout
    const checkout = (e) => {
        e.preventDefault()

        dispatch(createOrderThunk({ buyer_id: sessionUser.id })).then(() => { dispatch(clearBagThunk()) })
        setPlaceOrder(true)
    }

    return (
        <div className="bag-container">
            <div className="bag-left">
                <div className="bag-title">
                    <h2>Bag</h2>
                    <p>{totalQuantity === 1 ? `${totalQuantity} item` : `${totalQuantity} items`}</p>
                </div>
                <div>
                    {!bagItems.length ? (
                        <div className="bag-items">
                            <i className="fa-solid fa-bag-shopping bag"></i>
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
                                    <p className='bag-price'>${(Number(products[item?.product_id - 1]?.price) * Number(quantities[item?.id] || item?.quantity)).toFixed(2)}</p>
                                    <span>
                                        <select className='select-dropdown' value={item?.quantity} onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}>
                                            {[...Array(10).keys()].map((number) => (
                                                <option key={number + 1} value={number + 1}>{number + 1}</option>
                                            ))}
                                        </select>
                                    </span>
                                    <button className='remove-button' onClick={() => {
                                        if (quantities[item.id] && quantities[item.id] > 1) {
                                            handleQuantityChange(item.id, quantities[item.id] - 1)
                                        } else {
                                            removeFromBag(item.id)
                                        }
                                    }}><i className="fa-regular fa-trash-can"></i>REMOVE</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div className="bag-right">
                <h2 style={{paddingBottom: 10}}>Order Summary</h2>
                <div className="order-subtotal">
                    <p>Subtotal <span className='subtotal-items'>{totalQuantity === 1 ? `(${totalQuantity} item)` : `(${totalQuantity} items)`}</span></p>
                    <p>${subtotal.toFixed(2)}</p>
                </div>
                <div className="order-shipping">
                    <p>Shipping</p>
                    <p>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</p>
                </div>
                {shipping > 0 ? <p className='free-shipping'>You are ${(35 - subtotal).toFixed(2)} away from free shipping.</p> : ''}
                <div className="order-tax">
                    <p>Tax</p>
                    <p>${tax.toFixed(2)}</p>
                </div>
                <div className="order-total">
                    <p>Total</p>
                    <p>${total.toFixed(2)}</p>
                </div>
                <div className='checkout-button'>
                    <button className='checkout' onClick={checkout} disabled={total <= 5.99}>{placeOrder ? 'PURCHASED' : 'CHECKOUT'}</button>
                </div>
            </div>
        </div>
    )
}

export default ShoppingBag
