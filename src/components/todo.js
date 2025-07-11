import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { format } from 'date-fns';

const Todo = ({task, toggleComplete, deleteTodo, editTodo}) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff4757';
      case 'medium': return '#ffa502';
      case 'low': return '#2ed573';
      default: return '#ffa502';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'work': return '#3742fa';
      case 'personal': return '#ff6b6b';
      case 'shopping': return '#ff9ff3';
      case 'health': return '#10ac84';
      case 'study': return '#feca57';
      default: return '#54a0ff';
    }
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <div className={`Todo ${isOverdue ? 'overdue' : ''}`}>
      <div className="todo-content">
        <div className="todo-main">
          <p 
            onClick={() => toggleComplete(task.id)} 
            className={`${task.completed ? 'completed' : 'incompleted'}`}
          >
            {task.task}
          </p>
          
          <div className="todo-meta">
            {task.priority && (
              <span 
                className="priority-badge"
                style={{ backgroundColor: getPriorityColor(task.priority) }}
              >
                {task.priority}
              </span>
            )}
            
            {task.category && (
              <span 
                className="category-badge"
                style={{ backgroundColor: getCategoryColor(task.category) }}
              >
                {task.category}
              </span>
            )}
            
            {task.dueDate && (
              <span className={`due-date ${isOverdue ? 'overdue' : ''}`}>
                {format(new Date(task.dueDate), 'MMM dd')}
              </span>
            )}
          </div>
        </div>
        
        <div className="todo-actions">
          <FontAwesomeIcon 
            icon={faPenToSquare}
            className="edit-icon"
            onClick={() => editTodo(task.id)}
          />
          <FontAwesomeIcon 
            icon={faTrash} 
            className="delete-icon"
            onClick={() => deleteTodo(task.id)}
          />
        </div>
      </div>
      
      {task.notes && (
        <div className="todo-notes">
          <p>{task.notes}</p>
        </div>
      )}
    </div>
  )
}

export default Todo