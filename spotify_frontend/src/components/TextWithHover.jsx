const TextWithHover = ({displayText, active,properties}) => {
    return (
        <div className="flex items-center justify-start cursor-pointer">
            <div
                className={`${
                    active ? "text-white" : "text-gray-500"
                } font-semibold hover:text-white transition-all duration-200 ${properties} `}
                // ! we can pass properties as a prop to this component which will act as a tailwind class from the parent component
            >
                {displayText}
            </div>
        </div>
    );
};

export default TextWithHover;
