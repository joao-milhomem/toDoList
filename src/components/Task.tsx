import { Trash } from "@phosphor-icons/react";
import styles from "./Task.module.css";

interface Task {
  title: string;
  isChecked: boolean;
  onDelete?: () => void;
  onCheck?: () => void;
}

export function Task({ title, isChecked, onDelete, onCheck }: Task) {
  return (
    <li className={styles.task}>
      <div className={styles["check-wrapper"]}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => !isChecked}
          onClick={onCheck}
        />
        <label></label>
      </div>

      <p className={isChecked ? styles.strike : ""}>{title}</p>

      <button type="button" onClick={onDelete}>
        <Trash size="1.5rem" />
      </button>
    </li>
  );
}
