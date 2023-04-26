import './App.css';
import { useState } from 'react';
export default function App() {
  const [tasks, setTasks] = useState([]);

  function onRemoveTask(taskToRemove) {
    const newTasks = tasks.filter((task) => {
      return task !== taskToRemove;
    });
    setTasks(newTasks);
  }
  //this function for submit the task
  function onSubmit(event) {
    event.preventDefault(); //it prevent default value
    const form = event.target; //target the input 
    const input = form.task;//target the value using name of task
    const newTasks = [...tasks, input.value];// array which store all the values
    setTasks(newTasks); // set the newTasks in the list
    form.reset(); //we reset the input for next task
  }
  return (
    <div className="main">
      <div className='App'>
        <h1>MY Todo List</h1>
        <h1>MY Todo List</h1>
      </div>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          name='task'
          placeholder='Add the Tasks'
          required
        />
        <button>Add.</button>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <Task onRemoveTask={onRemoveTask} key={task + index} task={task} />
        ))}
      </ul>
    </div>
  );
}
function Task({ task, onRemoveTask }) {
  return (
    <li>
      {task}
      <button className="delete" onClick={() => onRemoveTask(task)}>
        x
      </button>
    </li>
  );
}