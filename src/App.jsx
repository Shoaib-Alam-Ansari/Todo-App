import { useEffect, useId, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Todoform from "./Components/Todoform";
import { TodoProvider, UseTodo } from "./Context";
import AddTodo from "./Components/AddTodo";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todos) => {
    setTodos((prev) => [{ id: Date.now(), ...todos }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prevtodo) =>
      prevtodo.map((prev) => (prev.id === id ? todo : prev))
    );
  };
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevtodo) => prevtodo.id !== id));
  };

  const todoComplete = (id) => {
    setTodos((prevtodo) =>
      prevtodo.map((prev) =>
        prev.id === id ? { ...prev, complete: !prev.complete } : prev
      )
    );
  };

  useEffect(() => {
    const value = JSON.parse(localStorage.getItem("todos"));
    if (value && value.length > 0) {
      setTodos(value);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, deleteTodo, addTodo, updateTodo, todoComplete }}
    >
      <div
        className=" bg-secondary "
        style={{ height: "100vh", width: "100vw" }}
      >
        <div className="container">
          <div className="row">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <div className="py-4 text-dark">
                <h1>Manage Your Todo</h1>
              </div>

              {/* Todo Form */}
              
              <div className=" col-12 col-sm-6 col-md-8 col-lg-6 ">
                <AddTodo />
              </div>
              {/* Todo Items */}

              {todos.map((todo) => (
                <div
                  className=" col-12 col-sm-6 col-md-8 col-lg-6 col-xxl-10"
                  key={todo.id}
                >
                  <Todoform todo={todo} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
