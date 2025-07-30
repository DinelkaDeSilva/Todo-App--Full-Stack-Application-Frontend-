import React from 'react';
import TaskCard from '../TaskCard/TaskCard';
import './TaskList.css';

const TaskList = ({ tasks, onTaskComplete, isLoading }) => {
  if (isLoading) {
    return (
      <div className="task-list-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="task-list-container">
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h3>No tasks yet!</h3>
          <p>Add your first task to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="task-list-container">
      <h2 className="task-list-title">Recent Tasks</h2>
      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onComplete={onTaskComplete}
          />
        ))}
      </div>
      {tasks.length === 5 && (
        <p className="task-limit-note">
          Showing your 5 most recent tasks
        </p>
      )}
    </div>
  );
};

export default TaskList;