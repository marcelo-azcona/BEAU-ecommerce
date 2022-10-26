import { useSelector } from 'react-redux';
import { CategoryMap } from '../../store-redux-toolkit/categories/categories-types';
import { RootState } from '../../store-redux-toolkit/store';
import CategoryPreview from '../../components/category-preview/CategoryPreview';

const Categories = () => {
  // REDUX TOOLKIT
  const categoriesMap = useSelector((state: RootState) =>
    state.categories.categories.reduce((accumulator, category) => {
      const { title, items } = category;
      accumulator[title.toLowerCase()] = items;
      return accumulator;
    }, {} as CategoryMap)
  );

  return (
    <div className="categories">
      {Object.keys(categoriesMap).map((title: string) => {
        const products = categoriesMap[title];

        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </div>
  );
};

export default Categories;
