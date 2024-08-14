import React from 'react';
import useStore from '../store/dashboardSlice';

const Widget = ({ widget, categoryId }) => {
  const removeWidget = useStore((state) => state.removeWidget);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">{widget.name}</h3>
        <p className="text-gray-700">{widget.text}</p>
      </div>
      <button
        onClick={() => removeWidget(categoryId, widget.id)}
        className="text-red-500 hover:text-red-700"
      >
        ✖
      </button>
    </div>
  );
};

export default Widget;
