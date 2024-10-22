import { useEffect, useState } from "react";

type CountdownStatus = 'IDLE' | 'IN_PROGRESS' | 'COMPLETED';

interface CountdownState {
  hours: number;
  minutes: number;
  seconds: number;
  status: CountdownStatus;
}

interface OptionInterface {
  interval?: number;
}

function parseTimeString(timeString: string) {
  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  return { hours, minutes, seconds };
}

function useCountdown(timeString: string, option: OptionInterface = {}): CountdownState {
  const { interval = 1000 } = option;
  const { hours, minutes, seconds } = parseTimeString(timeString);

  const [state, setState] = useState<CountdownState>({
    hours,
    minutes,
    seconds,
    status: 'IDLE',
  });

  useEffect(() => {
    if (state.status === 'COMPLETED') return;

    const intervalId = setInterval(() => {
      setState((prevState) => {
        const totalSeconds = prevState.hours * 3600 + prevState.minutes * 60 + prevState.seconds;
        if (totalSeconds <= 0) {
          clearInterval(intervalId);
          return { ...prevState, status: 'COMPLETED' };
        }

        const newHours = Math.floor((totalSeconds - 1) / 3600);
        const newMinutes = Math.floor((totalSeconds - 1) % 3600 / 60);
        const newSeconds = (totalSeconds - 1) % 60;

        return {
          hours: newHours,
          minutes: newMinutes,
          seconds: newSeconds,
          status: 'IN_PROGRESS',
        };
      });
    }, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [state.status, interval]);

  useEffect(() => {
    if (state.hours > 0 || state.minutes > 0 || state.seconds > 0) {
      setState((prevState) => ({ ...prevState, status: 'IN_PROGRESS' }));
    }
  }, [state.hours, state.minutes, state.seconds]);

  return state;
}

export default useCountdown;