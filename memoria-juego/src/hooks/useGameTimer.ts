import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { incrementTime } from "../store/gameSlice";

export default function useGameTimer() {
  const dispatch = useDispatch();
  const winner = useSelector((state: RootState) => state.game.winner);

  useEffect(() => {
    let interval: number | undefined = undefined;

    if (!winner) {
      interval = setInterval(() => {
        dispatch(incrementTime());
      }, 1000);
    }

    if (winner) {
      clearInterval(interval);
      return
    };

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [winner]);
}
