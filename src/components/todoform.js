import React, {useState} from 'react'

const Todoform = ({addTodo}) => {
    const [value, setValue] = useState("")
    const [priority, setPriority] = useState("medium")
    const [category, setCategory] = useState("personal")

    const handleSubmit = e => {
        e.preventDefault();
        if (value.trim()) {
            addTodo({
                task: value,
                priority: priority,
                category: category,
                dueDate: null,
                notes: ''
            })
            setValue("")
            setPriority("medium")
            setCategory("personal")
        }
    }

    return (
        <form className='TodoForm' onSubmit={handleSubmit}>
            <div className="form-main">
                <input 
                    type='text' 
                    className='todo-input' 
                    value={value} 
                    placeholder='What is the task today?' 
                    onChange={(e) => setValue(e.target.value)}
                    required
                />
                <button type='submit' className='todo-btn'>Add Task</button>
            </div>
            
            <div className="form-options">
                <div className="option-group">
                    <label>Priority:</label>
                    <select 
                        value={priority} 
                        onChange={(e) => setPriority(e.target.value)}
                        className="option-select"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                
                <div className="option-group">
                    <label>Category:</label>
                    <select 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)}
                        className="option-select"
                    >
                        <option value="personal">Personal</option>
                        <option value="work">Work</option>
                        <option value="shopping">Shopping</option>
                        <option value="health">Health</option>
                        <option value="study">Study</option>
                    </select>
                </div>
            </div>
        </form>
    )
}

export default Todoform