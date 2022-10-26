import { Outlet, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../store-redux-toolkit/cart/cart-slice';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import { RootState } from '../../store-redux-toolkit/store';
import CartIcon from '../../components/cart-icon/CartIcon';
import CartDropdown from '../../components/cart-dropdown/CartDropdown';
import './Navigation.styles.scss';

const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const isCartDropdownOpen = useSelector(
    (state: RootState) => state.cart.cartDropdownIsOpen
  );

  const signOutHandler = async () => {
    const response = await signOutUser();
  };

  const openCartHandler = () => {
    dispatch(cartActions.cartDropdownIsOpen());
  };

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          BEAU
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>

          {currentUser ? (
            <span className="nav-link" onClick={signOutHandler}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          <CartIcon onOpenCart={openCartHandler} />
        </div>
        {isCartDropdownOpen ? <CartDropdown /> : ''}
      </div>
      <Outlet />
      {/* The Navigation will always render and after that (the Outlet) will come the childs that I setted in App.js.
          Here all nested routes will render depending of the URL path */}
    </>
  );
};

export default Navigation;
