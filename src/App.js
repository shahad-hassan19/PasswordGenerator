import {useState, useCallback} from 'react';

function App() {

  const [length, setLength] = useState('8');
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState()
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz";
    if(numAllowed) str+= "0123456789";
    if(charAllowed) str += "!£$%&*_~@?./";
  },
  [length, numAllowed, charAllowed, setPassword]);

  return (
    <div className="App">
      <h1 className='text-4xl text-center text-white'>Password Generator</h1>
    </div>
  );
}

export default App;
