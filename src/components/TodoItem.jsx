import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaToggleOn, FaToggleOff, FaTrash, FaCheck, FaTimes, FaPencilAlt } from 'react-icons/fa';
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FiEdit } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { updateTodo, removeTodo, markCompleted, markIncomplete } from '../redux/action';

const TodoItem = ({ todo, index }) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleDelete = () => {
    if (editMode) {
      // If in edit mode, cancel editing and exit edit mode
      setEditMode(false);
    } else {
      dispatch(removeTodo(index));
      toast.success('Successfully deleted task!', {
        duration: 3500,
      });
    }
  };

  const handleUpdate = () => {
    dispatch(updateTodo(index, editedText));
    setEditMode(false);
    toast.success('Successfully updated task!', {
      duration: 3500,
    });
  };

  return (
<li className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-orange-200 py-2 gap-4">
      <div className="flex items-center">
        <span className="mr-4 text-gray-500">{index + 1}.</span>
        {editMode ? (
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="mr-4"
          />
        ) : (
          <span className={`mr-4 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
            {todo.text}
          </span>
        )}
      </div>
      <div className="space-x-3 ml-8">
        {editMode ? (
          <button
            className="mr-2 text-sm bg-green-500 text-white sm:px-2 px-1 py-1 rounded"
            onClick={handleUpdate}
          >
            <IoCheckmarkDoneSharp/>
          </button>
        ) : (
          <button
            className="mr-2 text-sm bg-orange-500 text-white sm:px-2 px-1 py-1 rounded"
            onClick={() => setEditMode(true)}
          >
            <FiEdit/>
          </button>
        )}
        <button
          className="mr-2 text-sm bg-red-500 text-white sm:px-2 px-1 py-1 rounded"
          onClick={handleDelete}
        >
          <FaTrash />
        </button>
        {!todo.completed && (
          <button
            className="text-sm bg-green-500 text-white sm:px-2 px-1 py-1 rounded"
            onClick={() => dispatch(markCompleted(index))}
          >
            <FaCheck />
          </button>
        )}
        {todo.completed && (
          <button
            className="text-sm bg-yellow-500 text-white sm:px-2 px-1 py-1 rounded"
            onClick={() => dispatch(markIncomplete(index))}
          >
            <FaTimes />
          </button>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
