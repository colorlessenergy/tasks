import { useReducer, useState } from 'react';

import Task from './Task';
import Color from './Color';
import List from './List';

const reducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_TASK': {
            return {
                ...state,
                task: action.task
            };
        }

        case 'SELECT_COLOR': {
            return {
                ...state,
                color: action.color
            };
        }

        case 'ADD_LIST_ITEM': {
            let cloneList = JSON.parse(JSON.stringify(state.list));
            cloneList.push({
                task: '',
                isDone: false
            });

            return {
                ...state,
                list: cloneList
            };
        }

        case 'CHANGE_LIST_ITEM': {
            let cloneList = JSON.parse(JSON.stringify(state.list));
            cloneList[action.listItemIndex].task = action.text;

            return {
                ...state,
                list: cloneList
            };
        }

        case 'REMOVE_LIST_ITEM': {
            let cloneList = JSON.parse(JSON.stringify(state.list));
            cloneList.splice(action.listItemIndex, 1);

            return {
                ...state,
                list: cloneList
            };
        }

        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
};

const AddTask = ({ toggleModal }) => {
    const [state, dispatch] = useReducer(reducer, {
        task: '',
        color: 'F0FBFF',
        list: [
            {
                task: '',
                isDone: false
            },
            {
                task: '',
                isDone: false
            }
        ]
    });

    const [formValidation, setFormValidation] = useState({});
    const handleSubmit = event => {
        event.preventDefault();

        let currentFormValidation = {};

        if (state.task.trim() === '') {
            currentFormValidation.task = 'task missing';
        }

        const missingListItem = state.list.map(item => {
            return item.task.trim() === '';
        });

        if (missingListItem.includes(true)) {
            currentFormValidation.listItem = missingListItem;
        }

        if (currentFormValidation.task || currentFormValidation.listItem) {
            return setFormValidation(currentFormValidation);
        }

        let cloneState = JSON.parse(JSON.stringify(state));
        cloneState.task = cloneState.task.trim();
        cloneState.list = cloneState.list.map(item => {
            return {
                ...item,
                task: item.task.trim()
            };
        });

        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.push(cloneState);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        toggleModal();
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <Task
                state={state}
                dispatch={dispatch}
                formValidation={formValidation}
            />

            <Color state={state} dispatch={dispatch} />

            <List
                state={state}
                dispatch={dispatch}
                formValidation={formValidation}
            />

            <div className="mt-2 task-form-group">
                <button
                    className="underline"
                    type="button"
                    onClick={toggleModal}>
                    cancel
                </button>

                <button className="underline">add</button>
            </div>
        </form>
    );
};

export default AddTask;
