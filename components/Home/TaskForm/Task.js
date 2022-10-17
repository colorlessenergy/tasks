const Task = ({ state, dispatch, formValidation }) => {
    const handleTaskChange = event => {
        dispatch({ type: 'CHANGE_TASK', task: event.currentTarget.value });
    };

    return (
        <>
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
        </>
    );
};

export default Task;
