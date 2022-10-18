const List = ({ state, dispatch, formValidation }) => {
    const addListItem = () => {
        dispatch({ type: 'ADD_LIST_ITEM' });
    };

    const changeListItem = ({ listItemIndex, text }) => {
        dispatch({ type: 'CHANGE_LIST_ITEM', listItemIndex, text });
    };

    const removeListItem = listItemIndex => {
        dispatch({ type: 'REMOVE_LIST_ITEM', listItemIndex });
    };
    return (
        <>
            <div className="task-form-group mt-1 mb-04">
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
        </>
    );
};

export default List;
