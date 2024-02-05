import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router";
import './ProductDetails.css'
import { useEffect } from 'react';
import { loadOneProductThunk } from '../../redux/product';
import { loadUsersThunk } from '../../redux/user';
import ProductReviews from '../ProductReviews/ProductReviews';

function ProductDetails() {
    const dispatch = useDispatch()
    const { productId } = useParams()
    const product = useSelector(state => state.product[productId])
    const user = useSelector(state => state.user)

    useEffect(() => {
        dispatch(loadOneProductThunk(productId))
        dispatch(loadUsersThunk())
    }, [dispatch, productId])

    if(!product || !user) return null

    return (
        <section className='spot-detail-section'>
            <img className='product-detail-image' src={product?.image} alt='product-image'/>
            <div className='product-info'>
                <p className='detail-seller-name'>{`${user[product?.seller_id]?.first_name} ${user[product?.seller_id]?.last_name}`}</p>
                <h2 className='detail-product-name'>{product.name}</h2>
                <p className='detail-review'>review</p>
                <p className='detail-price'>{`$${product?.price}`}</p>
                <div className='detail-buttons'>
                    <button className='add-to-bag'>ADD TO BAG</button>
                    <button className='favorite-item'>{<i className="fa-regular fa-heart"></i>}</button>
                </div>
                <h4>Product Details</h4>
                <p className='product-description'>{product.description}</p>
            </div>
            <ProductReviews />
        </section>
    )
}

export default ProductDetails
