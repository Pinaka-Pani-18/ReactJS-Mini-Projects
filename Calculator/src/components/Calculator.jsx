/* eslint-disable no-undef */
import { useReducer } from "react";
import DigitButton from "./DigitButton";

export const ACTIONS = {
  ADD: "add-digit",
  OPERATOR: "operator",
  ClEAR: "clear",
  DELETE: "delete",
  EVALUATE: "evaluate",
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD:
      return {
        ...state,
        currentValue: `${state.currentValue || ""}${payload.digit}`,
      };
  }
};

const Calculator = () => {
  const [{ currentValue, previousValue, operation }, dispatch] = useReducer(
    reducer,
    {}
  );
  return (
    <div className="calculator">
      <div className="output">
        <div className="prev-output">
          {previousValue} {operation}
        </div>
        <div className="curr-output">{currentValue}</div>
      </div>
      <button>AC</button>
      <button>DEL</button>
      <button>.</button>
      <button>/</button>
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <button>*</button>
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <button>+</button>
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <button>-</button>
      <button>00</button>
      <button>0</button>
      <button className="span-two">=</button>
    </div>
  );
};

export default Calculator;
