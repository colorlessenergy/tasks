import { useEffect, useState } from 'react';
import Head from 'next/head';

import Nav from '../components/Nav';
import Modal from '../components/Modal/Modal';
import AddTask from '../components/Home/AddTask';

export default function Home() {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        if (!localStorage.getItem('tasks')) {
            localStorage.setItem('tasks', JSON.stringify([]));
        }

        setTasks(JSON.parse(localStorage.getItem('tasks')));
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (isModalOpen === false) {
            setTasks(JSON.parse(localStorage.getItem('tasks')));
            setEditTask(false);
            setEditTaskIndex(null);
        }
    }, [isModalOpen]);

    const toggleModal = () => {
        setIsModalOpen(previousIsModalOpen => !previousIsModalOpen);
    };

    const handleTaskDone = ({ taskIndex, taskItemIndex }) => {
        let cloneTasks = JSON.parse(localStorage.getItem('tasks'));
        let taskItem = cloneTasks[taskIndex].list[taskItemIndex];
        taskItem.isDone = !taskItem.isDone;

        setTasks(cloneTasks);
        localStorage.setItem('tasks', JSON.stringify(cloneTasks));
    };

    const [editTask, setEditTask] = useState(false);
    const [editTaskIndex, setEditTaskIndex] = useState(null);
    const handleEditTask = (task, index) => {
        setEditTask(task);
        setEditTaskIndex(index);
        toggleModal();
    };

    return (
        <div>
            <Head>
                <title>tasks</title>
                <meta name="description" content="tasks" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="container">
                <Nav toggleModal={toggleModal} />

                <div className="tasks">
                    {tasks.map((task, index) => {
                        return (
                            <div
                                key={index}
                                className="task mb-1 p-1"
                                style={{ backgroundColor: `#${task.color}` }}>
                                <div className="task-header">
                                    <p>{task.task}</p>

                                    <button
                                        onClick={() =>
                                            handleEditTask(task, index)
                                        }>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            width="24"
                                            height="24">
                                            <path d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="mt-1">
                                    {task.list.map((item, itemIndex) => {
                                        return (
                                            <div className="task-list-item">
                                                <input
                                                    onChange={() =>
                                                        handleTaskDone({
                                                            taskIndex: index,
                                                            taskItemIndex:
                                                                itemIndex
                                                        })
                                                    }
                                                    checked={item.isDone}
                                                    type="checkbox"
                                                    id={`${index}-${item.task}`}
                                                    name={`${index}-${item.task}`}
                                                    className="d-none"
                                                />

                                                <label
                                                    className={`circle ${task.color} mr-1`}
                                                    htmlFor={`${index}-${item.task}`}></label>

                                                <label
                                                    className="cursor-pointer"
                                                    htmlFor={`${index}-${item.task}`}>
                                                    {item.task}
                                                </label>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {isModalOpen ? (
                    <Modal isOpen={isModalOpen}>
                        <AddTask
                            editTask={editTask}
                            editTaskIndex={editTaskIndex}
                            toggleModal={toggleModal}
                        />
                    </Modal>
                ) : null}
            </div>
        </div>
    );
}
