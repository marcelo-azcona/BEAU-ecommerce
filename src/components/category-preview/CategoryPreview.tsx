import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../product-card/ProductCard';
import { CategoryItem } from '../../store-redux-toolkit/categories/categories-types';
import './CategoryPreview.styles.scss';

const CategoryPreview = ({
  title,
  products,
}: {
  title: string;
  products: CategoryItem[];
}) => {
  const navigateTo = useNavigate();

  const onNavigateHandler = () => navigateTo(`/shop/${title}`);

  return (
    <div className="category-preview">
      <h2>
        <span className="category-preview__title" onClick={onNavigateHandler}>
          {title}
        </span>
      </h2>
      <div className="category-preview__preview">
        {products
          .filter((_, index) => index < 5)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default CategoryPreview;
