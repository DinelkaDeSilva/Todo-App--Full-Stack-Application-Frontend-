import React, { useState, useEffect } from 'react';
import AddTask from './components/AddTask/AddTask';
import TaskList from './components/TaskList/TaskList';
import { taskService } from './services/apiService';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const tasksData = await taskService.getTasks();
      setTasks(tasksData);
    } catch (error) {
      console.error('Error loading tasks:', error);
      setError('Failed to load tasks. Please check if the backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTaskAdded = async (taskData) => {
    try {
      const newTask = await taskService.createTask(taskData);
      // Reload tasks to ensure we have the most recent 5
      await loadTasks();
      return newTask;
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  };

  const handleTaskComplete = async (taskId) => {
    try {
      await taskService.completeTask(taskId);
      // Remove completed task from the list immediately
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error completing task:', error);
      
    }
  };

  return (
    <div className="app">
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">Todo App</h1>
          <p className="app-subtitle">Stay organized and get things done</p>
        </header>

        {error && (
          <div className="error-banner">
            <span className="error-icon"></span>
            {error}
            <button onClick={loadTasks} className="retry-button">
              Retry
            </button>
          </div>
        )}

        <main className="app-main">
          <div className="app-grid">
            <div className="add-task-section">
              <AddTask onTaskAdded={handleTaskAdded} />
            </div>
            
            <div className="task-list-section">
              <TaskList
                tasks={tasks}
                onTaskComplete={handleTaskComplete}
                isLoading={isLoading}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;