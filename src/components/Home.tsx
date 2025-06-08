import { useNavigate } from "react-router-dom";
import { Form, InputNumber, Button } from "antd";
import type { FormProps } from 'antd';

const TOKEN_DURATION = 30 * 60 * 1000; // 30 minutes validity
const [MIN, MAX, DEFAULTVALUE] = [0, 10, 3];
const RULES = [{ required: true, message: 'Please input a number between 0 and 10!' }];
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
    <>
      <h1 className="font-sans text-4xl text-center font-bold">Workout Timer</h1>
      <Form
        name="form"
        initialValues={{
          ...Object.fromEntries(WORKOUTVALUES.map(field => [field, DEFAULTVALUE])),
          workoutPeriod: 40,
          restPeriod: 30
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
      {WORKOUTVALUES.map((field) => {
        return (
          <Form.Item
            key={field}
            rules={RULES}
            name={field}
            label={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
          >
            <InputNumber min={MIN} max={MAX} />
          </Form.Item>
        );
      })}
        <Form.Item rules={RULES} name="workoutPeriod" label="Workout Period">
          <InputNumber min={30} max={120} />
        </Form.Item>
        <Form.Item rules={RULES} name="restPeriod" label="Resting Period">
          <InputNumber min={0} max={60} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default Home;