import { Layout, Menu, Row } from "antd";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { RootState } from "../store";
import { logOut } from "../store/reducers/authSlice";

const Navbar: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuth = useTypedSelector((state: RootState) => state.auth.isAuth);

  const handleLogOut = () => {
    dispatch(logOut({}));
    navigate("/login");
    localStorage.removeItem("isAuth");
    localStorage.removeItem("username");
  };

  return (
    <Layout.Header>
      <Row justify="end">
        {isAuth ? (
          <>
            <div style={{ color: "white" }}>USER</div>

            <Menu theme="dark" mode="horizontal">
              <Menu.Item key={1} onClick={handleLogOut}>
                <span>Выйти</span>
              </Menu.Item>
            </Menu>
          </>
        ) : (
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key={1} onClick={() => navigate("/login")}>
              <span>Логин</span>
            </Menu.Item>
          </Menu>
        )}
      </Row>
    </Layout.Header>
  );
};

export default Navbar;
