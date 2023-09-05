/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer, useState } from "react";

export const actions = {
  ADD: "add",
  DELETE: "delete",
  DELETEALL: "deleteAll",
};

const context = createContext();

const reducer = (state, { type, payload }) => {
  switch (type) {
    case actions.ADD: {
      if (payload === "") {
        return state;
      }
      const newCounter = state.counter + 1;
      const newTask = {
        id: newCounter,
        task: payload,
      };
      return {
        counter: newCounter,
        Tasks: [...state.Tasks, newTask],
      };
    }

    case actions.DELETE: {
      return {
        counter: state.counter,
        Tasks: state.Tasks.filter((i) => i.id !== payload),
      };
    }

    case actions.DELETEALL: {
      return initialState;
    }
  }
};

const initialState = {
  counter: 0,
  Tasks: [],
};

export const useTodoListContext = () => {
  return useContext(context);
};

const TodoListContext = ({ children }) => {
  const [text, setText] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <context.Provider value={{ state, dispatch, text, setText }}>
      {children}
    </context.Provider>
  );
};

export default TodoListContext;
