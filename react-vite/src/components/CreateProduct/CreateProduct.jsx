import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProductThunk } from "../../redux/product";
import { useNavigate } from "react-router-dom";
import './CreateProduct.css'

function CreateProduct() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user)
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState(null)
    const [errors, setErrors] = useState({})
    const [imageLoading, setImageLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        if(!sessionUser) navigate('/')
        const newErrors = {}

        if(!name) newErrors.name = 'Product name is required.'
        if(String(name).length > 75) newErrors.name = 'Product name cannot exceed 75 characters.'
        if(!category) newErrors.category = 'Category is required.'
        if(Number(price) < 1) newErrors.price = 'Price must be at least $1.'
        if(Number(price) > 999) newErrors.price = 'Price cannot exceed $999.'
        if(String(description).length < 30) newErrors.description = 'Description must be at least 30 characters.'
        if(String(description).length > 1000) newErrors.description = 'Description cannot exceed 1,000 characters.'
        if(!image) newErrors.image = 'Image is required.'
        if(!image?.name?.endsWith('.png') && !image?.name?.endsWith('.jpg') && !image?.name?.endsWith('.jpeg')) newErrors.image = 'Image must be in .png, .jpg, or .jpeg format.'

        setErrors(newErrors)
    }, [sessionUser, navigate, name, category, price, description, image])

    const handleSubmit = async(e) => {
        e.preventDefault()

        setSubmitted(true)

        if(!Object.values(errors).length) {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('category', category)
            formData.append('price', price)
            formData.append('description', description)
            formData.append('image', image)
            // aws uploads can be a bit slow—displaying
            // some sort of loading message is a good idea
            setImageLoading(true)
            await dispatch(createProductThunk(formData))
            navigate(`/products/manage`)
        }
    }

    return (
        <>
        {sessionUser && (
            <div className="create-product-section">
                <div className="create-prod-box">
                    <h2 style={{paddingBottom: 20}}>Create a New Makeup Product</h2>
                    <form onSubmit={handleSubmit} encType="multipart/form-data" className="product-form">
                        <div className="entry-container">
                            <h4 className="input-title">Product Name</h4>
                            <input
                                className="form-input"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <div style={{minHeight: 30}}>{submitted && errors.name ? <span className="error">{errors.name}</span> : ' '}</div>
                        </div>
                        <div className="cate-price">
                            <div className="entry-container cate-field">
                                <h4 className="input-title">Category</h4>
                                <select
                                    className="form-input cate-input"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value='' disabled>Select a category</option>
                                    <option value={"face"}>Face</option>
                                    <option value={"eyes"}>Eyes</option>
                                    <option value={"lips"}>Lips</option>
                                    <option value={"cheeks"}>Cheeks</option>
                                    <option value={"brushes&tools"}>Brushes & Tools</option>
                                </select>
                                <div style={{minHeight: 30}}>{submitted && errors.category ? <span className="error">{errors.category}</span> : ' '}</div>
                            </div>
                            <div className="entry-container">
                                <h4 className="input-title">Price</h4>
                                <input
                                    className="form-input"
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                                <div style={{minHeight: 30}}>{submitted && errors.price ? <span className="error">{errors.price}</span> : ' '}</div>
                            </div>
                        </div>
                        <div className="entry-container">
                            <h4 className="input-title">Description</h4>
                            <p style={{fontSize: 13, paddingBottom: 10}}>Start with a summary that describes your product&apos;s finest features. Other information you can include is how to use your product and it&apos;s ingredients.</p>
                            <textarea
                                className="form-input text-box"
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <div style={{minHeight: 30}}>{submitted && errors.description ? <span className="error">{errors.description}</span> : ' '}</div>
                        </div>
                        <div className="entry-container">
                            <h4 className="input-title">Image</h4>
                            <input
                                type="file"
                                accept="image/png, image/jpeg, image/jpg"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                            <div style={{minHeight: 30}}>{submitted && errors.image ? <span className="error">{errors.image}</span> : ' '}</div>
                        </div>
                        <div className="create-button-div">
                            <button className='create-prod-button' type="submit">Create Product</button>
                        </div>
                        <div style={{minHeight: 30}}>{imageLoading ? <p className="loading-text">Loading...</p> : ' '}</div>
                    </form>
                </div>
            </div>
        )}
        </>
    )
}

export default CreateProduct
