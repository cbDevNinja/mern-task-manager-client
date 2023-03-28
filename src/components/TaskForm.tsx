import React, { useState } from 'react';

type TaskFormProps = {
    onAdd: (text: string) => void;
}

const TaskForm = ({ onAdd }: TaskFormProps) => {
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onAdd(text);
        setText('');
    }

    return (
        <div className='flex items-center justify-center w-full'>
            <form className='flex items-center p-6 m-4 w-full lg:w-3/4 lg:max-w-lg'  onSubmit={handleSubmit}>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-900' placeholder='Add Todo' type="text" value={text} onChange={(e) => setText(e.target.value)} id="taskname" name="taskname"/>
                <button className='shrink-0 p-2 border-2 rounded text-teal-400 border-teal-400 hover:text-white hover:bg-teal-400' type="submit">Add Task</button>
            </form>
        </div>
    )
}

export {TaskForm};