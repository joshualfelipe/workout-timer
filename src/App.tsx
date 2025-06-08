import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import Home from './Home.tsx';
import PageNotFound from './PageNotFound.tsx';
import CountDown from './workout.tsx';
import ProtectedRoute from './ProtectedRoute.tsx';


const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  {
    path: '/workout',
    element: (
      <ProtectedRoute>
        <CountDown />
      </ProtectedRoute>
    ),
  },
  { path: '*', element: <PageNotFound /> } // Redirect all unknown paths to home
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App
