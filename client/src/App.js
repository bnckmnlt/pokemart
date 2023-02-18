import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StoreLayout from './scenes/layout/storelayout';
import Home from './scenes/home';
import Products from './scenes/products';
import Services from './scenes/services';
import Pokemon from './scenes/pokemon';
import Abilities from './scenes/abilities';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route element={<StoreLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<Products />} />
            <Route path='/services' element={<Services />} />
            <Route path='/pokemon' element={<Pokemon />} />
            <Route path='/abilities' element={<Abilities />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
