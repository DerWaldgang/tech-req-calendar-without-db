import { Layout } from "antd";
import React, { useEffect } from "react";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";
import "./App.css";
import { useDispatch } from "react-redux";
import { auth, logIn } from "./store/reducers/authSlice";
import { reAddEvents } from "./store/reducers/eventsSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("isAuth")) {
      dispatch(auth({}));
      dispatch(
        logIn({ username: localStorage.getItem("username"), password: "12345" })
      );
      if (localStorage.getItem("events") !== null) {
        const eventsData = JSON.parse(localStorage.getItem("events") || "");
        dispatch(reAddEvents(eventsData));
      }
    }
  }, [dispatch]);

  return (
    <Layout>
      <Navbar />
      <Layout.Content>
        <AppRouter />
      </Layout.Content>
    </Layout>
  );
}

export default App;
