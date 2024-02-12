// Button component for submit, edit and delete actions
export const Button = ({ children, onClick, type = 'normal' }) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-md mt-4 focus:outline-none transition duration-500 ease-in-out ${
        type === 'normal'
          ? 'bg-blue-500 text-white hover:bg-blue-700 focus:bg-blue-700'
          : 'bg-red-500 text-white hover:bg-red-700 focus:bg-red-700'
      }`}
    >
      {children}
    </button>
  )
}
