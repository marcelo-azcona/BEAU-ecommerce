import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store-redux-toolkit/store';
import Button from '../UI/button/Button';
import CartItem from '../cart-item/CartItem';
import './CartDropdown.styles.scss';

const CartDropdown = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const navigateTo = useNavigate();

  const checkOutHandler = () => {
    navigateTo('/checkout');
  };

  return (
    <div className="cart-dropdown">
      <div className="cart-dropdown__cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button onClick={checkOutHandler} buttonType="base">
        Go to checkout!
      </Button>
    </div>
  );
};

export default CartDropdown;
