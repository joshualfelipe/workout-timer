import { Link } from 'react-router-dom';
import { Button, Flex } from 'antd';

function CountDown(){
  return (
    <Flex gap="middle" justify="center" align="center" vertical className="h-screen">
        <h1 className="font-bold text-center text-4xl pt-4">This is a Work in Progress project.</h1>
        <h2 className="text-2xl text-center p-4">Working with you soon!</h2>
      <Link to="/">
        <Button>Go to Home</Button>
      </Link>
    </Flex>
  );
}

export default CountDown;