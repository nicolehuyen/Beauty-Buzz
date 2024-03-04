import { useNavigate } from 'react-router-dom'
import './ShoppingBag.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loadOrderItemsThunk } from '../../redux/orderItem'
import { loadOrderThunk } from '../../redux/order'

function ShoppingBag() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const orderItemsObj = useSelector(state => state.items)
    console.log('order', orderItemsObj)

    useEffect(() => {
        if(!sessionUser) navigate('/')
        dispatch(loadOrderThunk())
        dispatch(loadOrderItemsThunk())
    }, [dispatch, sessionUser, navigate])

    return (
        <div className="bag-container">
            <div className="bag-left">
                <div className="bag-title">
                    <h2>Bag</h2>
                    <p>items</p>
                </div>
                <div className="bag-items">
                    <h1>Your bag is empty</h1>
                    <p>Keep shopping and add something.</p>
                </div>
            </div>
            <div className="bag-right">
                <h2 style={{paddingBottom: 10}}>Order Summary</h2>
                <div className="order-subtotal">
                    <p>Subtotal</p>
                    <p>$0.00</p>
                </div>
                <div className="order-tax">
                    <p>Estimated Tax</p>
                    <p>Calculated at checkout</p>
                </div>
                <div className="order-total">
                    <p>Estimated Total</p>
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
