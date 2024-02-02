import { useParams } from 'react-router-dom'
import './ProductCategory.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loadCategoryProductsThunk } from '../../redux/product'
import { loadUsersThunk } from '../../redux/user'

function ProductCategory() {
    const dispatch = useDispatch()
    const { category } = useParams()
    const product = useSelector(state => state.product[category])
    const user = useSelector(state => state.user)
    console.log('categoriesss', product)

    useEffect(() => {
        dispatch(loadCategoryProductsThunk(category))
        dispatch(loadUsersThunk())
    }, [dispatch, category])

    if(!product || !user) return null

    return (
        <section className='category-products'>
            <p>hi</p>
        </section>
    )
}

export default ProductCategory
