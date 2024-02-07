import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loadCategoryProductsThunk } from '../../redux/product'
import { loadUsersThunk } from '../../redux/user'

function ProductCategory() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
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
            <h1 className='category-title'>{category === 'brushes&tools' ? 'Brushes & Tools' : category[0].toUpperCase() + category.slice(1)}</h1>
            <div className='products-container'>
                {prodObj.map((product) => (
                    <div key={product?.id}>
                        <div className='product-tile' onClick={() => navigate(`/products/${product?.id}`)}>
                            <img className='product-image' src={product?.image} alt='product-image' />
                            <span className='seller-name'>{`${user[product?.seller_id]?.first_name} ${user[product?.seller_id]?.last_name}`}</span>
                            <h4 className='product-name'>{product?.name}</h4>
                            <span className='product-price'>{`$${Number(product?.price).toFixed(2)}`}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default ProductCategory
