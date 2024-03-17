import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faPencil, faFile, faL } from "@fortawesome/free-solid-svg-icons";
import { UseTodo } from "../Context";
import AddTodo from "./AddTodo";

function Todoform({ todo }) {
  const { updateTodo, deleteTodo, todoComplete } = UseTodo();
  const [editable, seteditable] = useState(false);
  const [todomsg, setTodomsg] = useState(todo.todo);

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todomsg });
    seteditable(false);
  };

  const todoCompleted = () => {
    todoComplete(todo.id);
  };
  return (
    <>
      <div
        className={`
      rounded d-flex gap-2 justify-content-between py-2 px-3 mb-2
      ${
        todo.complete
          ? "bg-info-subtle text-decoration-line-through"
          : "bg-danger-subtle"
      }
      `}
      >
        <div className="d-flex col-8 col-sm-10 col-md-9 col-lg-9  col-xl-10 gap-2 align-items-center">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            onChange={todoCompleted}
            checked={todo.complete}
            disabled ={editable}
          />
          <input
            type="text"
            className={`form-control border-0
            ${!editable ? "bg-transparent" : "form-control"}

            `}
            value={todomsg}
            onChange={(e) => setTodomsg(e.target.value)}
            readOnly={!editable}
          />
        </div>
        <div className=" d-flex gap-2 align-items-center">
          <button
            className="btn bg-light text-primary"
            type="button"
            onClick={() => {
              if (todo.complete) return;
              if (editable) {
                editTodo();
              } else {
                seteditable((prev) => !prev);
              }
            }}
            disabled={todo.complete}
          >
            {editable ? (
              <FontAwesomeIcon icon={faFile} />
            ) : (
              <FontAwesomeIcon icon={faPencil} />
            )}
          </button>
          <button
            className="btn bg-light text-danger"
            type="button"
            onClick={() => deleteTodo(todo.id)}
          >
            <FontAwesomeIcon icon={faX} />
          </button>
        </div>
      </div>
    </>
  );
}

export default Todoform;
