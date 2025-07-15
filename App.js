import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router ,Routes,Route,Link} from 'react-router-dom';
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import AddProduct from './Components/AddProduct';
import GetProducts from './Components/GetProducts';
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from './Components/NavBar';
import MpesaPayment from './Components/MpesaPayment';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h2>SokoGarden-Buy and sell online</h2>
          <NavBar/>
        </header>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/add_products" element={<AddProduct />} />
          <Route path="/" element={<GetProducts />} />
          <Route path='/mpesapayment'element={<MpesaPayment />} />
        
        </Routes>
      </div>
      
    </Router>
  );
}

export default App;
