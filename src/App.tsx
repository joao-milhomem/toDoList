import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { ClipboardText, PlusCircle } from "@phosphor-icons/react";

import styles from "./App.module.css";
import "./global.css";

import { Header } from "./components/Header";
import { Task } from "./components/Task";

interface TasksProps {
  id: number;
  title: string;
  isChecked: boolean;
}

export function App() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState<TasksProps[]>([]);

  const countChecked = tasks.reduce((acc, task) => {
    if (task.isChecked) {
      return acc + 1;
    }
    return acc;
  }, 0);

  function handleNewTask(event: ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value);
    event.target.setCustomValidity("");
  }

  function handleSubmitTask(event: FormEvent) {
    event.preventDefault();

    if (!newTask) {
      return;
    }

    if (tasks.find((task) => task.title == newTask)) {
      return alert("Tarefa de mesmo título já existe");
    }

    const taskToSubmit: TasksProps = {
      id: Math.random(),
      title: newTask,
      isChecked: false,
    };

    setTasks([...tasks, taskToSubmit]);
    setNewTask("");
  }

  function handleDeleteTask(taskId: number) {
    if (!confirm("Tem certeza disto?")) {
      return;
    }

    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  }

  function handleCheckTask(taskId: number) {
    const currentTasks = tasks.map((task) => {
      if (task.id === taskId) {
        task.isChecked = !task.isChecked;
      }
      return task;
    });

    setTasks(currentTasks);
  }

  function handleInvalidNewTask(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Digite um título para sua tarefa");
  }

  return (
    <div>
      <Header />

      <div className={styles.container}>
        <form onSubmit={handleSubmitTask}>
          <input
            placeholder="Adicione uma nova tarefa"
            onInvalid={handleInvalidNewTask}
            onChange={handleNewTask}
            value={newTask}
            type="text"
            required
          />

          <button type="submit">
            Criar
            <PlusCircle size="1rem" />
          </button>
        </form>

        <main>
          <header>
            <strong>
              Tarefas criadas <span>{tasks.length}</span>
            </strong>

            <strong>
              Concluidas
              {tasks.length == 0 ? (
                <span>0</span>
              ) : (
                <span>{`${countChecked} de ${tasks.length}`}</span>
              )}
            </strong>
          </header>

          <ul className={styles.taskList}>
            {tasks.map((task) => {
              return (
                <Task
                  onDelete={() => handleDeleteTask(task.id)}
                  onCheck={() => handleCheckTask(task.id)}
                  title={task.title}
                  isChecked={task.isChecked}
                  key={task.id}
                />
              );
            })}

            {tasks.length == 0 && (
              <li className={styles.empty}>
                <ClipboardText />
                <h1>Voce ainda não tem tarefas cadastradas</h1>
                <p>Crie tarefas e organize seus itens a fazer</p>
              </li>
            )}
          </ul>
        </main>
      </div>
    </div>
  );
}
