import {useState, useCallback, useEffect, useRef} from 'react';

function App() {

  const [length, setLength] = useState('10');
  const [numAllowed, setNumAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [password, setPassword] = useState();
  const [copy, setCopy] = useState('Copy');

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

    setPassword(pass);
    setCopy('Copy');

  },
  [length, numAllowed, charAllowed, setPassword]);

  const copyPassword = useCallback(() => {
    window.navigator.clipboard.writeText(password)
    if(password !== ''){
      setCopy('Copied!');
    }
  }, [password])

  useEffect(() => {
    setPassword('')
    setCopy('Copy');
  }, [length, numAllowed, charAllowed])

  return (
    <div className='flex justify-center align-items-center '>
    <div className=" sm:h-full w-96 md:h-max self-center rounded-lg px-4 mx-8 my-8 py-4 text-white bg-sky-950">
        <h1 className='text-center font-bold text-3xl my-3'>Password Generator</h1>
        <h5 className='text-orange-600 text-center'>React Password Generator: Securely Create Customized Passwords</h5>
        <div className='flex justify-evenly shadow rounded overflow-hidden mt-16'>
            <input
            type='text'
            value={password}
            className='outline-none w-3/4 bg-sky-900 rounded-md py-3 text-center px-3'
            placeholder='password'
            readOnly
            ref={passwordRef}  />
            <button onClick={copyPassword}
            className='outline-none rounded bg-blue-700 text-white px-3 py-0.5 shrink-0'>
                {copy}
            </button>
        </div>
        <div className='flex flex-col text-sm my-4'>
            <div className='flex items-center justify-between sm:w-full md:w-3/4 my-4'>
                <input
                type='range'
                min={6}
                max={25}
                value={length}
                className='cursor-pointer'
                onChange={(e) => {setLength(e.target.value)}}  />
                <label className='text-lg'>Length :<span className=' text-yellow-300'> {length}</span></label>
            </div>
            <div className='flex justify-between sm:w-full md:w-3/4 my-4'>
                <span className='text-lg'>Numbers</span>
                <label htmlFor='numberInput'
                className='bg-gray-100 cursor-pointer relative w-14 h-7 rounded-full'>
                    <input
                    type='checkbox'
                    defaultChecked={numAllowed}
                    id='numberInput'
                    className='sr-only peer'
                    onChange={() => {
                    setNumAllowed((prev) => !prev)}}  />
                    <span className='w-2/5 h-4/6 bg-rose-300 absolute rounded-full left-1 top-1 peer-checked:bg-rose-600 peer-checked:left-7 transition-all duration-500'></span>
                </label>
            </div>
            <div className='flex items-center justify-between sm:w-full md:w-3/4 my-4'>
                <span className='text-lg'>Special Characters</span>
                <label htmlFor='charInput'
                className='bg-gray-100 cursor-pointer relative w-14 h-7 rounded-full'>
                    <input
                    type='checkbox'
                    role='switch'
                    defaultChecked={charAllowed}
                    id='charInput'
                    className='sr-only peer'
                    onChange={() => {
                    setCharAllowed((prev) => !prev)}}  />
                    <span className='w-2/5 h-4/6 bg-rose-300 absolute rounded-full left-1 top-1 peer-checked:bg-rose-600 peer-checked:left-7 transition-all duration-500'></span>
                </label>
            </div>
            <button
            className='w-3/4 bg-sky-900 self-center font-semibold rounded-md py-3 text-center px-3 text-xl my-6 transition-all duration-500 hover:bg-orange-600 hover:text-black '
            onClick={passwordGenerator} >
              Generate Password
            </button>
        </div>
    </div>
    </div>
  );
}

export default App;
