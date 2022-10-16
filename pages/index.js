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
                                <p>{task.task}</p>

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
                        <AddTask toggleModal={toggleModal} />
                    </Modal>
                ) : null}
            </div>
        </div>
    );
}
