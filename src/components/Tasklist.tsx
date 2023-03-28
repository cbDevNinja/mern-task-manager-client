import React from 'react'
import { Task } from './types';

type TaskListProps = {
    tasks: Task[];
    onDelete: (id: number) => void;
    onToggle: (id: number) => void;
}

const Tasklist = ({tasks, onDelete, onToggle}: TaskListProps) => {
    return (
        <div className='bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg'>
            <h2 className='text-lg font-bold mb-4'>Tasks</h2>
            <ul>
               {tasks.map((task) => (
                   <li key={task.id} className='flex mb-4 items-center'>
                        <span className={`w-full text-gray-900 ${task.completed ? 'line-through text-green-500': ''}`}>
                        {task.title}
                        </span>
                        {}
                        <button
                            onClick={() => onToggle(task.id)}
                            className={`shrink-0 p-2 ml-4 mr-2 border-2 rounded hover:text-white ${task.completed ? 'text-green-400 border-green-400 hover:bg-green-400' : 'text-gray-400 border-gray-400 hover:bg-gray-400'}`}>
                                { task.completed ? 'Done' : 'Not Done'}
                        </button>
                        <button
                            className="shrink-0 p-2 ml-2 border-2 rounded text-red-400 border-red-400 hover:text-white hover:bg-red-400"
                            onClick={() => onDelete(task.id)}>Delete</button>
                   </li>
               ))}
            </ul>
        </div>
    )
}

export {Tasklist};
