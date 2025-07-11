import React, {useState, useEffect} from 'react'
import Todoform from './todoform'
import {v4 as uuidv4} from 'uuid';
import Todo from './todo';
import EditTodoform from './todoedit';

uuidv4();

const Todowrapper = () => {
    const [todos, setTodos] = useState([])
    const [filter, setFilter] = useState('all') // all, active, completed
    const [searchTerm, setSearchTerm] = useState('')

    // Load todos from localStorage on component mount
    useEffect(() => {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        }
    }, []);

    // Save todos to localStorage whenever todos change
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (todoData) => {
        const newTodo = {
            id: uuidv4(),
            task: todoData.task,
            completed: false,
            isEditing: false,
            priority: todoData.priority || 'medium',
            category: todoData.category || 'personal',
            dueDate: todoData.dueDate || null,
            createdAt: new Date().toISOString(),
            notes: todoData.notes || ''
        }
        setTodos([...todos, newTodo])
    }

    const toggleComplete = id => {
        setTodos(todos.map(todo => todo.id === id ?
            { ...todo, completed: !todo.completed } : todo
        ))
    }

    const deleteTodo = id => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const editTodo = id => {
        setTodos(todos.map(todo => todo.id === id ? {
            ...todo, isEditing: !todo.isEditing
        } : todo))
    }

    const updateTodo = (newValue, id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, task: newValue, isEditing: false } : todo
        ));
    }

    const cancelEdit = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, isEditing: false } : todo
        ));
    }

    const clearCompleted = () => {
        setTodos(todos.filter(todo => !todo.completed));
    };

    const toggleAll = () => {
        const allCompleted = todos.every(todo => todo.completed);
        setTodos(todos.map(todo => ({ ...todo, completed: !allCompleted })));
    };

    // Filter and sort todos
    const filteredAndSortedTodos = todos
        .filter(todo => {
            if (filter === 'active') return !todo.completed;
            if (filter === 'completed') return todo.completed;
            return true;
        })
        .filter(todo => 
            todo.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
            todo.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            // Sort by creation date (newest first)
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

    const stats = {
        total: todos.length,
        completed: todos.filter(todo => todo.completed).length,
        active: todos.filter(todo => !todo.completed).length,
        overdue: todos.filter(todo => 
            !todo.completed && 
            todo.dueDate && 
            new Date(todo.dueDate) < new Date()
        ).length
    };

    return (
        <div className='todowrapper'>
            <h1>Get Things Done!</h1>
            
            {/* Stats */}
            <div className="stats">
                <div className="stat-item">
                    <span className="stat-number">{stats.total}</span>
                    <span className="stat-label">Total</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">{stats.active}</span>
                    <span className="stat-label">Active</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">{stats.completed}</span>
                    <span className="stat-label">Completed</span>
                </div>
                {stats.overdue > 0 && (
                    <div className="stat-item overdue">
                        <span className="stat-number">{stats.overdue}</span>
                        <span className="stat-label">Overdue</span>
                    </div>
                )}
            </div>

            <Todoform addTodo={addTodo} />
            
            {/* Search and Filter Controls */}
            <div className="controls">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
                
                <div className="filter-controls">
                    <select 
                        value={filter} 
                        onChange={(e) => setFilter(e.target.value)}
                        className="filter-select"
                    >
                        <option value="all">All Tasks</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
            </div>

            {/* Bulk Actions */}
            {todos.length > 0 && (
                <div className="bulk-actions">
                    <button onClick={toggleAll} className="bulk-btn">
                        {todos.every(todo => todo.completed) ? 'Uncheck All' : 'Check All'}
                    </button>
                    <button onClick={clearCompleted} className="bulk-btn">
                        Clear Completed
                    </button>
                </div>
            )}

            {/* Todo List */}
            {filteredAndSortedTodos.map((todo) => (
                todo.isEditing ? (
                    <EditTodoform
                        editTodo={updateTodo}
                        cancelEdit={cancelEdit}
                        task={todo}
                        key={todo.id}
                    />
                ) : (
                    <Todo
                        task={todo}
                        key={todo.id}
                        toggleComplete={toggleComplete}
                        deleteTodo={deleteTodo}
                        editTodo={editTodo}
                    />
                )
            ))}

            {/* Empty State */}
            {filteredAndSortedTodos.length === 0 && todos.length > 0 && (
                <div className="empty-state">
                    <p>No tasks match your current filter.</p>
                </div>
            )}

            {todos.length === 0 && (
                <div className="empty-state">
                    <p>No tasks yet. Add your first task above!</p>
                </div>
            )}
        </div>
    )
}

export default Todowrapper