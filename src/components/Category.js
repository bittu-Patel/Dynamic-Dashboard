import React from 'react';
import Widget from './Widget';
import useStore from '../store/dashboardSlice';

const Category = ({ category }) => {
  const addWidget = useStore((state) => state.addWidget);

  const handleAddWidget = () => {
    const widgetName = prompt('Enter Widget Name:');
    const widgetText = prompt('Enter Widget Text:');
    if (widgetName && widgetText) {
      addWidget(category.id, {
        id: `widget_${category.widgets.length + 1}`,
        name: widgetName,
        text: widgetText
      });
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4">{category.name}</h2>
      <div className="space-y-4">
        {category.widgets.map((widget) => (
          <Widget key={widget.id} widget={widget} categoryId={category.id} />
        ))}
      </div>
      <button
        onClick={handleAddWidget}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
      >
        + Add Widget
      </button>
    </div>
  );
};

export default Category;
