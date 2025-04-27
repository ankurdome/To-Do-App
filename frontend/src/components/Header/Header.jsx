import React from 'react';
import { useContext } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import TokenContext from '../../context/TokenContext.js';
import "./header.css";
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

function Header() {
    const token = localStorage.getItem("authToken");
    const { user } = useContext(TokenContext);

    const logout = () => {
        localStorage.removeItem("authToken");
        window.location.href = "/login";
    }

    return (
        <div>
            <nav className='bg-white border-b border-slate-200'>
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center">
                            <NavLink to="/" className="flex items-center gap-3">
                                <div className="bg-slate-800 p-2 rounded-lg">
                                    <NoteAltOutlinedIcon className="text-white" sx={{ fontSize: 24 }} />
                                </div>
                                <div>
                                    <h1 className="text-xl font-semibold text-slate-800">
                                        Ankur's iNotes
                                    </h1>
                                </div>
                            </NavLink>
                        </div>

                        <div className='flex items-center gap-6'>
                            {token ? (
                                <div className='flex items-center gap-4'>
                                    <div className="flex items-center gap-3">
                                        <AccountCircleIcon className="text-slate-600" />
                                        <span className="text-slate-600">
                                            Welcome, <span className="font-medium text-slate-800 capitalize">{user.name}</span>
                                        </span>
                                    </div>
                                    <button 
                                        onClick={logout} 
                                        className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                    >
                                        <LogoutIcon />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <NavLink 
                                        to="/login"
                                        className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
                                    >
                                        Login
                                    </NavLink>
                                    <NavLink 
                                        to="/register"
                                        className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
                                    >
                                        Register
                                    </NavLink>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Outlet />
            </main>
        </div>
    );
}

export default Header;