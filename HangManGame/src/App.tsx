import { useState, useEffect, useCallback } from "react";
import "./App.css";
import HangManDrawing from "./components/HangManDrawing/HangManDrawing";
import HangManWord from "./components/HangManWord/HangManWord";
import Keyboard from "./components/Keyboard/Keyboard";
import words from "./words/wordList.json";

function getWord() {
  return words[Math.floor(Math.random() * words.length)];
}

const App = () => {
  const [wordToGuess, setWordToGuess] = useState(getWord);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const inCorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  console.log(wordToGuess);

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter)) return;

      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters]);

  return (
    <div className="app">
      <div className="heading">HangMan Game Win or Loss</div>
      <HangManDrawing numberOfGuesses={inCorrectLetters.length} />
      <HangManWord guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
      <div
        style={{
          alignSelf: "stretch",
        }}
      >
        <Keyboard
          activeLetters={guessedLetters.filter((letter) =>
            wordToGuess.includes(letter)
          )}
          inActiveLetters={inCorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  );
};

export default App;
