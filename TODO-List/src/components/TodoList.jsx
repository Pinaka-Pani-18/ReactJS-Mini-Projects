import { useState } from "react";
import { actions, useTodoListContext } from "../context/TodoListContext";

const TodoList = () => {
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState("null");
  const { state, dispatch, text, setText } = useTodoListContext();

  function handleAdd() {
    dispatch({
      type: actions.ADD,
      payload: text,
    });
    setText("");
  }

  function handleEdit(item) {
    setEditTaskText(item.task);
    setEditTaskId(item.id);
  }

  function handleSave() {
    dispatch({
      type: actions.EDIT,
      payload: {
        id: editTaskId,
        updatedText: editTaskText,
      },
    });
    setEditTaskId(null);
    setEditTaskText("");
  }

  return (
    <>
      <h1 className="mt-28 mb-8 font-bold rounded-full text-red-500 bg-white py-3 px-10">
        TODO List App
      </h1>
      <div className="w-[40rem] flex bg-white  p-3 rounded-full ">
        <input
          type="text"
          className=" flex-grow px-5 text-3xl outline-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="bg-red-500 text-white font-bold text-lg me-auto px-8 rounded-full p-3"
          onClick={handleAdd}
        >
          ADD
        </button>
      </div>
      <div className="flex w-[40rem] justify-between gap-7 mt-7 mb-2">
        <h3 className=" font-bold rounded-full text-black bg-white py-3 px-7">
          TODOs
        </h3>
        <button
          className=" font-bold rounded-full text-black bg-white py-3 px-7"
          onClick={() => dispatch({ type: actions.DELETEALL })}
        >
          DEL ALL
        </button>
      </div>
      <ul className="w-[40rem] h-auto overflow-y-auto flex flex-col overflow-hidden bg-black rounded-2xl shadow-xl">
        {state.Tasks.map((item, index) => {
          return (
            <li
              key={index}
              className="bg-white flex w-full justify-between border-b-blue-600 border-b p-4 h-auto"
            >
              {editTaskId === item.id ? (
                <input
                  type="text"
                  value={editTaskText}
                  className=" flex-grow outline-none"
                  onChange={(e) => setEditTaskText(e.target.value)}
                />
              ) : (
                <span>
                  {index + 1}. {item.task}
                </span>
              )}

              <div className="flex gap-4">
                {editTaskId === item.id ? (
                  <button onClick={handleSave}>SAVE</button>
                ) : (
                  <button onClick={() => handleEdit(item)}>EDIT</button>
                )}

                <button
                  onClick={() =>
                    dispatch({
                      type: actions.DELETE,
                      payload: item.id,
                    })
                  }
                >
                  DEL
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default TodoList;
