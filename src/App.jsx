import React from "react";
import { useState, useEffect } from "react";

import { Pencil, Trash2, Plus } from "lucide-react";
import { db } from "./firebase.js";
import { collection, onSnapshot } from "firebase/firestore";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, seteditIndex] = useState(-1);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "todos"), (snapshot) => {
      setTodos(
        snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
      );
    });

    return () => unsubscribe();
  }, []);

  const setEdit = (index) => {
    setInput(todos[index].todo);
    seteditIndex(index);
  };

  const addTodo = async () => {
    try {
      if (input.trim() !== "") {
        setTodos([...todos, { id: new Date(), todo: input }]);
        setInput("");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const updateTodo = async () => {
    try {
      if (input.trim() !== "") {
        const updatedTodos = [...todos];
        updatedTodos[editIndex].todo = input;
        setTodos(updatedTodos);
        seteditIndex(-1);
        setInput("");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const removeTodo = async (id) => {
    let filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4">
      <div className="bg-gradient-to-b from-violet-300 to-violet-500 p-6 rounded shadow-md w-full max-w-lg lg:w-1/4">
        <h1 className="text-3xl font-bold text-center text-white mb-4">Todo App</h1>
        <div className="flex">
          <input
            type="text"
            placeholder="Add a todo"
            className="py-2 px-4 border rounded-md w-full mr-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800"
            onClick={editIndex === -1 ? addTodo : updateTodo}
          >
            {editIndex === -1 ? <Plus size={21} /> : <Pencil size={21} />}
          </button>
        </div>
      </div>
      {todos.length > 0 && (
        <div className="bg-gradient-to-b from-violet-300 to-violet-500 p-6 rounded shadow-md w-full max-w-lg lg:w-1/4 transition-all">
          <ul>
            {todos.map((todo, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-white p-3 rounded shadow-md  mb-3"
              >
                <span className="text-lg">{todo.todo}</span>
                <div>
                  <button
                    className="mr-2 text-blue-700 p-2 rounded-md hover:bg-gray-100"
                    onClick={() => setEdit(index)}
                  >
                    <Pencil size={21} />
                  </button>
                  <button
                    className="text-red-700 p-2 rounded-md hover:bg-gray-100"
                    onClick={() => removeTodo(todo.id)}
                  >
                    <Trash2 size={21} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
