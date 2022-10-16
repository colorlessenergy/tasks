import { useReducer } from 'react';

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

const AddTask = () => {
    const [state, dispatch] = useReducer(reducer, {
        task: '',
        color: '',
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
        dispatch({ type: 'ADD_LIST_ITEM', list: cloneList });
    };

    const changeListItem = ({ listItemIndex, text }) => {
        dispatch({ type: 'CHANGE_LIST_ITEM', listItemIndex, text });
    };

    const removeListItem = listItemIndex => {
        dispatch({ type: 'REMOVE_LIST_ITEM', listItemIndex });
    };

    return (
        <form>
            <label htmlFor="task">task</label>
            <textarea
                onChange={handleTaskChange}
                value={state.task}
                name="task"
                id="task"></textarea>

            {COLORS.map(color => {
                return (
                    <div key={color}>
                        <label
                            className={`circle circle-${color}`}
                            htmlFor={`color-${color}`}>
                            {color}
                        </label>
                        <input
                            onClick={() => selectColor(color)}
                            type="radio"
                            id={`color-${color}`}
                            value={`color-${color}`}
                            name="colors"
                        />
                    </div>
                );
            })}

            <div>
                <div>list</div>

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

            <div>
                {state.list.map((item, index) => {
                    return (
                        <div key={index}>
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
                                onChange={event =>
                                    changeListItem({
                                        listItemIndex: index,
                                        text: event.currentTarget.value
                                    })
                                }
                                value={item.task}
                            />
                        </div>
                    );
                })}
            </div>
        </form>
    );
};

export default AddTask;
