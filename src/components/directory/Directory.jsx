import CategoryItem from '../category-item/CategoryItem';
import './Directory.styles.scss';

const Directory = ({ categories }) => {
  console.log(categories);
  return (
    <div className="directory-container">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Directory;
