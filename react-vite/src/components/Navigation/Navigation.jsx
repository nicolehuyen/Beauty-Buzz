import { useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import beautyBuzz from './beauty-buzz-logo.png'
import { useModal } from "../../context/Modal";
import LoginFormModal from "../LoginFormModal";
import { useSelector } from "react-redux";

function Navigation() {
  const navigate = useNavigate()
  const {setModalContent} = useModal()
  const sessionUser = useSelector(state => state.session.user)

  const openModal = () => {
    setModalContent(<LoginFormModal />)
  }

  const login = (e) => {
    e.preventDefault()
    openModal()
  }

  return (
    <div className="navigation">
      <img className="logo-title" onClick={() => navigate('/')} src={beautyBuzz} alt="beauty-buzz-title" />
      <div className="categories">
        <p className="cate-title" onClick={() => navigate('/products/category/face')}>Face</p>
        <p className="cate-title" onClick={() => navigate('/products/category/eyes')}>Eyes</p>
        <p className="cate-title" onClick={() => navigate('/products/category/lips')}>Lips</p>
        <p className="cate-title" onClick={() => navigate('/products/category/cheeks')}>Cheeks</p>
        <p className="cate-title" onClick={() => navigate('/products/category/brushes&tools')}>Brushes & Tools</p>
      </div>
      <div className="nav-right">
        {!sessionUser ? (
          <>
          <i className="fa-solid fa-bag-shopping" onClick={login}/>
          <i className="fas fa-user-circle" onClick={login}/>
          </>
        ) : (
          <>
          <i className="fa-solid fa-bag-shopping" onClick={() => navigate('/bag')}/>
          <ProfileButton />
          </>
        )}
      </div>
    </div>
  )
}

export default Navigation;
