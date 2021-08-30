import { useState } from 'react';
import Login from './Login';

function App() {
  const [id, setId] = useState();
  console.log(id);
  return (
    <div>
      <Login onIdSubmit={setId}/>
    </div>
    
  );
}

export default App;
