import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import './AllProducts.css'
import ProductTile from './ProductTile'
import { loadProductsThunk } from '../../redux/product'
import { loadUsersThunk } from '../../redux/user'

function AllProducts() {
    const dispatch = useDispatch()
    const products = useSelector(state => state.product)
    const productKeys = Object.keys(products)
    const users = useSelector(state => state.user)

    useEffect(() => {
        dispatch(loadProductsThunk())
        dispatch(loadUsersThunk())
    }, [dispatch])

    if(!products || !users) return null

    return (
        <section className='all-products-section'>
            <div className='products-container'>
                {users && productKeys.reverse().map((id) => (
                    <ProductTile key={id} product={products[id]} seller={users[products[id]['seller_id']]} />
                ))}
            </div>
        </section>
    )
}

export default AllProducts
