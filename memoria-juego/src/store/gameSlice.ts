import { createSlice } from "@reduxjs/toolkit";

export type Character = {
  id: number;
  name: string;
  image: string;
};

export type CardState = {
  id: number;
  character: Character | null;
  flipped: boolean;
  matched: boolean;
  locked: boolean;
};

type GameState = {
  cards: CardState[];
  firstCard: CardState | null;
  secondCard: CardState | null;
  lockBoard: boolean;
  matches: number;
  totalMatches: number;
  time: number;
  winner: boolean;
  user: { id: string; name: string; gameTime: string };
};

const initialState: GameState = {
  cards: [],
  firstCard: null,
  secondCard: null,
  lockBoard: false,
  matches: 0,
  totalMatches: 0,
  time: 0,
  winner: false,
  user: { id: "", name: "", gameTime: "0s" },
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setCards(state, action) {
      state.cards = action.payload;
      state.totalMatches = action.payload.length / 2;
    },
    flipCard(state, action) {
      if (state.lockBoard) return;

      const cardId = action.payload.id;
      const index = state.cards.findIndex((c) => c.id === cardId);
      const card = state.cards[index];

      if (!card || card.matched || card.flipped || card.locked) return;

      state.cards[index] = { ...card, flipped: true };

      if (!state.firstCard) {
        state.firstCard = state.cards[index];
      } else if (!state.secondCard) {
        state.secondCard = state.cards[index];
        state.lockBoard = true;
      }
    },
    matchCards(state) {
      if (!state.firstCard || !state.secondCard) return;

      const firstIndex = state.cards.findIndex((c) => c.id === state.firstCard!.id);
      const secondIndex = state.cards.findIndex((c) => c.id === state.secondCard!.id);

      if (firstIndex !== -1 && secondIndex !== -1) {
        state.cards[firstIndex].matched = true;
        state.cards[secondIndex].matched = true;
      }

      state.matches += 1;
      state.firstCard = null;
      state.secondCard = null;
      state.lockBoard = false;

      if (state.matches === state.totalMatches) {
        state.winner = true;
      }
    },
    resetCards(state) {
      if (!state.firstCard || !state.secondCard) return;

      const firstIndex = state.cards.findIndex((c) => c.id === state.firstCard!.id);
      const secondIndex = state.cards.findIndex((c) => c.id === state.secondCard!.id);

      if (firstIndex !== -1 && secondIndex !== -1) {
        state.cards[firstIndex].flipped = false;
        state.cards[secondIndex].flipped = false;
      }

      state.firstCard = null;
      state.secondCard = null;
      state.lockBoard = false;
    },

    incrementTime(state) {
      state.time += 1;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    resetGame(state) {
      state.cards.forEach((card) => {
        card.flipped = false;
        card.matched = false;
      });
      state.matches = 0;
      state.time = 0;
      state.winner = false;
      state.firstCard = null;
      state.secondCard = null;
      state.lockBoard = false;
    },
  },
});

export const { setCards, flipCard, matchCards, resetCards, incrementTime, setUser, resetGame } =
  gameSlice.actions;

export default gameSlice.reducer;
