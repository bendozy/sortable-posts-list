import React from 'react';
import PostList from './PostList';
import ActionList from './ActionList';

const Dashboard = () => (
  <div className="Dashboard container flex flex-wrap my-10 px-5">
    <div className="w-full md:w-1/2 px-8">
      <PostList />
    </div>
    <div className="w-full md:w-1/2 px-8">
      <ActionList />
    </div>
  </div>
);

export default Dashboard;
