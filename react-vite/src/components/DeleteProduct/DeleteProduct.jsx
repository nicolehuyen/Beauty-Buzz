import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import './DeleteProduct.css'
import { useModal } from '../../context/Modal'
import { deleteProductThunk } from "../../redux/product";

function DeleteProduct({productId}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const handleDelete = async(e) => {
        e.preventDefault()

        await dispatch(deleteProductThunk(productId)).then(closeModal())
        navigate('/products')
    }

    return (
        <div className="delete-product-modal">
            <div className="delete-info-modal">
                <h2 className="delete-header-text">Confirm Delete</h2>
                <p className="delete-text">Are you sure you want to remove this product from the listings?</p>
                <div className="delete-buttons-holder">
                    <button className="delete-modal-button" onClick={handleDelete}>Delete</button>
                    <button className='cancel-modal-button' onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteProduct