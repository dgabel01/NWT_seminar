import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoList from './TodoList';
import FilterButtons from './FilterButtons';
import { BsSearch, BsPlus } from 'react-icons/bs';
import { addTodo, updateSearchTerm } from '../redux/action';
import { toast } from 'react-hot-toast';

const Todo = () => {
  const todos = useSelector((state) => state.todos);    //extract todos and filters from the store
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();                       //dispatch actions to the store
  const [newTodoText, setNewTodoText] = useState('');  //local state
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddTodo = (text) => {               //dispatch add new task action
    dispatch(addTodo(text));
  };

  const handleAddTodoClick = () => {             //when the add button is clicked, check that text isn't empty and dispatch the add ction 
    if (newTodoText.trim() !== '') {         
      handleAddTodo(newTodoText.trim());
      setNewTodoText('');
      toast.success("Task added sucessfully!",{
        duration:3500,
      })
    
    }
    else{
      toast.error("No text provided!",{
        duration:3500
      })
    }
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);                     //on input, set state and dispatch the action to update the search term
    dispatch(updateSearchTerm(value));
  };

  return (
    <div className="max-w-4xl mx-auto sm:mt-8 p-4 bg-stone-100 rounded-lg">
      <h2 className='mt-3 mb-6 text-2xl font-bold text-center'>Personal ToDo List</h2>
      <div className="flex items-center mb-4">
        <input
          id="addTodoInput"
          className="flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Add A Task"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
        />
        <button
          className="ml-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          onClick={handleAddTodoClick}
        >
          <BsPlus size={20} />
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <FilterButtons />
        <div className="flex items-center mb-4">
          <input
            className="flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Search Todos"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          <button className="ml-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">
            <BsSearch size={20} />
          </button>
        </div>
      </div>

      <TodoList />
    </div>
  );
};

export default Todo;