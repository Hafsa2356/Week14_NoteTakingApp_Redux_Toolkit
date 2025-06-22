import{createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import notereducer from '../features/notes/notesSlice';
//set slice.while using createSlice
//setup initialState
const initialState = {
  notes: [],
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

const notesSlice = createSlice({
    name: "notes",
    initialState,
    extraReucer: (builder) => {
        builder
        .addCase(fetchNotes.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchNotes.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.notes = action.payload;
        })
        .addCase(fetchNotes.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    }
})
//setup Async fuction to used for API

//fetchNotes
export const fetchNotes = createAsyncThunk(
  'notes/fetchNotes',
  async () => {
    const response = await fetch('/api/notes')
    console.log("note slice", response.data)
    return response.data
  }
);
//addNote
export const addNote = createAsyncThunk(
  'notes/addNote',
  async (noteData) => {
    const response = await fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(noteData),
    });
    return response.data;
  }
);
//updateNote
export const updateNote = createAsyncThunk(
    'notes/updateNote',
    async ({ id, noteData }) => {
        const response = await fetch(`/api/notes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData),
        });
        return response.data;
    }

);
//deleteNote
export const deleteNote = createAsyncThunk(
    'notes/deleteNote',
    async (id) => {
        const response = await fetch(`/api/notes/${id}`, {
            method: 'DELETE',
        });
        return response.data;
    }
);
