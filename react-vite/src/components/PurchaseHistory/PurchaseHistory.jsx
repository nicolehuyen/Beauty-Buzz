import { useNavigate } from 'react-router-dom'
import './PurchaseHistory.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loadOrdersThunk } from '../../redux/order'

function PurchaseHistory() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const ordersObj = useSelector(state => state.order)
    const orders = Object.values(ordersObj)
    console.log('order', orders)

    useEffect(() => {
        if(!sessionUser) navigate('/')
        dispatch(loadOrdersThunk())
    }, [dispatch, sessionUser, navigate])

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

    return (
        <div className="purchase-container">
            <div className='purchase-box'>
                <h1 className='purchase-title'>Purchase History</h1>
                {!orders.length && (
                    <div className='no-history'>
                        <i className="fa-solid fa-gift"></i>
                        <h1>No purchases</h1>
                        <p>See order details after your next purchase.</p>
                    </div>
                )}
                {orders.length && (
                    <>
                    <div className='purchase-titles'>
                        <h3>Order Date</h3>
                        <h3>Order Number</h3>
                        <h3>Status</h3>
                        <h3>Details</h3>
                    </div>
                    {orders.reverse().map(order => (
                        <div key={order.id} className='orders'>
                            <p className='order-date'>{month(order?.created_at)} {day(order?.created_at)}, {year(order?.created_at)}</p>
                            <p className='order-num'>{String(order?.id).padStart(10, '0')}</p>
                            <p className='order-status'>Payment Complete</p>
                            <button className='order-details'>View Details</button>
                        </div>
                    ))}
                    </>
                )}
            </div>
        </div>
    )
}

export default PurchaseHistory
