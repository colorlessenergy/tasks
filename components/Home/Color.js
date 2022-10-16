const COLORS = ['F0FBFF', 'F5F0FF', 'FFF0FA'];

const Color = ({ state, dispatch }) => {
    const selectColor = color => {
        dispatch({ type: 'SELECT_COLOR', color });
    };

    return (
        <>
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
        </>
    );
};

export default Color;
