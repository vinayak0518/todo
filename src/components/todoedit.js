import React, {useState, useEffect} from 'react'

const EditTodoform = ({editTodo, cancelEdit, task}) => {
    const [value, setValue] = useState(task ? task.task : "");
    
    useEffect(() => {
        if (task) {
            setValue(task.task);
        }
    }, [task]);

    const handleSubmit = e => {
        e.preventDefault();
        if (task && task.id !== undefined && value.trim()) {
            editTodo(value, task.id);
        }
    };

    const handleCancel = () => {
        if (task && task.id !== undefined) {
            cancelEdit(task.id);
        }
    };

    return (
        <div className='EditTodoForm'>
            <form onSubmit={handleSubmit}>
                <div className="edit-form-content">
                    <input 
                        type='text' 
                        className='edit-input' 
                        value={value} 
                        placeholder='Update task' 
                        onChange={(e) => setValue(e.target.value)}
                        autoFocus
                    />
                    <div className="edit-actions">
                        <button type='submit' className='edit-btn save'>Save</button>
                        <button type='button' className='edit-btn cancel' onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditTodoform