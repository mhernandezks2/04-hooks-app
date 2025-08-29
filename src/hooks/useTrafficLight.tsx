import { useEffect, useState } from 'react'

export const colors = {
    red: 'bg-red-500 animate-pulse',
    yellow: 'bg-yellow-500 animate-pulse',
    green: 'bg-green-500 animate-pulse',
};

export type TrafficLightColor = keyof typeof colors;

export const useTrafficLight = (color: TrafficLightColor = 'red') => {
  const [light, setLight] = useState<TrafficLightColor>(color);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown < 1) return;
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  useEffect(() => {
    if (countdown > 0) return;

    setCountdown(5);

    if (light === 'red') {
      setLight('green');
      return;
    }

    if (light === 'yellow') {
      setLight('red');
      return;
    }

    if (light === 'green') {
      setLight('yellow');
      return;
    }
  }, [countdown, light]);

  return { 
    //Values
    light, 
    countdown, 
    colors,

    //Computed
    redLight: light === 'red' ? colors.red : 'bg-gray-500',
    yellowLight: light === 'yellow' ? colors.yellow : 'bg-gray-500',
    greenLight: light === 'green' ? colors.green : 'bg-gray-500',
    percentage: (countdown / 5) * 100
  };
}
