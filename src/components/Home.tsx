import { useNavigate } from "react-router-dom";
import { Flex, Form, InputNumber, Button, Typography, Card, Row, Col, Space } from "antd";
import type { FormProps } from 'antd';

const TOKEN_DURATION = 30 * 60 * 1000; // 30 minutes validity
const [MIN, MAX, DEFAULTVALUE] = [0, 10, 3];
const RULES = [{ required: true, message: 'Please input a number greater than 0!' }];
const WORKOUTVALUES = [
  'bicepCurl',
  'hammerCurl',
  'bicepCurlPulse',
  'tricepExtension',
  'kickBack',
  'tricepExtensionPulse',
]

function Home() {
  const navigate = useNavigate();

  const onFinish: FormProps['onFinish'] = values => {
    const expiry = Date.now() + TOKEN_DURATION;
    sessionStorage.setItem('access', JSON.stringify({ granted: true, expiry }));
    navigate('/workout', { state: values });
  };

  return (
    <Flex justify="center" align="center" className="h-screen">
    <Space direction="vertical" size="small" className="w-full max-w-lg p-2">
      <Typography.Title level={1} className="text-center">Workout Timer</Typography.Title>
      <Card style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <Form
          layout="vertical"
          name="form"
          initialValues={{
            ...Object.fromEntries(WORKOUTVALUES.map(field => [field, DEFAULTVALUE])),
            workoutPeriod: 40,
            restPeriod: 30
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={16}>
            {WORKOUTVALUES.map(field => (
              <Col span={12} key={field}>
                <Form.Item
                  rules={RULES}
                  name={field}
                  label={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                >
                  <InputNumber min={MIN} max={MAX} style={{ width: '100%' }} suffix="reps / arm" />
                </Form.Item>
              </Col>
            ))}
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item rules={RULES} name="workoutPeriod" label="Workout Period">
                <InputNumber min={0} max={120} style={{ width: '100%' }} suffix="secs" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item rules={RULES} name="restPeriod" label="Resting Period">
                <InputNumber min={0} max={60} style={{ width: '100%' }} suffix="secs" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item className="text-center">
            <Button type="primary" htmlType="submit" size="large">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Space>
    </Flex>
  );
}

export default Home;