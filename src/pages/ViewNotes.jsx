
import { useState, useEffect } from "react";
import NoteCard from "../components/NoteCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes } from "../store/notes/notesSlice";
import { StickyNote } from "lucide-react";
import { Link } from "react-router-dom";

function ViewNotes() {
  const dispatch = useDispatch();
  const { notes = [], error, status } = useSelector((state) => state.notes);
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState(null);

  const loadNotes = async () => {
    setLoading(true);
    try {
      await dispatch(fetchNotes()).unwrap();
      setLocalError(null);
    } catch (err) {
      setLocalError("Failed to load notes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
    // eslint-disable-next-line
  }, []);

  if (error || localError) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-4">{error || localError}</p>
        <button
          onClick={loadNotes}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!notes || notes.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="flex justify-center mb-4 text-yellow-400">
          <StickyNote size={64} />
        </div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          No Notes Yet
        </h2>
        <p className="text-gray-500 mb-6">
          Create your first note to get started
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
        >
          Create a Note
        </Link>
      </div>
    );
  }
    
    return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Your Notes</h1>
        <p className="text-gray-600">
          {notes.length} {notes.length === 1 ? "note" : "notes"} stored
        </p>
      </div>
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
    </div>
  );
}

export default ViewNotes;
