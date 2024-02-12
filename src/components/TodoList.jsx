import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const filteredTodos = useSelector((state) => {    //render todos(each is a component) based on the state from redux store
    const todos = state.todos;                      //import (current) state from redux
    const filter = state.filter;  
    const searchTerm = state.searchTerm.toLowerCase(); // Convert search term to lowercase for case-insensitive search

    return todos.filter((todo) => {   //checks whether the todo matches the current filter from the store
      const matchesFilter = (filter === 'COMPLETED' && todo.completed) ||
        (filter === 'INCOMPLETE' && !todo.completed) ||
        filter === 'ALL';

      const matchesSearch = todo.text.toLowerCase().includes(searchTerm);

      return matchesFilter && matchesSearch;    //todos that match filter and search are added to filteredTodos
    });
  });

  //console.log('Filtered Todos:', filteredTodos);

  return (
    <ul>
     {filteredTodos.length > 0 ? (
        filteredTodos.map((todo,index) => (
          <TodoItem key={index} todo={todo} index={index} />
        ))
     ) : (
        <p className="mt-4 text-md">No todos added.</p>
     )}
    </ul>
  );
};

export default TodoList;

