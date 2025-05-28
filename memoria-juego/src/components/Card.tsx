import React from "react";
import { Card, CardActionArea, CardMedia, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { flipCard } from "../store/gameSlice";
import type { CardState } from "../store/gameSlice";

interface Props {
  card: CardState;
}

const CardComponent: React.FC<Props> = ({ card }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    if (!card.flipped && !card.matched) {
      console.log(",,,,,,,Flip card id:", card.id);
      dispatch(flipCard(card));
    }
  };

 // console.log("Render card id:", card.id, "flipped:", card.flipped, "image:", card.character?.image);
  // console.log("Image URL:", card.character?.image);

  // console.log("CardComponent props:", card);

  return (

      <CardActionArea sx={{ width: 120, height: 120, margin: 1 }} onClick={handleClick} disabled={card.flipped || card.matched}>
        {card.flipped? (
          <CardMedia
            component="img"
            image={card.character?.image}
            alt={card.character?.name}
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <Box sx={{ width: "100%", height: "100%", bgcolor: "#80cbc4" }} />
        )}
      </CardActionArea>
  );
};

// Memoizamos y comparamos props para evitar renders innecesarios
export default React.memo(CardComponent, (prevProps, nextProps) => {
  return (
    prevProps.card.id === nextProps.card.id &&
    prevProps.card.flipped === nextProps.card.flipped &&
    prevProps.card.matched === nextProps.card.matched &&
    prevProps.card.character?.image === nextProps.card.character?.image
  );
});
