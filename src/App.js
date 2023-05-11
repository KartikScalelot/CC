import React from 'react'
import AllRoutes from './routes/AllRoutes';
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ToastContainer } from 'react-toastify';
import { history } from './components/_utils';

function App() {

  history.navigate = useNavigate()

  return (
    <Provider store={store}>
      <div className='main min-h-screen w-full'>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <AllRoutes />
      </div>
    </Provider>
  );
}

export default App;
