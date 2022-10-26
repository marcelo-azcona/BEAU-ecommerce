import { useNavigate } from 'react-router-dom';
import { CategoriesRoute } from '../../store-redux-toolkit/categories/categories-types';
import './CategoryItem.styles.scss';

const CategoryItem = ({ category }: CategoriesRoute) => {
  const { imageUrl, title, route } = category;
  const navigateTo = useNavigate();

  const onNavigateHandler = () => navigateTo(route);

  return (
    <div className="category-container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="category-body-container" onClick={onNavigateHandler}>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default CategoryItem;
