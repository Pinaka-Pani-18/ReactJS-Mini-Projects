import styles from "./HangManDrawing.module.css";

const manHead = <div className={styles.manHead}></div>;
const manBody = <div className={styles.manBody}></div>;
const manLeftHand = <div className={styles.manLeftHand}></div>;
const manRightHand = <div className={styles.manRightHand}></div>;
const manLeftLeg = <div className={styles.manLeftLeg}></div>;
const manRightLeg = <div className={styles.manRightLeg}></div>;

const HangManDrawing = () => {
  return (
    <div className={styles.stand}>
      {manHead}
      {manBody}
      {manLeftHand}
      {manRightHand}
      {manLeftLeg}
      {manRightLeg}
      <div className={styles.standHead}></div>
      <div className={styles.standTop}></div>
      <div className={styles.standMiddle}></div>
      <div className={styles.standBottom}></div>
    </div>
  );
};

export default HangManDrawing;
