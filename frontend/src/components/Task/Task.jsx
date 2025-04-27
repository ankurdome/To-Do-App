import React from 'react';
import moment from 'moment';
import "./task.css";
import { useContext } from 'react';
import TaskContext from '../../context/TaskContext';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

function Task({ task, id }) {
    const { dispatch } = useContext(TaskContext);

    const handleRemove = (e) => {
        e.preventDefault();
        dispatch({
            type: "REMOVE_TASK",
            id
        })
    }

    const handleMarkDone = (e) => {
        dispatch({
            type: "MARK_DONE",
            id
        })
    }

    return (
        <div className={`bg-white rounded-xl shadow-lg p-4 mb-4 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${task.completed ? 'border-l-4 border-green-500' : 'border-l-4 border-blue-500'}`}>
            <div className="flex items-center gap-4">
                <button 
                    onClick={handleMarkDone}
                    className="flex-shrink-0 focus:outline-none"
                >
                    {task.completed ? (
                        <CheckCircleIcon className="text-green-500 hover:text-green-600 transition-colors" />
                    ) : (
                        <RadioButtonUncheckedIcon className="text-blue-500 hover:text-blue-600 transition-colors" />
                    )}
                </button>
                
                <div className="flex-grow">
                    <h4 className={`text-lg font-medium capitalize mb-1 ${task.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                        {task.title}
                    </h4>
                    <p className={`text-sm mb-2 ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                        {task.description}
                    </p>
                    <div className="text-xs text-gray-400 italic">
                        {task?.createdAt ? moment(task.createdAt).fromNow() : 'just now'}
                    </div>
                </div>

                <button
                    onClick={handleRemove}
                    className="flex-shrink-0 p-2 rounded-full hover:bg-red-50 transition-colors group focus:outline-none"
                >
                    <DeleteIcon className="text-red-400 group-hover:text-red-500 transition-colors" />
                </button>
            </div>
        </div>
    );
}

export default Task;