import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router";
import './ProductDetails.css'
import { useEffect, useState } from 'react';
import { loadOneProductThunk } from '../../redux/product';
import { loadUsersThunk } from '../../redux/user';
import ProductReviews from '../ProductReviews/ProductReviews';
import { createBagItemThunk, updateBagItemThunk } from '../../redux/shoppingBag';

function ProductDetails() {
    const dispatch = useDispatch()
    const { productId } = useParams()
    const product = useSelector(state => state.product[productId])
    const user = useSelector(state => state.user)
    const review = useSelector(state => state.review)
    const reviews = Object.values(review)
    const reviewStars = reviews.map(item => item.stars)
    const [addedToBag, setAddedToBag] = useState(false)
    const sessionUser = useSelector((state) => state.session.user)
    const bag = useSelector(state => state.bag)
    const bagItems = Object.values(bag)

    useEffect(() => {
        dispatch(loadOneProductThunk(productId))
        dispatch(loadUsersThunk())
    }, [dispatch, productId])

    if(!product || !user || !review) return null

    function averageRating(stars) {
        if(!stars) return 0
        const totalStars = stars.reduce((acc, curr) => acc + curr, 0)
        const averageRating = totalStars / stars.length
        return averageRating
    }

    // const comingSoon = (e) => {
    //     e.preventDefault()
    //     window.alert('Feature Coming Soon!')
    // }

    const addToBag = (e) => {
        e.preventDefault()
        const existingItem = bagItems.find(item => item.product_id === product.id)
        if (existingItem) {
            dispatch(updateBagItemThunk({ buyer_id: sessionUser.id, product_id: product.id, quantity: existingItem.quantity + 1 }, existingItem.id))
        } else {
            dispatch(createBagItemThunk({ buyer_id: sessionUser.id, product_id: product.id, quantity: 1 }))
        }
        setAddedToBag(true)
    }

    return (
        <>
        <section className='spot-detail-section'>
            <img className='product-detail-image' src={product?.image} alt='product-image'/>
            <div className='product-info'>
                <p className='detail-seller-name'>{`${user[product?.seller_id]?.first_name} ${user[product?.seller_id]?.last_name}`}</p>
                <h1 className='detail-product-name'>{product?.name}</h1>
                {!reviewStars?.length ? null :
                    <div className='detail-review'>
                        <p>{averageRating(reviewStars).toFixed(1)}</p>
                        <p>{(() => {
                            const stars = [];
                            for (let i = 0; i < 5; i++) {
                                if (i < Math.floor(averageRating(reviewStars))) {
                                    stars.push(<i style={{cursor: 'default'}} key={i} className="fas fa-star"></i>)
                                } else if (i === Math.floor(averageRating(reviewStars)) && averageRating(reviewStars) % 1 !== 0) {
                                    stars.push(<i style={{cursor: 'default'}} key={i} className="fas fa-star-half-alt"></i>)
                                } else {
                                    stars.push(<i style={{cursor: 'default'}} key={i} className="far fa-star"></i>)
                                }
                            }
                            return stars
                        })()}</p>
                        <p>{reviewStars?.length <= 1 ? `${reviewStars?.length} Review` : `${reviewStars?.length} Reviews`}</p>
                    </div>
                }
                <h2 className='detail-price'>{`$${product?.price}`}</h2>
                <div className='detail-buttons'>
                    <button className='add-to-bag' onClick={addToBag}>{addedToBag ? 'ADDED' : 'ADD TO BAG'}</button>
                    {/* <button className='favorite-item' onClick={comingSoon}>{<i className="fa-regular fa-heart"></i>}</button> */}
                </div>
                <h3>Product Details</h3>
                <p className='product-description'>{product.description}</p>
            </div>
        </section>
        <ProductReviews productId={productId} product={product}/>
        </>
    )
}

export default ProductDetails
