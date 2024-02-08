import { useDispatch } from "react-redux";
import './DeleteProduct.css'
import { useModal } from '../../context/Modal'
import { deleteProductThunk } from "../../redux/product";

function DeleteProduct({productId}) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const handleDelete = async(e) => {
        e.preventDefault()

        await dispatch(deleteProductThunk(productId)).then(closeModal())
    }

    return (
        <div className="delete-product-modal">
            <div className="delete-info-modal">
                <h2 className="delete-header-text">Confirm Delete</h2>
                <p className="delete-text">Are you sure you want to remove this product?</p>
                <div className="delete-buttons-holder">
                    <button className="delete-modal-button" onClick={handleDelete}>Delete</button>
                    <button className='delete-modal-button' onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteProduct
