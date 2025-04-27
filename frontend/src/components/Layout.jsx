import React from 'react';
import TaskIndicator from './TaskIndicator';
import CreateTask from './createTask/CreateTask';
import { Outlet } from 'react-router-dom';

function Layout() {
    return (
        <div className="container mx-auto py-6">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Column - Create Task */}
                <div className="lg:w-1/3">
                    <div className="sticky top-6">
                        <CreateTask />
                    </div>
                </div>

                {/* Right Column - Task List */}
                <div className="lg:w-2/3">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        {/* Task Navigation */}
                        <div className="p-4 border-b border-gray-100">
                            <TaskIndicator />
                        </div>

                        {/* Task List */}
                        <div className="p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Layout;