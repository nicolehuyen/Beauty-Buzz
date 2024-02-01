import { useDispatch, useSelector } from 'react-redux'
import './AllProducts.css'
import { useEffect } from 'react'
import { loadProductsThunk } from '../../redux/product'
import { loadUsersThunk } from '../../redux/user'

function AllProducts() {
    const dispatch = useDispatch()
    const productObj = useSelector(state => state.product)
    const products = Object.values(productObj)
    const userObj = useSelector(state => state.user)
    const user = Object.values(userObj)
    console.log('PRODUCTSSTWOOOO', user)

    useEffect(() => {
        dispatch(loadUsersThunk())
        dispatch(loadProductsThunk())
    }, [dispatch])

    return (
        <section className='all-products-section'>
            <div className='products-container'>
                {products.map(product => (
                    <div key={product.id} className='product-tile'>
                        <span className='seller-name'>{`${user[product?.seller_id]?.first_name} ${user[product?.seller_id]?.last_name}`}</span>
                        <h3 className='product-name'>{product.name}</h3>
                        <span className='product-price'>{`$${product.price}`}</span>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default AllProducts
