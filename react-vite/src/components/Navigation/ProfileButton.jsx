import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";
import { useNavigate } from "react-router-dom";

function ProfileButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout()).then(navigate('/')).then(closeMenu())
  };

  return (
    <>
      <span onClick={toggleMenu}>
        <i className="fas fa-user-circle" />
      </span>
      {showMenu && (
        <span className={"profile-dropdown"} ref={ulRef}>
          {user && (
            <>
              <div className="profile-user">
                <i className="fa-solid fa-user profile-icon"></i>
                <span>{user.first_name} {user.last_name}</span>
              </div>
              <div className="profile-user-info">
                <i className="fa-solid fa-list-check profile-icon"></i>
                <span onClick={() => navigate('/products/manage')}>Manage products</span>
              </div>
              <div className="profile-user-info">
                <i className="fa-solid fa-right-from-bracket profile-icon"></i>
                <span onClick={logout}>Sign out</span>
              </div>
            </>
          )}
        </span>
      )}
    </>
  );
}

export default ProfileButton;
