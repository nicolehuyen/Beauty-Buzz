import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { manageProductsThunk } from "../../redux/product"
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteProduct from "../DeleteProduct/DeleteProduct"
import './ManageProducts.css'

function ManageProducts() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user)
    const productsObj = useSelector((state) => state.product)
    const products = Object.values(productsObj)

    useEffect(() => {
        if(!sessionUser) navigate('/')
        dispatch(manageProductsThunk())
    }, [dispatch, sessionUser, navigate])

    return (
        <>
            {sessionUser && (
                <div className="manage-products-section">
                    <div className="manage-products-container">
                        <h1 className="manage-title">Manage Your Products</h1>
                        <div className="create-button">
                            <button className='create-new-product-button' onClick={() => navigate('/products/new')}>Create New Product</button>
                        </div>
                    </div>
                    <div className="products-container">
                        {products.map((product) => (
                            <div key={product.id}>
                                <div style={{height: 440}} className='product-tile' onClick={() => navigate(`/products/${product?.id}`)}>
                                    <img className='product-image' src={product?.image} alt='product-image' />
                                    <h4 style={{paddingTop: 10}} className='product-name'>{product?.name}</h4>
                                    <span className='product-price'>{`$${Number(product?.price).toFixed(2)}`}</span>
                                </div>
                                <div className="manage-buttons">
                                    <button className='update-product-button' onClick={() => navigate(`/products/${product.id}/edit`)}>Update</button>
                                    <OpenModalButton buttonText={"Delete"} modalComponent={<DeleteProduct productId={product.id}/>}/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default ManageProducts;
