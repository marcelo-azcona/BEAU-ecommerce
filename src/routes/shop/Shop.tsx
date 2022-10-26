import { Routes, Route } from 'react-router-dom';
import CategoriesPreview from '../categories-preview/CategoriesPreview';
import Category from '../category/Category';
import './Shop.styles.scss';

const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;

/**
 *? :category as a dynamic route will pick the Route determined in the Category component
 *? To set that route I must use useParameters and tell the hook the name of the variable (that is the key of an object).
 *? The <Category /> component will be dynamic rendered based in the URL and how do I set that dynamism.
 *
 */
