import { useEffect, useState } from 'react';
import Head from 'next/head';

import Nav from '../components/Nav';
import Modal from '../components/Modal/Modal';
import AddTask from '../components/Home/AddTask';

export default function Home() {
    useEffect(() => {
        if (!localStorage.getItem('tasks')) {
            localStorage.setItem('tasks', JSON.stringify([]));
        }
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => {
        setIsModalOpen(previousIsModalOpen => !previousIsModalOpen);
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

                {isModalOpen ? (
                    <Modal isOpen={isModalOpen}>
                        <AddTask toggleModal={toggleModal} />
                    </Modal>
                ) : null}
            </div>
        </div>
    );
}
