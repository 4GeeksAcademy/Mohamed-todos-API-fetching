import React, { useState, useEffect } from "react";
import "../../styles/index.css";
import { FaTrash } from "react-icons/fa";

function App() {
    const [inputText, setInputText] = useState("");
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("https://playground.4geeks.com/todo/users/Mohamed", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then((body) => setItems(body.todos));
    }, []);

    const addTask = () => {
        if (!inputText.trim()) return;
        const newTask = { label: inputText.trim(), is_done: false };
        fetch("https://playground.4geeks.com/todo/todos/Mohamed", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask),
        })
            .then((res) => res.json())
            .then(() => {
                setInputText("");
                return fetch("https://playground.4geeks.com/todo/users/Mohamed", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
            })
            .then((res) => res.json())
            .then((data) => setItems(data.todos));
    };

    const deleteTask = (id) => {
        fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        })
            .then(() =>
                fetch("https://playground.4geeks.com/todo/users/Mohamed", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                })
            )
            .then((res) => res.json())
            .then((data) => setItems(data.todos));
    };

    const clearAllTasks = () => {
        const deletePromises = items.map((task) =>
            fetch(`https://playground.4geeks.com/todo/todos/${task.id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            })
        );
        Promise.all(deletePromises).then(() => {
            fetch("https://playground.4geeks.com/todo/users/Mohamed", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            })
                .then((res) => res.json())
                .then((data) => setItems(data.todos));
        });
    };

    const handleChange = (event) => setInputText(event.target.value);
    const handleKey = (event) => {
        if (event.key === "Enter") addTask();
    };

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
                <button onClick={addTask} type="submit" className="todo-button">
                    Add
                </button>
                <button onClick={clearAllTasks} className="todo-button">
                    Clear All
                </button>
            </div>
            <ul className="todo-list">
                {items.length === 0 ? (
                    <li className="no-tasks-message">No tasks, add a task</li>
                ) : (
                    items.map((item, index) => (
                        <li key={item.id || index} className="todo-item">
                            {item.label}
                            <button
                                onClick={() => deleteTask(item.id)}
                                className="remove-button"
                            >
                                <FaTrash />
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default App;