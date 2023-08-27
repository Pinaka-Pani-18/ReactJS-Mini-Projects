import styles from "./HangManWord.module.css";

type HangManWordProps = {
  guessedLetters: string[];
  wordToGuess: string;
};

const HangManWord = ({ guessedLetters, wordToGuess }: HangManWordProps) => {
  return (
    <div className={styles.hangManWordContainer}>
      {wordToGuess.split("").map((letter, index) => {
        return (
          <span className={styles.letter} key={index}>
            <span
              style={{
                visibility: guessedLetters.includes(letter)
                  ? "visible"
                  : "hidden",
              }}
            >
              {letter}
            </span>
          </span>
        );
      })}
    </div>
  );
};

export default HangManWord;
