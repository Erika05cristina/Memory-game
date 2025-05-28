import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface UserStat {
  id: string;
  name: string;
  gameTime: string;
}

const Stats: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserStat[]>([]);

  useEffect(() => {
    const storedUsers = Object.keys(localStorage)
      .filter((key) => key.startsWith("user_"))
      .map((key) => JSON.parse(localStorage.getItem(key)!))
      .sort((a, b) => {
        const aSec = parseInt(a.gameTime.split(":")[0]) * 60 + parseInt(a.gameTime.split(":")[1]);
        const bSec = parseInt(b.gameTime.split(":")[0]) * 60 + parseInt(b.gameTime.split(":")[1]);
        return aSec - bSec;
      });

    setUsers(storedUsers);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Estadísticas</h1>
      <List>
        {users.map((user) => (
          <ListItem key={user.id}>
            <ListItemText primary={`${user.name}: ${user.gameTime}`} />
          </ListItem>
        ))}
      </List>
      <Button variant="contained" onClick={() => navigate("/")}>
        Volver al inicio
      </Button>
    </div>
  );
};

export default Stats;
