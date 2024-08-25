import { IoMdArrowForward } from "react-icons/io";

const IconButton = ({
  icon = <IoMdArrowForward />,
  label = "Click me",
  onClick,
}) => {
  return (
    <span
      tabIndex={0}
      onClick={onClick}
      className="flex cursor-pointer items-center space-x-2 justify-center p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      // aria-label={label}
    >
      <span>{label}</span>
      {icon}
    </span>
  );
};

export default IconButton;
