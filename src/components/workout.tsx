import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button, Flex } from 'antd';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

interface WorkoutValues {
  bicepCurl: number;
  hammerCurl: number;
  bicepCurlPulse: number;
  tricepExtension: number;
  kickBack: number;
  tricepExtensionPulse: number;
  workoutPeriod: number;
  restPeriod: number;
}

function CountDown() {
  const location = useLocation();
  const workoutValues = location.state as WorkoutValues;
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [pauseText, setPauseText] = useState('Pause');

  const sequence = [];
  let count = 0;
  const sides = ['RIGHT', 'LEFT'];
  for (const [key, value] of Object.entries(workoutValues)) {
    const name =  key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
    for (let i = 0; i < value; i++) {
      for (const side of sides) {
        sequence.push({ workoutName: name, side, time: workoutValues.workoutPeriod });
      }
    }
    count += 1;
    if (count == 3) {
      sequence.push({ workoutName: 'Rest', side: '', time: workoutValues.restPeriod });
    }
    if (count == 6) {
      break; // stop after 6 exercises
    }
  }

  // show start screen before timer begins
  if (!started) {
    return (
      <Flex gap="middle" justify="center" align="center" className="h-screen">
        <Link to="/"><Button type="primary" size="large">Go Home</Button></Link>
        <Button type="primary" size="large" onClick={() => { setStarted(true); setCurrentStep(0); }}>
          Start Workout
        </Button>
      </Flex>
    );
  }

  // render only the current step
  const step = sequence[currentStep];
  if (!step) {
    // workout is finished, reset state
    setStarted(false);
    setCurrentStep(0);
  }

  return (
    <Flex
      key={currentStep}
      gap="middle"
      justify="center"
      align="center"
      vertical
      className="h-screen"
    >
      <h1 className="font-bold text-7xl text-center">{step.workoutName}</h1>
      {step.side && (
        <h2 className="text-4xl font-semibold text-center">
          {step.side} ARM
        </h2>
      )}
      <CountdownCircleTimer
        key={currentStep}
        isPlaying={isPlaying}
        duration={step.time}
        size={300}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[step.time * 0.75, step.time * 0.5, step.time * 0.25, 0]}
        onComplete={() => {
          setCurrentStep(i => i + 1);
          return { shouldRepeat: false, delay: 1 };
        }}
      >
        {({ remainingTime }) => (
          <div className="text-8xl font-bold">{remainingTime}</div>
        )}
      </CountdownCircleTimer>

      <Flex gap="middle" justify="center" align="center" className='p-4'>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            setCurrentStep(i => i + 1);
          }}
          >Skip</Button>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            setStarted(false);
            setCurrentStep(0);
          }
          }>End</Button>
        
        <Button type="primary"
          size="large"
          onClick={() => {
            setIsPlaying(!isPlaying);
            setPauseText(isPlaying ? 'Resume' : 'Pause');
          }}
          >{pauseText}</Button>
        </Flex>
    </Flex>
  );
}

export default CountDown;