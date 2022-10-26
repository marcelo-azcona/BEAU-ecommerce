import { useDispatch } from 'react-redux';
import { cartActions } from '../../store-redux-toolkit/cart/cart-slice.ts';
import Button from '../UI/button/Button';
// import { CartContext } from '../../context/CartContext';

import './ProductCard.styles.scss';

const ProductCard = ({ product }) => {
  // const { addItemToCart } = useContext(CartContext);
  const { name, price, imageUrl } = product;
  const dispatch = useDispatch();

  const addProductHandler = () => {
    // addItemToCart(product);
    dispatch(cartActions.addItemToCart(product));
  };

  return (
    <div className="product-card">
      <img src={imageUrl} alt={`${name}`} />
      <div className="product-card__footer">
        <span className="product-card__name">{name}</span>
        <span className="product-card__price">$ {price}</span>
      </div>
      <Button buttonType="inverted" onClick={addProductHandler}>
        Add to cart
      </Button>
    </div>
  );
};

export default ProductCard;
