const Input = ({labelText, name, type, value, onChange, autocomplete }) => {
    return (
        <>
            <div>
                <label htmlFor={ name } className="block text-sm font-medium leading-6 text-gray-900 mt-2">
                    { labelText }
                </label>
                <div className="mt-2">
                    <input
                    id={ name }
                    name={ name }
                    type={ type }
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={value}
                    onChange={onChange}
                    autocomplete={autocomplete}
                    />
                </div>
            </div>
        </>
    )
}

const Button = ({text}) => {
    return (
        <>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                { text }
              </button>
            </div>
        </>
    )
}



export {Input, Button }