import {useState, useCallback, useEffect, useRef} from 'react';

function App() {

  const [length, setLength] = useState('8');
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState()

  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz";
    if(numAllowed) str+= "0123456789";
    if(charAllowed) str += "!£$%&*_~@?./";

    for(let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)
    }
  
    setPassword(pass)

  },
  [length, numAllowed, charAllowed, setPassword]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,24)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  },
  [length, numAllowed, charAllowed, passwordGenerator])

  return (
    <div className="w-full max-w-md max-auto shadow-md rounded-lg px-4 mx-8 my-8 py-4 text-orange-500 bg-gray-700">
    <h1 className='text-white text-center font-bold my-3'>Password Generator</h1>
    <div className='flex justify-evenly shadow rounded overflow-hidden my-4'>
    <input 
      type='text'
      value={password}
      className='outline-none w-full py-1 px-3'
      placeholder='password'
      readOnly
      ref={passwordRef}
    />
    <button onClick={copyPassword}
    className='outline-none rounded bg-blue-700 text-white px-3 py-0.5 shrink-0'>
    COPY
    </button>

    </div>   
    <div className='flex justify-evenly text-sm mt-4 gap-x-2'>
      <div className='flex items-center gap-x-1'>
      <input
        type='range'
        min={6}
        max={25}
        value={length}
        className='cursor-pointer'
        onChange={(e) => {setLength(e.target.value)}}
      />
      <label>Length: {length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
      <input
        type='checkbox'
        defaultChecked={numAllowed}
        id='numberInput'
        onChange={() => {
          setNumAllowed((prev) => !prev)
        }}
      />
      <label htmlFor='numberInput'>Numbers</label>
      </div>
      <div className='flex items-center gap-x-1'>
      <input
        type='checkbox'
        defaultChecked={charAllowed}
        id='charInput'
        onChange={() => {
          setCharAllowed((prev) => !prev)
        }}
      />
      <label htmlFor='charInput'>Numbers</label>
      </div>
    </div>  
    </div>
  );
}

export default App;
