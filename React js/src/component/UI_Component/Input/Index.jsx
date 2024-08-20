import React from 'react'

const Input = ({type, id, name, label, placeholder, className, error, register, patternValue, patternMessage}) => {
    return (
        <div className='flex flex-col w-full'>
            <input
                type={type}
                id={id}
                name={name}
                className={`flex w-full p-2 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent ${className}`}
                placeholder={placeholder}
                {...register(name, { required: { value: true, message: `${label} is required` },pattern: {
                    value: patternValue,
                    message: patternMessage,
                },})}
            />
            {error ? <span className="text-red-500 mt-1">{error}</span> :null}
        </div>
    )
}
export default Input;