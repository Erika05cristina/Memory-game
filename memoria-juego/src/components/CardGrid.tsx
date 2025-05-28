// src/components/CardGrid.tsx
import React from "react";
import Card from "./Card";
import type { CardState } from "../store/gameSlice";

interface Props {
  cards: CardState[];
}

const CardGrid: React.FC<Props> = ({ cards }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
};

export default React.memo(CardGrid);
