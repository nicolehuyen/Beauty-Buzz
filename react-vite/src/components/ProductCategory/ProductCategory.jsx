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

    function averageRating(stars) {
        if(!stars) return 0
        const totalStars = stars.reduce((acc, curr) => acc + curr, 0)
        const averageRating = totalStars / stars.length
        return averageRating
    }

    return (
        <section className='all-products-section'>
            <h1 className='category-title'>{category === 'brushes&tools' ? 'Brushes & Tools' : category[0].toUpperCase() + category.slice(1)}</h1>
            <div className='products-container'>
                {prodObj.reverse().map((product) => (
                    <div key={product?.id}>
                        <div className='product-tile' onClick={() => navigate(`/products/${product?.id}`)}>
                            <img className='product-image' src={product?.image} alt='product-image' />
                            <span className='seller-name'>{`${user[product?.seller_id]?.first_name} ${user[product?.seller_id]?.last_name}`}</span>
                            <h4 className='product-name'>{product?.name}</h4>
                            <div className='review-average'>
                                {(() => {
                                    const stars = [];
                                    for (let i = 0; i < 5; i++) {
                                        if (i < Math.floor(averageRating(product?.reviews))) {
                                            stars.push(<i key={i} className="fas fa-star"></i>)
                                        } else if (i === Math.floor(averageRating(product?.reviews)) && averageRating(product?.reviews) % 1 !== 0) {
                                            stars.push(<i key={i} className="fas fa-star-half-alt"></i>)
                                        } else {
                                            stars.push(<i key={i} className="far fa-star"></i>)
                                        }
                                    }
                                    return stars
                                })()} {`(${product?.reviews?.length})`}
                            </div>
                            <span className='product-price'>{`$${Number(product?.price).toFixed(2)}`}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default ProductCategory
