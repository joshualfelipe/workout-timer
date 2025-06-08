import { Flex, Layout } from "antd";
import './App.css'
import { Content, Footer } from "antd/es/layout/layout";


function App() {
  return (
    <>
    <Flex className="h-screen">
      <Layout>
        <Content>
          <Flex gap="middle" justify="center" align="center" vertical className="h-full">
            <h1 className="font-bold text-center text-4xl pt-4">This is a Work in Progress project.</h1>
            <h2 className="text-2xl text-center p-4">Working with you soon!</h2>
          </Flex>
        </Content>
        <Footer>
          <h1 className="text-l text-center font-bold p-2">© Joshua Felipe 2025</h1>
        </Footer>
      </Layout>
      </Flex>
    </>
  )
}

export default App
