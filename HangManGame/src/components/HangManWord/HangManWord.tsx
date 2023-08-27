import styles from "./HangManWord.module.css";

const HangManWord = () => {
  const word = "apple";
  const lettersAvailable = ["a", "l"];
  return (
    <div className={styles.hangManWordContainer}>
      {word.split("").map((letter, index) => {
        return (
          <span className={styles.letter} key={index}>
            <span
              style={{
                visibility: lettersAvailable.includes(letter)
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
