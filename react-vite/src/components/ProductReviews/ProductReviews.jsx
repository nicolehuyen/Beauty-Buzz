import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadProductReviewsThunk } from "../../redux/review"
import { loadUsersThunk } from "../../redux/user"
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import CreateReview from "../CreateReview/CreateReview"
import UpdateReview from "../UpdateReview/UpdateReview"
import DeleteReview from "../DeleteReview/DeleteReview"

function ProductReviews({productId}) {
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

    return (
        <section className="product-reviews">
            <div className="review-title">
                <h2>Reviews</h2>
                <OpenModalButton buttonText={"WRITE A REVIEW"} modalComponent={<CreateReview productId={productId}/>}/>
            </div>
            <div className="average-rating">
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
                <h2>{averageRating().toFixed(1)}</h2>
                <p>{reviews.length} Reviews</p>
            </div>
            {reviews.reverse().map(review => (
                <div key={review.id}>
                    {(() => {
                        const stars = [];
                        for (let i = 0; i < 5; i++) {
                            const starClass = i < review.stars ? "fa-solid" : "fa-regular";
                            stars.push(<i key={i} className={`fa ${starClass} fa-star`}></i>);
                        }
                        return stars
                    })()}
                    <p className="review-text">{review?.review}</p>
                    <div className="name-date">
                        <p className="reviewer-name">{user[review?.creator_id]?.first_name}</p>
                        <p className="review-date">{month(review?.created_at)} {day(review?.created_at)}, {year(review?.created_at)}</p>
                    </div>
                    {sessionUser?.id === review?.creator_id && (
                        <>
                        <OpenModalButton buttonText={"Edit"} modalComponent={<UpdateReview productId={productId} reviewId={review.id}/>}/>
                        <OpenModalButton buttonText={"Delete"} modalComponent={<DeleteReview productId={productId} reviewId={review.id}/>}/>
                        </>
                    )}
                </div>
            ))}
        </section>
    )
}

export default ProductReviews
