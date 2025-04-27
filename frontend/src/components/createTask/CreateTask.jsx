import React, { useState, useContext } from 'react';
import TaskContext from '../../context/TaskContext';
import TokenContext from '../../context/TokenContext';
import axios from "../../Axios/axios.js";
import EditNoteIcon from '@mui/icons-material/EditNote';
import TitleIcon from '@mui/icons-material/Title';
import DescriptionIcon from '@mui/icons-material/Description';
import AddIcon from '@mui/icons-material/Add';

function CreateTask() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const { dispatch } = useContext(TaskContext);
    const { userToken } = useContext(TokenContext);

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/task/addTask", { title, description }, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            dispatch({ type: "ADD_TASK", payload: res.data });
            setTitle("");
            setDescription("");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
                <EditNoteIcon className="text-purple-600" sx={{ fontSize: 28 }} />
                <h2 className="text-xl font-semibold text-gray-800">New Note</h2>
            </div>
            
            <form onSubmit={handleAdd} className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="title" className="flex items-center gap-2 text-sm font-medium text-gray-600">
                        <TitleIcon className="text-gray-400" fontSize="small" />
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={title}
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                        placeholder="What's on your mind?"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="description" className="flex items-center gap-2 text-sm font-medium text-gray-600">
                        <DescriptionIcon className="text-gray-400" fontSize="small" />
                        Description
                    </label>
                    <textarea
                        rows={5}
                        name="description"
                        id="description"
                        value={description}
                        required
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                        placeholder="Add more details..."
                        style={{ resize: "none" }}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                    <AddIcon />
                    <span>Add Note</span>
                </button>
            </form>
        </div>
    );
}

export default CreateTask;