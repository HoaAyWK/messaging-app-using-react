import useStorage from '../hooks/useStorage';
import Login from './Login';

function App() {
  const [id, setId] = useStorage('id');
  console.log(id);
  return (
    <div>
      <Login onIdSubmit={setId}/>
    </div>
    
  );
}

export default App;
