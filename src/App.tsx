import React, { useState, useEffect } from 'react';
import './App.css';

import {Header, Tasklist, TaskForm} from './components';
import {Task} from './components/types'

const App = () => {
  // const getTasksFromLocalStorage = (): Task[] => {
  //   const tasks = localStorage.getItem('tasks');
  //   if (tasks) {
  //     return JSON.parse(tasks);
  //   } else {
  //     return [];
  //   }
  // };

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://mern-task-cbdevapp-api.onrender.com/api/tasks');
        if (response.ok) {
          const tasks = await response.json();
          setTasks(tasks);
        } else {
          throw new Error(`Failed to fetch tasks: ${response.statusText}`);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchTasks();
  }, [tasks]);

  const handleAddTask = async (title: string) => {
    console.log('title:', title); // add this line
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false
    }
  
    try {
      const response = await fetch('https://mern-task-cbdevapp-api.onrender.com/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
      });
  
      if (response.ok) {
        const savedTask = await response.json();
        setTasks([...tasks, savedTask]);
      } else {
        throw new Error(`Failed to save task: ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  
  

  const handleDeleteTask = async (id: number) => {
    try {
      const response = await fetch(`https://mern-task-cbdevapp-api.onrender.com/api/tasks/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        setTasks(updatedTasks);
      } else {
        throw new Error(`Failed to delete task: ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  const toggleComplete = async (id: number) => {
    const taskToUpdate = tasks.find((task) => task.id === id);
    if (!taskToUpdate) return;
  
    const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
  
    try {
      const response = await fetch(`https://mern-task-cbdevapp-api.onrender.com/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTask)
      });
  
      if (response.ok) {
        const updatedTasks = tasks.map((task) =>
          task.id === id ? updatedTask : task
        );
        setTasks(updatedTasks);
      } else {
        throw new Error(`Failed to update task: ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
    }
  }
  

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center py-4 bg-teal-100">
        <Header />
        <Tasklist tasks={tasks} onDelete={handleDeleteTask} onToggle={toggleComplete} />
        <TaskForm onAdd={handleAddTask} />
    </div>
  );
}

export default App;
