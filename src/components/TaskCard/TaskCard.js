import React from 'react';
import './TaskCard.css';

const TaskCard = ({ task, onComplete }) => {
  const handleComplete = () => {
    onComplete(task.id);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="task-card">
      <div className="task-content">
        <h3 className="task-title">{task.title}</h3>
        <p className="task-description">{task.description}</p>
        <span className="task-date">{formatDate(task.createdAt)}</span>
      </div>
      <button 
        className="done-button"
        onClick={handleComplete}
        aria-label={`Mark ${task.title} as done`}
      >
        Done
      </button>
    </div>
  );
};

export default TaskCard;