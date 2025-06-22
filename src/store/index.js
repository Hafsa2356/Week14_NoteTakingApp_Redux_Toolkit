import { configureStore } from '@reduxjs/toolkit';

// Import your reducers here, for example:

import notesReducer from '../features/notes/notesSlice';

const store = configureStore({
  reducer: {
  notes: notesReducer,
  },
});

export default store;
