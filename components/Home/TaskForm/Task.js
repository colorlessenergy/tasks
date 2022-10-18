import { useEffect, useRef } from 'react';

const Task = ({ state, dispatch, formValidation }) => {
    const handleTaskChange = event => {
        dispatch({ type: 'CHANGE_TASK', task: event.currentTarget.value });
    };

    const textareaRef = useRef();
    useEffect(() => {
        textareaRef.current.focus();
    }, []);

    return (
        <>
            <label className="fw-700 mb-04" htmlFor="task">
                task
            </label>
            <textarea
                onChange={handleTaskChange}
                value={state.task}
                ref={textareaRef}
                name="task"
                id="task"></textarea>

            {formValidation.task ? (
                <div className="color-red">{formValidation.task}</div>
            ) : null}
        </>
    );
};

export default Task;
