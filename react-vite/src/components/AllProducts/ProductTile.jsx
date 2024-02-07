import { useNavigate } from "react-router-dom";

export default function ProductTile({product, seller}) {
    const navigate = useNavigate()

    return (
        <>
        <div className='product-tile' onClick={() => navigate(`/products/${product?.id}`)}>
            <img className='product-image' src={product?.image} alt='product-image' />
            <span className='seller-name'>{`${seller?.first_name} ${seller?.last_name}`}</span>
            <h4 className='product-name'>{product?.name}</h4>
            <span className='product-price'>{`$${Number(product?.price).toFixed(2)}`}</span>
        </div>
        </>
    )
}
