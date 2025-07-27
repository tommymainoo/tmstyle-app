import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router ,Routes,Route,Link} from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import AddProduct from './components/AddProduct';
import GetProducts from './components/GetProducts';
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from './components/NavBar';
import MpesaPayment from './components/MpesaPayment';



function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />

        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/add_products" element={<AddProduct />} />
          <Route path="/" element={<GetProducts />} />
          <Route path="/mpesapayment" element={<MpesaPayment />} />
       
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
