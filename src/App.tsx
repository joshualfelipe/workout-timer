import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout, Flex } from 'antd';
import { Content, Footer } from 'antd/es/layout/layout';
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
  return (
    <Flex className="h-screen">
      <Layout>
        <Content className='bg-white'>
            <RouterProvider router={router} />
        </Content>
        <Footer style={{ background: 'white' }}>
          <h1 className="text-l text-center font-bold p-2">© 2025 Joshua Felipe</h1>
        </Footer>
      </Layout>
    </Flex>
);
}

export default App
