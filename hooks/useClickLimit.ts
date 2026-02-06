import { useState } from "react";

interface UseClickLimitProps {
  maxClicks: number;
  onLimitReached: () => void;
}

export default function useClickLimit({
  maxClicks,
  onLimitReached,
}: UseClickLimitProps) {
  const [clickCount, setClickCount] = useState(0);

  const consumeClick = () => {
    if (clickCount + 1 >= maxClicks) {
      onLimitReached();
      return false;
    }
    setClickCount((prev) => prev + 1);
    return true;
  };

  return {
    consumeClick,
    remainingClicks: maxClicks - clickCount,
  };
}
