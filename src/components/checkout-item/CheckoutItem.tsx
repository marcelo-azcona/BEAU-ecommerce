import { useDispatch } from 'react-redux';
import { cartActions } from '../../store-redux-toolkit/cart/cart-slice';
import { CartItem } from '../../store-redux-toolkit/cart/cart-types';
import './CheckoutItem.styles.scss';

type CartProps = {
  cartItem: CartItem;
};

const CheckoutItem = ({ cartItem }: CartProps) => {
  const { name, imageUrl, price, quantity } = cartItem;

  const dispatch = useDispatch();

  const clearItemHandler = () => {
    dispatch(cartActions.clearItemFromCart(cartItem));
  };

  const addCartItemHandler = () => {
    dispatch(cartActions.addItemToCart(cartItem));
  };

  const removeCartItemHandler = () => {
    dispatch(cartActions.removeItemFromCart(cartItem));
  };

  return (
    <div className="checkout-item">
      <div className="checkout-item__imgBox">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="checkout-item__name">{name}</span>
      <span className="checkout-item__quantity">
        <div className="checkout-item__arrow" onClick={removeCartItemHandler}>
          &#10094;
        </div>
        <span className="checkout-item__value">{quantity}</span>
        <div className="checkout-item__arrow" onClick={addCartItemHandler}>
          &#10095;
        </div>
      </span>
      <span className="checkout-item__price">{price}</span>
      <div className="checkout-item__remove-btn" onClick={clearItemHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
