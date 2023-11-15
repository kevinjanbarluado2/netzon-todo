import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

interface TodoItem {
    text: string;
    deadline: string; // Change the type to string
    isDone: boolean;
    dateCompleted?: string; // Add the dateCompleted field
}

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [newTodo, setNewTodo] = useState('');
    const [newDeadline, setNewDeadline] = useState<string | null>(null);
    const [showInputs, setShowInputes] = useState<boolean>(true)
    const validate = newTodo.trim() !== '' && newDeadline !== null;

    // Load todos from localStorage on component mount
    useEffect(() => {
        try {
            const storedTodos = localStorage.getItem('todos');
            console.log(storedTodos)
            if (storedTodos) {
                setTodos(JSON.parse(storedTodos));
            }
        } catch (error) {
            console.error('Error loading todos from local storage:', error);
        }
    }, []);

    const handleAddTodo = () => {
        if (newTodo && newDeadline) {
            const updatedTodos = [
                ...todos,
                { text: newTodo, deadline: newDeadline, isDone: false },
            ];
            setTodos(updatedTodos);

            try {
                localStorage.setItem('todos', JSON.stringify(updatedTodos));
                setNewTodo('');
                setNewDeadline(null);
            } catch (error) {
                console.error('Error saving todos to local storage:', error);
            }
        }
    };

    const handleToggleTodo = (index: number) => {
        const updatedTodos = [...todos];
        const _date = new Date();

        updatedTodos[index].isDone = !updatedTodos[index].isDone;
        updatedTodos[index].dateCompleted = updatedTodos[index].isDone ? _date.toISOString() : undefined;
        setTodos(updatedTodos);

        try {
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
        } catch (error) {
            console.error('Error saving todos to local storage:', error);
        }
    };

    const handleDeleteTodo = (index: number) => {
        const updatedTodos = [...todos];

        if (window.confirm("Are you sure you want to delete this item?")) {
            try {
                updatedTodos.splice(index, 1);
                setTodos(updatedTodos);

                localStorage.setItem('todos', JSON.stringify(updatedTodos));
            } catch (error) {
                console.error('Error saving todos to local storage:', error);
            }
        }
    };

    return (
        <div className="col-lg-6 col-md-8 col-sm-12 col-xs-12 ">
            <div className="card shadow">
                <div className="card-body d-flex flex-column gap-3">
                    <div className='d-flex d-flex justify-content-between'>
                        <h5 className="card-title">Enter new todo</h5>
                        <div className="form-check form-switch">
                            <input
                                onChange={() => setShowInputes((prev) => !prev)}
                                className="form-check-input" type="checkbox" defaultChecked={showInputs} />
                            <label className="form-check-label">{showInputs ? 'Show' : 'Hide'}</label>
                        </div>
                    </div>
                    {showInputs ? <>
                        <input
                            type="text"
                            placeholder="New Todo"
                            className='form-control'
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                        />
                        <DatePicker
                            selected={newDeadline ? new Date(newDeadline) : null}
                            onChange={(date: Date | null) => setNewDeadline(date?.toISOString() || null)}
                            dateFormat="MMMM d, yyyy"
                            placeholderText="Select a deadline"
                            className='form-control'
                        />
                        <button className={`btn bg-gradient ${validate ? 'btn-primary' : 'btn-secondary'}`} disabled={!validate} onClick={handleAddTodo}>Add Todo</button>
                        <p className="card-text">Fill inputs first before adding.</p>
                    </> : <></>}

                </div>
            </div>

            {todos.sort((a, b) => (a.isDone === b.isDone ? 0 : a.isDone ? 1 : -1)).map((todo, index) => (
                <Todo
                    key={index}
                    text={todo.text}
                    deadline={todo.deadline}
                    isDone={todo.isDone}
                    dateCompleted={todo.dateCompleted}
                    onToggle={() => handleToggleTodo(index)}
                    onDelete={() => handleDeleteTodo(index)} // Pass onDelete function
                />
            ))}
        </div>
    );
};

export default TodoList;
