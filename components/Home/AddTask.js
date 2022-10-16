import { useReducer, useState } from 'react';

const COLORS = ['F0FBFF', 'F5F0FF', 'FFF0FA'];

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

    const handleTaskChange = event => {
        dispatch({ type: 'CHANGE_TASK', task: event.currentTarget.value });
    };

    const selectColor = color => {
        dispatch({ type: 'SELECT_COLOR', color });
    };

    const addListItem = () => {
        dispatch({ type: 'ADD_LIST_ITEM' });
    };

    const changeListItem = ({ listItemIndex, text }) => {
        dispatch({ type: 'CHANGE_LIST_ITEM', listItemIndex, text });
    };

    const removeListItem = listItemIndex => {
        dispatch({ type: 'REMOVE_LIST_ITEM', listItemIndex });
    };

    const handleCancel = () => {
        toggleModal();
    };

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
            <label className="fw-700" htmlFor="task">
                task
            </label>
            <textarea
                onChange={handleTaskChange}
                value={state.task}
                name="task"
                id="task"></textarea>

            {formValidation.task ? (
                <div className="color-red">{formValidation.task}</div>
            ) : null}

            <div className="fw-700 mt-1">color</div>
            <div className="d-flex">
                {COLORS.map(color => {
                    return (
                        <div key={color} className="mr-1">
                            <input
                                onChange={() => selectColor(color)}
                                checked={state.color === color}
                                type="radio"
                                id={`color-${color}`}
                                value={`color-${color}`}
                                name="colors"
                                className="d-none"
                            />

                            <label
                                className="circle"
                                style={{ backgroundColor: `#${color}` }}
                                htmlFor={`color-${color}`}></label>
                        </div>
                    );
                })}
            </div>

            <div className="mt-1 task-form-group">
                <div className="fw-700">list</div>

                <button onClick={addListItem} type="button">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24">
                        <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" />
                    </svg>
                </button>
            </div>

            <div className="task-form-list">
                {state.list.map((item, index) => {
                    return (
                        <div key={index} className="mb-1">
                            <div className="d-flex">
                                <button
                                    onClick={() => removeListItem(index)}
                                    type="button">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        height="24">
                                        <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                                    </svg>
                                </button>

                                <input
                                    type="text"
                                    className="flex-1"
                                    onChange={event =>
                                        changeListItem({
                                            listItemIndex: index,
                                            text: event.currentTarget.value
                                        })
                                    }
                                    value={item.task}
                                />
                            </div>

                            {formValidation.listItem &&
                            formValidation.listItem[index] ? (
                                <div className="ml-3 color-red">
                                    missing task item
                                </div>
                            ) : null}
                        </div>
                    );
                })}
            </div>

            <div className="mt-2 task-form-group">
                <button
                    className="underline"
                    type="button"
                    onClick={handleCancel}>
                    cancel
                </button>

                <button className="underline">add</button>
            </div>
        </form>
    );
};

export default AddTask;
