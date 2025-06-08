import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import Home from './components/Home.tsx';
import PageNotFound from './components/PageNotFound.tsx';
import CountDown from './components/workout.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';


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
