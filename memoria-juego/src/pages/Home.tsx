import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../store/gameSlice";

const validationSchema = Yup.object({
  nickname: Yup.string().required("Requerido"),
});

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values: { nickname: string }) => {
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      name: values.nickname,
      gameTime: "0s",
    };
    dispatch(setUser(user));
    localStorage.setItem(`user_${user.id}`, JSON.stringify(user));
    navigate("/game");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Juego de Memoria - Rick y Morty</h1>
      <Formik initialValues={{ nickname: "" }} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form>
          <div>
            <label>Nickname</label>
            <Field name="nickname" type="text" />
            <ErrorMessage name="nickname">{(msg) => <div style={{ color: "red" }}>{msg}</div>}</ErrorMessage>
          </div>
          <button type="submit">Jugar</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Home;
