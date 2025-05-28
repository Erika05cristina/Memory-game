import React, { useEffect, useState } from "react";
import { Box, Button, List, ListItem, ListItemText, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface UserStat {
  id: string;
  name: string;
  gameTime: string;
}

const Statistics: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserStat[]>([]);

  useEffect(() => {
    // Leer todos los usuarios del localStorage
    const storedUsers = Object.keys(localStorage)
      .filter((key) => key.startsWith("user_")) // solo claves de usuarios
      .map((key) => JSON.parse(localStorage.getItem(key)!))
      .sort((a, b) => {
        // Ordenar por tiempo ascendente (mejor tiempo primero)
        const aTime = parseGameTime(a.gameTime);
        const bTime = parseGameTime(b.gameTime);
        return aTime - bTime;
      });

    setUsers(storedUsers);
  }, []);

  // Función auxiliar para convertir "X:YYs" a segundos
  const parseGameTime = (timeStr: string): number => {
    const [minutes, seconds] = timeStr.replace("s", "").split(":").map(Number);
    return minutes * 60 + seconds;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, maxWidth: 500, margin: "auto" }}>
        <Typography variant="h4" align="center" gutterBottom>
          🏆 Estadísticas
        </Typography>

        {users.length === 0 ? (
          <Typography align="center">No hay usuarios registrados aún.</Typography>
        ) : (
          <List>
            {users.map((user) => (
              <ListItem key={user.id}>
                <ListItemText primary={`${user.name}`} secondary={`Tiempo: ${user.gameTime}`} />
              </ListItem>
            ))}
          </List>
        )}

        <Button fullWidth variant="contained" color="primary" onClick={() => navigate("/")} sx={{ mt: 2 }}>
          Volver al inicio
        </Button>
      </Paper>
    </Box>
  );
};

export default Statistics;
