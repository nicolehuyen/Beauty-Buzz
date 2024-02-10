import './LandingPage.css'
import banner from './Banner.png'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import ProductTile from '../AllProducts/ProductTile'
import { loadProductsThunk } from '../../redux/product'
import { loadUsersThunk } from '../../redux/user'
import github from './GitHub.png'
import linkedin from './LinkedIn.png'
import { Link } from 'react-router-dom'

function LandingPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const products = useSelector(state => state.product)
    const productKeys = Object.keys(products)
    const users = useSelector(state => state.user)

    useEffect(() => {
        dispatch(loadProductsThunk())
        dispatch(loadUsersThunk())
    }, [dispatch])

    if(!products || !users) return null

    return (
        <section className="landing-page">
            <div className='top-section'>
                <img className='banner' src={banner} alt='banner' />
                <button className='shop-now' onClick={() => navigate('/products')}>SHOP NOW</button>
            </div>
            <div className='whats-new'>
                <div className='whats-new-title'>
                    <h1>What&apos;s New</h1>
                    <p className='shop-all' onClick={() => navigate('/products')}>Shop all</p>
                </div>
                <div className='whats-new-prod'>
                {users && productKeys.reverse().map((id) => (
                    <ProductTile key={id} product={products[id]} seller={users[products[id]['seller_id']]} />
                ))}
                </div>
            </div>
            <footer className='footer'>
                <Link to={"https://github.com/nicolehuyen/Beauty-Buzz.git"} target='_blank'>
                    <img className='social-media' src={github} alt='github' />
                </Link>
                <Link to={"https://www.linkedin.com/in/nicolehuyenle/"} target='_blank'>
                    <img className='social-media' src={linkedin} alt='linkedin' />
                </Link>
            </footer>
        </section>
    )
}

export default LandingPage
