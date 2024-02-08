import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createReviewThunk } from "../../redux/review"
import { useModal } from "../../context/Modal"
import './CreateReview.css'

function CreateReview({productId}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const [review, setReview] = useState('')
    const [stars, setStars] = useState(0)
    const [hover, setHover] = useState(0)
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal()
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        if(!sessionUser) navigate('/')
        const newErrors = {}

        if(String(review).length < 10) newErrors.review = 'Review must be at least 10 characters.'
        if(String(review).length > 340) newErrors.review = 'Review cannot exceed 340 characters.'
        if(!stars) newErrors.stars = 'Star rating is required.'

        setErrors(newErrors)
    }, [sessionUser, navigate, review, stars])

    const handleSubmit = async(e) => {
        e.preventDefault()

        setSubmitted(true)

        if(!Object.values(errors).length) {
            const newReview = {
                review,
                stars
            }

            await dispatch(createReviewThunk(newReview, productId)).then(closeModal())
        }
    }

    const handleStarClick = (rating) => {
        setStars(rating)
    }

    return (
        <div className="create-review-form">
            <h2 className="review-h2">What do you think of this product?</h2>
            <form className="review-form" onSubmit={handleSubmit}>
                <textarea
                    className="review-text-box"
                    type='text'
                    value={review}
                    placeholder='Leave your review here...'
                    onChange={(e) => setReview(e.target.value)}
                    minLength={10}
                />
                <div style={{minHeight: 25}}>{submitted && errors.review ? <span className="error">{errors.review}</span> : ' '}</div>
                <div className="star-rating-div">
                    {[...Array(5)].map((star, index) => {
                        const rating = index + 1
                        const starClass = rating <= (hover || stars) ? 'fa-solid' : 'fa-regular'
                        return (
                            <label key={rating}>
                                <input
                                    type='radio'
                                    value={rating}
                                    onClick={() => handleStarClick(rating)}
                                />
                                <i
                                    className={`fa ${starClass} fa-star`}
                                    onMouseEnter={() => setHover(rating)}
                                    onMouseLeave={() => setHover(0)}
                                ></i>
                            </label>
                        )
                    })} Stars
                </div>
                <div style={{minHeight: 25}}>{submitted && errors.stars ? <span className="error">{errors.stars}</span> : ' '}</div>
                <div className="submit-review-form">
                    <button className="create-review-button" type="submit">Submit Your Review</button>
                </div>
            </form>
        </div>
    )
}

export default CreateReview
