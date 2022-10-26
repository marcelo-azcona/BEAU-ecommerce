import { ReactComponent as ShopBag } from '../../assets/shopping-bag.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../../store-redux-toolkit/store';
import './CartIcon.styles.scss';

const CartIcon = ({ onOpenCart }: { onOpenCart: () => void }) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <div className="cart-icon" onClick={onOpenCart}>
      <ShopBag className="cart-icon__shopping-bag" />
      <span className="cart-icon__item-count">
        {cartItems.length > 0
          ? cartItems.reduce((accumulator, item) => {
              return accumulator + item.quantity;
            }, 0)
          : 0}
      </span>
    </div>
  );
};

export default CartIcon;
