import { useNavigate } from "react-router-dom";

export default function ProductTile({product, seller}) {
    const navigate = useNavigate()

    function averageRating(stars) {
        if(!stars) return 0
        const totalStars = stars.reduce((acc, curr) => acc + curr, 0)
        const averageRating = totalStars / stars.length
        return averageRating
    }

    return (
        <>
        <div className='product-tile' onClick={() => navigate(`/products/${product?.id}`)}>
            <img className='product-image' src={product?.image} alt='product-image' />
            <span className='seller-name'>{`${seller?.first_name} ${seller?.last_name}`}</span>
            <h4 className='product-name'>{product?.name}</h4>
            {!product?.reviews?.length ? null :
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
            }
            <span className='product-price'>{`$${Number(product?.price).toFixed(2)}`}</span>
        </div>
        </>
    )
}
