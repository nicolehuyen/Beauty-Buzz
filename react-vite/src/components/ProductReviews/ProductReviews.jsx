import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadProductReviewsThunk } from "../../redux/review"
import { loadUsersThunk } from "../../redux/user"
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import ReviewModalButton from "./ReviewModalButton"
import CreateReview from "../CreateReview/CreateReview"
import UpdateReview from "../UpdateReview/UpdateReview"
import DeleteReview from "../DeleteReview/DeleteReview"
import './ProductReviews.css'

function ProductReviews({productId, product}) {
    const dispatch = useDispatch()
    const reviewsObj = useSelector(state => state.review)
    const reviews = Object.values(reviewsObj)
    const user = useSelector(state => state.user)
    const sessionUser = useSelector((state) => state.session.user)

    useEffect(() => {
        dispatch(loadProductReviewsThunk(productId))
        dispatch(loadUsersThunk())
    }, [dispatch, productId])

    if(!reviews) return null

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

    function averageRating() {
        if(!reviews) return 0
        const totalStars = reviews.reduce((acc, review) => acc + review.stars, 0)
        const averageRating = totalStars / reviews.length
        return averageRating
    }

    const reviewers = reviews.map(review => review.creator_id)

    return (
        <section className="product-reviews">
            <div className="review-title">
                <h2>Reviews</h2>
                {sessionUser && sessionUser?.id !== product?.seller_id && !reviewers.includes(sessionUser?.id) && (<ReviewModalButton buttonText={"WRITE A REVIEW"} modalComponent={<CreateReview productId={productId}/>}/>)}
            </div>
            <div className="average-rating">
                {!reviews?.length ? <p style={{fontSize: 18}}>Write the first review!</p> :
                <>
                <h2>{(() => {
                    const stars = [];
                    for (let i = 0; i < 5; i++) {
                        if (i < Math.floor(averageRating())) {
                            stars.push(<i key={i} className="fas fa-star"></i>)
                        } else if (i === Math.floor(averageRating()) && averageRating() % 1 !== 0) {
                            stars.push(<i key={i} className="fas fa-star-half-alt"></i>)
                        } else {
                            stars.push(<i key={i} className="far fa-star"></i>)
                        }
                    }
                    return stars
                })()}</h2>
                <h1 className="avg-rate">{averageRating().toFixed(1)}</h1>
                <p>{reviews?.length <= 1 ? `${reviews?.length} Review` : `${reviews?.length} Reviews`}</p>
                </>
                }
            </div>
            {reviews.reverse().map(review => (
                <div className='review-container' key={review.id}>
                    <div className="reviewers-review">
                        <p>{(() => {
                            const stars = [];
                            for (let i = 0; i < 5; i++) {
                                const starClass = i < review?.stars ? "fa-solid" : "fa-regular";
                                stars.push(<i key={i} className={`fa ${starClass} fa-star`}></i>);
                            }
                            return stars
                        })()}</p>
                        <p className="review-text">{review?.review}</p>
                        <div className="name-date">
                            <p className="reviewer-name">{user[review?.creator_id]?.first_name}</p>
                            <p className="review-date">{month(review?.created_at)} {day(review?.created_at)}, {year(review?.created_at)}</p>
                        </div>
                    </div>
                    <div className="review-buttons">
                        {sessionUser?.id === review?.creator_id && (
                            <>
                            <OpenModalButton buttonText={"Edit"} modalComponent={<UpdateReview productId={productId} reviewId={review.id}/>}/>
                            <OpenModalButton buttonText={"Delete"} modalComponent={<DeleteReview productId={productId} reviewId={review.id}/>}/>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </section>
    )
}

export default ProductReviews
