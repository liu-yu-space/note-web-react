import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-4">404</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">页面未找到</p>
            <Link
                to="/"
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
            >
                返回首页
            </Link>
        </div>
    );
};

export default NotFound;
