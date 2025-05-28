import React from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Props {
  onRestart: () => void;
}

const GameOverModal: React.FC<Props> = ({ onRestart }) => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <Dialog open={true}>
      <DialogTitle>Felicidades!!</DialogTitle>
      <DialogContent>
        <p>Has completado el juego.</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleBackToHome}>Volver al inicio</Button>
        <Button onClick={onRestart} variant="contained" color="primary">
          Jugar de nuevo
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GameOverModal;
