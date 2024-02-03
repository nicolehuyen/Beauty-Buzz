import { useParams } from 'react-router-dom'
import './ProductCategory.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loadCategoryProductsThunk } from '../../redux/product'
import { loadUsersThunk } from '../../redux/user'

function ProductCategory() {
    const dispatch = useDispatch()
    const { category } = useParams()
    const products = useSelector(state => state.product[category])
    const user = useSelector(state => state.user)

    useEffect(() => {
        dispatch(loadCategoryProductsThunk(category))
        dispatch(loadUsersThunk())
    }, [dispatch, category])

    if(!products || !user) return null
    const prodObj = Object.values(products)

    return (
        <section className='all-products-section'>
            <div className='products-container'>
                {prodObj.map((product) => (
                    <div key={product?.id}>
                        <div className='product-tile'>
                            <img className='product-image' src={product?.image} alt='product-image' />
                            <span className='seller-name'>{`${user[product?.seller_id]?.first_name} ${user[product?.seller_id]?.last_name}`}</span>
                            <h3 className='product-name'>{product?.name}</h3>
                            <span className='product-price'>{`$${product?.price}`}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default ProductCategory
