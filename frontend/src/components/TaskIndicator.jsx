import React from 'react';
import { NavLink } from 'react-router-dom';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';

function TaskIndicator() {
    const navLinkClasses = ({ isActive }) => 
        `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
            isActive 
                ? 'bg-indigo-500 text-white shadow-lg' 
                : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-500'
        }`;

    return (
        <div className="flex-grow bg-white rounded-xl shadow-lg p-2">
            <nav>
                <ul className="flex justify-between items-center">
                    <li>
                        <NavLink to="/" className={navLinkClasses}>
                            <ListAltIcon />
                            <span>All Tasks</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/active" className={navLinkClasses}>
                            <PlaylistPlayIcon />
                            <span>Active</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/completed" className={navLinkClasses}>
                            <PlaylistAddCheckIcon />
                            <span>Completed</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default TaskIndicator;