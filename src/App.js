
import React, { Suspense, lazy } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import NotFund from './components/NotFund';
import Loader from './components/Loader';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRoute from './components/PrivateRoute';

const Login = lazy(() => import('./components/login/'));
const List = lazy(() => import('./components/List'));
const Detail = lazy(() => import('./components/Detail'));

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route path="/list" element={<PrivateRoute />}>
              <Route path='/list' element={<List />} />
              <Route path='/list/:id' element={<Detail />} />
            </Route>
            <Route path='*' element={<NotFund />}></Route>`
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
