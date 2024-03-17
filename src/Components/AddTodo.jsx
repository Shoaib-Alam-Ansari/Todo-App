import React, { useState } from "react";
import { UseTodo } from "../Context";
import { faL } from "@fortawesome/free-solid-svg-icons";

function AddTodo() {
  const { addTodo } = UseTodo();
  const [todo, setTodo] = useState("");

  const addBtn = (e) => {
    e.preventDefault();
    if (!todo) return;
    addTodo({ todo, complete: false });
    setTodo("");
  };
  return (
    <>
      <div class="input-group mb-3">
        <input
          type="text"
          value={todo}
          class="form-control"
          placeholder="Write Todo...."
          onChange={(e) => setTodo(e.target.value)}
        />
        <button class="btn btn-primary"
         type="button"
         onClick={addBtn}
         >
          Add
        </button>
      </div>
    </>
  );
}

export default AddTodo;
