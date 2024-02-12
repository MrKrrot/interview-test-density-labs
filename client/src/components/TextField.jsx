export const TextField = ({ id, type, value, onChange, error }) => {
  return (
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      required
      className={`text-black h-10 border-gray-300 border-2 rounded-md p-2 w-full mt-2 focus:outline-none focus:border-orange-500 transition duration-500 ease-in-out ${
        error ? 'border-red-500' : ''
      }`}
    />
  )
}
