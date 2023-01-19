export const SelectBox = ({name, options, clickEvent, defaultValue}) => {

    return (
        <div className="flex">
            <select className="rounded px-3 py-1" name={name} onChange={clickEvent} key={defaultValue} defaultValue={defaultValue}>
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectBox