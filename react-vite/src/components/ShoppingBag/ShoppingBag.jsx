import { useNavigate } from 'react-router-dom'
import './ShoppingBag.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loadShoppingBagThunk } from '../../redux/shoppingBag'
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
    console.log('productssss', products)
    const user = useSelector(state => state.user)
    console.log('user', Object.values(user))

    useEffect(() => {
        if(!sessionUser) navigate('/')
        dispatch(loadShoppingBagThunk())
        dispatch(loadProductsThunk())
        dispatch(loadUsersThunk())
    }, [dispatch, sessionUser, navigate])

    return (
        <div className="bag-container">
            <div className="bag-left">
                <div className="bag-title">
                    <h2>Bag</h2>
                    <p>{bagItems.length <= 1 ? `${bagItems.length} item` : `${bagItems.length} items`}</p>
                </div>
                <div className="bag-items">
                    {!bagItems.length ? (
                        <>
                        <h1>Your bag is empty</h1>
                        <p>Keep shopping and add something.</p>
                        </>
                    ) : (
                        bagItems.map(item => (
                            <div key={item.id} className="bag-item">
                                <img className='bag-item-image' src={products[item?.product_id - 1]?.image} alt='product-image' />
                                <div className="bag-item-details">
                                    <p>{user[products[item?.product_id - 1]?.seller_id]?.first_name} {user[products[item?.product_id - 1]?.seller_id]?.last_name}</p>
                                    <p>{products[item?.product_id - 1]?.name}</p>
                                    <p>${products[item?.product_id - 1]?.price}</p>
                                    <p>Quantity: {item?.quantity}</p>
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
