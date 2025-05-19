import React, { useState } from "react";
import "../../styles/index.css";
import { FaTrash } from "react-icons/fa";

function Todo() {
    const [inputText, setInputText] = useState("");
    const [items, setItems] = useState([]);

    function handleChange(event) {
        const newValue = event.target.value;
        setInputText(newValue);
    }

    function addItem() {
        setItems((prevItems) => {
            return [...prevItems, inputText];
        });
        setInputText("");
    }

    function handleKey(event) {
        if (event.key === "Enter") {
            addItem();
        }
    }

    function removeItem(index) {
        setItems((prevItems) => {
            return prevItems.filter((item, i) => i !== index);
        });
    }

    return (
        <div className="todo-container">
            <h3 className="todo-header">Todo List</h3>
            <div className="todo-input-container">
                <input
                    onChange={handleChange}
                    onKeyDown={handleKey} 
                    type="text"
                    placeholder="Type your todos"
                    value={inputText}
                    className="todo-input"
                />
                <button onClick={addItem} type="submit" className="todo-button">
                    Add 
                </button>
            </div>
           <ul className="todo-list">
            {items.length === 0 ? (
                <li className="no-tasks-message">No tasks, add a task</li>
            ) : (
                items.map((item, index) => (
                    <li key={index} className="todo-item">
                        {item}
                        <button
                            onClick={() => removeItem(index)}
                            className="remove-button"
                        >
                           <FaTrash/>
                        </button>
                    </li>
                ))
            )}
        </ul>
        </div>
    );
}

export default Todo;