import React from 'react'
import AllRoutes from './routes/AllRoutes';
import "react-toastify/dist/ReactToastify.css"; 

function App() {
  return (
    <div className='main min-h-screen w-full'>
      <React.Fragment>
        <AllRoutes />
      </React.Fragment>
    </div>
  );
}

export default App;
