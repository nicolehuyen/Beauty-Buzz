export default function ProductTile({product, seller}) {
    console.log('product', product)
    return (
        <>
        <div className='product-tile'>
            <img className='product-image' src={product?.image} alt='product-image' />
            <span className='seller-name'>{`${seller?.first_name} ${seller?.last_name}`}</span>
            <h3 className='product-name'>{product?.name}</h3>
            <span className='product-price'>{`$${product?.price}`}</span>
        </div>
        </>
    )
}
