/* eslint-disable no-undef */
import { useReducer } from "react";
import DigitButton from "./DigitButton";
import OperatorButton from "./OperatorButton";

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
      if (payload.digit === "0" && state.currentValue === "0") {
        return state;
      }

      if (payload.digit === "." && state.currentValue.includes(".")) {
        return state;
      }

      return {
        ...state,
        currentValue: `${state.currentValue || ""}${payload.digit}`,
      };

    case ACTIONS.OPERATOR:
      if (state.currentValue == null && state.previousValue == null) {
        return state;
      }
      if (state.previousValue == null) {
        return {
          operation: payload.operation,
          previousValue: state.currentValue,
          currentValue: null,
        };
      }

      if (state.currentValue == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      console.log(state);
      return {
        previousValue: evaluate(state),
        operation: payload.operation,
        currentValue: null,
      };

    case ACTIONS.ClEAR:
      return {};

    case ACTIONS.DELETE:
      if (state.currentValue == null && state.previousValue == null) {
        return state;
      }

      if (state.currentValue === null) {
        return state;
      }
      return {
        ...state,
        currentValue: state.currentValue.slice(0, -1),
      };
  }
};

function evaluate(state) {
  const prev = parseFloat(state.previousValue);
  const curr = parseFloat(state.currentValue);

  if (isNaN(prev) || isNaN(curr)) {
    return "";
  }

  let finalResult = "";

  switch (state.operation) {
    case "+":
      finalResult = prev + curr;
      break;
    case "-":
      finalResult = prev - curr;
      break;
    case "/":
      finalResult = prev / curr;
      break;

    case "*":
      finalResult = prev * curr;
      break;
  }

  return finalResult;
}

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
      <button
        className="span-two"
        onClick={() => {
          dispatch({ type: ACTIONS.ClEAR });
        }}
      >
        AC
      </button>
      <button
        onClick={() => {
          dispatch({ type: ACTIONS.DELETE });
        }}
      >
        DEL
      </button>
      <OperatorButton operation={"/"} dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperatorButton operation={"*"} dispatch={dispatch} />

      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperatorButton operation={"+"} dispatch={dispatch} />

      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperatorButton operation={"-"} dispatch={dispatch} />

      <DigitButton digit="0" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />

      <button className="span-two">=</button>
    </div>
  );
};

export default Calculator;
