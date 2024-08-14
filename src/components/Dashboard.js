import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addWidget, removeWidget } from '../store/dashboardSlice';
import ProgressBar from './ProgressBar';

const Dashboard = () => {
  const categories = useSelector(state => state.dashboard.categories);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [newWidgetName, setNewWidgetName] = useState('');
  const [newWidgetText, setNewWidgetText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleAddWidget = (e) => {
    e.preventDefault();
    if (newWidgetName && newWidgetText && selectedCategory) {
      const newWidget = {
        id: Date.now().toString(),
        name: newWidgetName,
        text: newWidgetText,
      };
      dispatch(addWidget({ categoryId: selectedCategory, widget: newWidget }));
      setNewWidgetName('');
      setNewWidgetText('');
      setSelectedCategory('');
    }
  };

  const handleRemoveWidget = (categoryId, widgetId) => {
    dispatch(removeWidget({ categoryId, widgetId }));
  };

  const filteredCategories = categories.map(category => ({
    ...category,
    widgets: category.widgets.filter(widget =>
      widget.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  const totalWidgetsCount = categories.reduce((total, category) => total + category.widgets.length, 0);

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search widgets"
          className="border p-2 w-full rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <form onSubmit={handleAddWidget} className="mb-4">
        <div className="flex flex-col md:flex-row md:items-center md:gap-4">
          <input
            type="text"
            placeholder="Widget Name"
            className="border p-2 mb-2 md:mb-0 w-full md:w-1/3 rounded-lg"
            value={newWidgetName}
            onChange={(e) => setNewWidgetName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Widget Text"
            className="border p-2 mb-2 md:mb-0 w-full md:w-1/3 rounded-lg"
            value={newWidgetText}
            onChange={(e) => setNewWidgetText(e.target.value)}
          />
          <select
            className="border p-2 mb-2 md:mb-0 w-full md:w-1/3 rounded-lg"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg w-full md:w-auto mt-2 md:mt-0">
            Add Widget
          </button>
        </div>
      </form>
      {filteredCategories.map(category => {
        // Calculate the progress for each category
        const categoryWidgetCount = category.widgets.length;
        const progress = totalWidgetsCount === 0 ? 0 : (categoryWidgetCount / totalWidgetsCount) * 100;

        return (
          <div key={category.id} className="mb-6 border p-4 rounded-lg bg-white shadow-md">
            <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
            <div className="flex justify-center mb-4">
              <ProgressBar progress={progress} /> {/* Render the CircularProgressBar */}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {category.widgets.map(widget => (
                <div key={widget.id} className="bg-white p-4 rounded-lg shadow">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-lg">{widget.name}</h3>
                    <button
                      onClick={() => handleRemoveWidget(category.id, widget.id)}
                      className="text-red-500 text-xl"
                    >
                      ×
                    </button>
                  </div>
                  <p>{widget.text}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
