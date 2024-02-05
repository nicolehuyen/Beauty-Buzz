import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadProductReviewsThunk } from "../../redux/review"
import { useParams } from "react-router-dom"
import { loadUsersThunk } from "../../redux/user"
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import CreateReview from "../CreateReview/CreateReview"
import UpdateReview from "../UpdateReview/UpdateReview"
import DeleteReview from "../DeleteReview/DeleteReview"

function ProductReviews() {
    const dispatch = useDispatch()
    const { productId } = useParams()
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

    return (
        <section className="product-reviews">
            <OpenModalButton buttonText={"Add a review"} modalComponent={<CreateReview productId={productId}/>}/>
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
