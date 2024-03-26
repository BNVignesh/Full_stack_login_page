import logo from './logo.svg';
import './App.css';
import Register from './Register';
import Login from './Login';
import { Route,Routes,BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <>
      < BrowserRouter>
        <Routes>
          <Route path='/' element="home"/>
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
