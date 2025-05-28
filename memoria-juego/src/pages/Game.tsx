import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters } from "../utils/fetchCharacters";
import { setCards, matchCards, resetCards } from "../store/gameSlice";
import type { RootState } from "../store/store";
import useGameTimer from "../hooks/useGameTimer";
import CardGrid from "../components/CardGrid";
import GameOverModal from "../components/GameOverModal";

const Game: React.FC = () => {
  const dispatch = useDispatch();
  const cards = useSelector((state: RootState) => state.game.cards);
  const winner = useSelector((state: RootState) => state.game.winner);
  const time = useSelector((state: RootState) => state.game.time);
  const user = useSelector((state: RootState) => state.game.user);
  const firstCard = useSelector((state: RootState) => state.game.firstCard);
  const secondCard = useSelector((state: RootState) => state.game.secondCard);

  useGameTimer();

  useEffect(() => {
    const loadCharacters = async () => {
      const characters = await fetchCharacters();
      const duplicated = characters.flatMap((char) => [char, char]);
      const shuffled = duplicated
        .map((char) => ({ ...char, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map((char, index) => ({
          id: index,
          character: {
            id: char.id,
            name: char.name,
            image: char.image,
          },
          flipped: false,
          matched: false,
          locked: false,
        }));

      dispatch(setCards(shuffled));
    };

    loadCharacters();
  }, [dispatch]);

  useEffect(() => {
    if (winner) {
      const newTime = `${Math.floor(time / 60)}:${time % 60}s`;
      const updatedUser = { ...user, gameTime: newTime };
      dispatch({ type: "game/setUser", payload: updatedUser });
      localStorage.setItem(`user_${updatedUser.id}`, JSON.stringify(updatedUser));
    }
  }, [winner, time, user, dispatch]);

  
  useEffect(() => {
    if (firstCard && secondCard) {
      if (firstCard.character?.id === secondCard.character?.id) {
        dispatch(matchCards());
      } else {
        setTimeout(() => {
          dispatch(resetCards());
        }, 1000); 
      }
    }
  }, [firstCard, secondCard, dispatch]);

  const handleRestart = () => {
    dispatch({ type: "game/resetGame" });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Juego de Memoria</h1>
      <p>
        Tiempo: {Math.floor(time / 60)}:{time % 60}s
      </p>
      <CardGrid cards={cards} />
      {winner && <GameOverModal onRestart={handleRestart} />}
    </div>
  );
};

export default Game;
