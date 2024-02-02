import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProductThunk } from "../../redux/product";
import { useNavigate } from "react-router-dom";

function CreateProduct() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [image, setImage] = useState(null)
    const [errors, setErrors] = useState({})
    const [imageLoading, setImageLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        if(!sessionUser) navigate('/')
        const newErrors = {}

        if(!name) newErrors.name = 'Name is required'
        if(!Number(price)) newErrors.price = 'Price is required'
        if(!description) newErrors.description = 'Description is required'
        // if(!category) newErrors.category = 'Category is required'
        if(!image || !image?.name.endsWith('.png') && !image?.name.endsWith('.jpg') && !image?.name.endsWith('.jpeg')) newErrors.image = 'Image must be in .png, .jpg, or .jpeg format'

        setErrors(newErrors)
    }, [sessionUser, navigate, name, price, description, image])

    const handleSubmit = async(e) => {
        e.preventDefault()

        setSubmitted(true)

        if(!Object.values(errors).length) {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('price', price)
            formData.append('description', description)
            formData.append('category', category)
            formData.append('image', image)
            // aws uploads can be a bit slow—displaying
            // some sort of loading message is a good idea
            setImageLoading(true)
            const product = await dispatch(createProductThunk(formData))
            navigate(`/products/${product.id}`)
        }
    }

    return (
        <>
        {sessionUser && (
            <div className="create-product">
                <div className="create-prod-box">
                    <h1>Create a New Makeup Product</h1>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="entry-container">
                            <h2>Name</h2>
                            {submitted && errors.name && <p style={{color: 'red'}}>{errors.name}</p>}
                            <input
                                className="product-inputs"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="entry-container">
                            <h2>Price</h2>
                            {submitted && errors.price && <p style={{color: 'red'}}>{errors.price}</p>}
                            <input
                                className="product-inputs"
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div className="entry-container">
                            <h2>Description</h2>
                            {submitted && errors.description && <p style={{color: 'red'}}>{errors.description}</p>}
                            <input
                                className="product-inputs"
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="entry-container">
                            <h2>Category</h2>
                            {submitted && errors.category && <p style={{color: 'red'}}>{errors.category}</p>}
                            <select
                                className="product-inputs"
                                value={category}
                                // defaultValue={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value={"face"}>Face</option>
                                <option value={"eyes"}>Eyes</option>
                                <option value={"lips"}>Lips</option>
                                <option value={"cheeks"}>Cheeks</option>
                                <option value={"brushes&tools"}>Brushes & Tools</option>
                            </select>
                        </div>
                        <div className="entry-container">
                            <h2>Image</h2>
                            {submitted && errors.image && <p style={{color: 'red'}}>{errors.image}</p>}
                            <input
                                className="product-inputs"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </div>
                        <div className="create-button">
                            <button type="submit">Submit</button>
                        </div>
                        {(imageLoading) && <p className="loading-text">Loading...</p>}
                    </form>
                </div>
            </div>
        )}
        </>
    )
}

export default CreateProduct
