import './OrderDetails.css'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { loadOrderThunk } from "../../redux/order"
import { loadOrderItemsThunk } from '../../redux/orderItem'
import { loadProductsThunk } from '../../redux/product'
import { loadUsersThunk } from '../../redux/user'

function OrderDetails() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const { orderId } = useParams()
    const order = useSelector(state => state.order[orderId])
    const orderItems = useSelector(state => state.orderItem)
    const orderItem = Object.values(orderItems)
    const productsObj = useSelector((state) => state.product)
    const products = Object.values(productsObj)
    const user = useSelector(state => state.user)

    useEffect(() => {
        if(!sessionUser) navigate('/')
        dispatch(loadOrderThunk(orderId))
        dispatch(loadOrderItemsThunk(orderId))
        dispatch(loadProductsThunk())
        dispatch(loadUsersThunk())
    }, [dispatch, orderId, sessionUser, navigate])

    if (!order || !orderItems || !productsObj || !user) return null

    function month(date) {
        const dateCreated = new Date(date)
        const month = dateCreated.getMonth()
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        return monthNames[month]
    }

    function day(date) {
        const dateCreated = new Date(date)
        const day = dateCreated.getDate()
        return day
    }

    function year(date) {
        const dateCreated = new Date(date)
        const year = dateCreated.getFullYear()
        return year
    }

    // order summary
    const subtotal = orderItem.reduce((total, item) => total + (Number(products[item.product_id - 1]?.price) * item.quantity), 0)

    const shipping = subtotal >= 35 ? 0 : 5.99

    const taxRate = 0.0625
    const tax = subtotal * taxRate

    const total = subtotal + tax + shipping

    return (
        <div className="order-detail-container">
            <div className="order-box">
                <h1 className="order-title">Order Details</h1>
                <div className='order-info'>
                    <p>Order #{String(order?.id).padStart(10, '0')}</p>
                    <p>|</p>
                    <p>{month(order?.created_at)} {day(order?.created_at)}, {year(order?.created_at)}</p>
                    <p>|</p>
                    <p>order status</p>
                </div>
                <div className='order-detail-titles'>
                    <p className='order-detail-item'>Item</p>
                    <p className='order-detail-price'>Price</p>
                    <p className='order-detail-quantity'>Qty</p>
                    <p className='order-detail-amount'>Amount</p>
                </div>
                {orderItem?.map(item => (
                    <div key={item.id} className="bag-item">
                        <div className="bag-item-details2">
                            <img className='bag-item-image2' src={products[item?.product_id - 1]?.image} alt='product-image' onClick={() => navigate(`/products/${products[item?.product_id - 1]?.id}`)}/>
                            <div className='bag-seller-product'>
                                <p className='bag-seller-name' onClick={() => navigate(`/products/${products[item?.product_id - 1]?.id}`)}>{user[products[item?.product_id - 1]?.seller_id]?.first_name} {user[products[item?.product_id - 1]?.seller_id]?.last_name}</p>
                                <p className='bag-product-name' onClick={() => navigate(`/products/${products[item?.product_id - 1]?.id}`)}>{products[item?.product_id - 1]?.name}</p>
                            </div>
                        </div>
                        <div className='price-quantity-amount'>
                            <p className='order-detail-price'>${Number(products[item?.product_id - 1]?.price).toFixed(2)}</p>
                            <p className='order-detail-quantity'>{item?.quantity}</p>
                            <p className='order-detail-amount'>${Number(products[item?.product_id - 1]?.price * Number(item?.quantity)).toFixed(2)}</p>
                        </div>
                    </div>
                ))}
                <div className='order-summary'>
                    <div className="order-subtotal">
                        <p>Subtotal</p>
                        <p>${subtotal.toFixed(2)}</p>
                    </div>
                    <div className="order-shipping">
                        <p>Shipping</p>
                        <p>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</p>
                    </div>
                    <div className="order-tax">
                        <p>Tax</p>
                        <p>${tax.toFixed(2)}</p>
                    </div>
                </div>
                <div className="order-total2">
                    <p>Order Total</p>
                    <p>${total.toFixed(2)}</p>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails
