import { Button, Form, Input } from "antd";
import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { logIn } from "../store/reducers/authSlice";

const LoginForm: FC = () => {
  const dispatch = useDispatch();
  const error = useTypedSelector((state) => state.auth.error);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = () => {
    dispatch(logIn({ username, password }));
    setUsername("");
    setPassword("");
  };

  return (
    <Form onFinish={submit}>
      {" "}
      {error && <div style={{ color: "red" }}> {error}</div>}
      <Form.Item
        label="Имя пользователя:"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
      </Form.Item>
      <Form.Item
        label="Пароль:"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={"password"}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
