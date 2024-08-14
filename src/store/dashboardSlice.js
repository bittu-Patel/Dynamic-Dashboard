import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [
    {
      id: '1',
      name: 'CSPM Executive Dashboard',
      widgets: [
        { id: 'w1', name: 'Widget 1', text: 'Random text for Widget 1' },
        { id: 'w2', name: 'Widget 2', text: 'Random text for Widget 2' },
      ],
    },
    {
      id: '2',
      name: 'Security Metrics',
      widgets: [
        { id: 'w3', name: 'Widget 3', text: 'Random text for Widget 3' },
      ],
    },
  ],
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    addWidget: (state, action) => {
      const { categoryId, widget } = action.payload;
      const category = state.categories.find(c => c.id === categoryId);
      if (category) {
        category.widgets.push(widget);
      }
    },
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find(c => c.id === categoryId);
      if (category) {
        category.widgets = category.widgets.filter(w => w.id !== widgetId);
      }
    },
  },
});

export const { addWidget, removeWidget } = dashboardSlice.actions;
export default dashboardSlice.reducer;