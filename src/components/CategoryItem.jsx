const CategoryItem = ({ category, onSelect, checked }) => {
  return (
    <li onClick={() => onSelect(category)} className="hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:rounded-lg py-1 px-2">
      <input readOnly checked={checked} type="checkbox"/>
      <button className="inline-flex items-center text-md">
        {category.icon && <span className="m-2">{category.icon}</span>}
        {category.name}
      </button>
    </li>
  );
};

export default CategoryItem;
