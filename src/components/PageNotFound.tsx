import { Link } from 'react-router-dom';
import { Button, Flex } from 'antd';

function PageNotFound() {
  return (
    <Flex gap="middle" justify="center" align="center" vertical className="h-screen">
      <h1 className="font-bold text-4xl">404 - Page Not Found</h1>
      <p className="text-m text-pretty">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className='p-1'>
        <Button>Go to Home</Button>
      </Link>
    </Flex>
  );
}
export default PageNotFound;