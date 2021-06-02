import { useEffect, useRef, useState } from "react";

function calculateInitialSecondsRemaining(targetTime: number) {
  return Math.floor((targetTime - new Date().getTime()) / 1000);
}

export default function useSecondsRemaining(targetTime: number) {
  const [secondsRemaining, setSecondsRemaining] = useState(() =>
    calculateInitialSecondsRemaining(targetTime)
  );
  const interval = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const remaining = calculateInitialSecondsRemaining(targetTime);
    setSecondsRemaining(remaining);

    const handle = (interval.current = setInterval(() => {
      if (calculateInitialSecondsRemaining(targetTime) < 0) {
        clearInterval(handle);
      } else {
        setSecondsRemaining((s) => s - 1);
      }
    }, 1000));

    return () => {
      clearInterval(interval.current);
    };
  }, [targetTime]);

  return Math.max(secondsRemaining, -1);
}
