import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { incrementTime } from "../store/gameSlice";

export default function useGameTimer() {
  const dispatch = useDispatch();
  const winner = useSelector((state: RootState) => state.game.winner);

  useEffect(() => {
    let interval: number | null = null;

    if (!winner) {
        interval = window.setInterval(() => {
        dispatch(incrementTime());
      }, 1000);
    }

    return () => {
      if (interval) {
        window.clearInterval(interval);
      }
    };
  }, [winner, dispatch]);
}
