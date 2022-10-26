import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../store-redux-toolkit/store';
import { CategoryMap } from '../../store-redux-toolkit/categories/categories-types';
import { CategoryItem } from '../../store-redux-toolkit/categories/categories-types';
import ProductCard from '../../components/product-card/ProductCard';
import Spinner from '../../components/UI/spinner/Spinner';
import './Category.styles.scss';

type myParams = {
  category: string;
};

const Category = () => {
  const { category } = useParams() as myParams;

  // REDUX TOOLKIT
  const categoriesMap = useSelector((state: RootState) =>
    state.categories.categories.reduce((accumulator, category) => {
      const { title, items } = category;
      accumulator[title.toLowerCase()] = items;
      return accumulator;
    }, {} as CategoryMap)
  );

  const isLoading = useSelector(
    (state: RootState) => state.categories.isLoading
  );

  const [products, setProducts] = useState<CategoryItem[]>([]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <div className="products">
      <h2>{category}</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        products &&
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
};

export default Category;
