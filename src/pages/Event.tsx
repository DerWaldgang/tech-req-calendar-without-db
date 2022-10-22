import { Modal, Row } from "antd";
import Layout from "antd/lib/layout/layout";
import { Button } from "antd/lib/radio";
import React, { FC, useState } from "react";
import EventCalendar from "../components/EventCalendar";
import EventForm from "../components/EventForm";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IUser } from "../types/types";

const Event: FC = () => {
  const [visible, setVisible] = useState(false);

  const { events } = useTypedSelector((state) => state.events);

  const mockUsers: IUser[] = [
    { username: "user", password: "12345" },
    { username: "admin", password: "123456" },
    { username: "dond", password: "1234567" },
  ];

  return (
    <Layout>
      <Row
        justify="center"
        style={{
          height: "50px",
          backgroundColor: "white",
          alignItems: "center",
        }}
      >
        <Button onClick={() => setVisible(true)}>Добавить событие</Button>
      </Row>
      <EventCalendar events={events} />
      <Modal
        title="Добавить событие"
        open={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <EventForm guests={mockUsers} setVisible={() => setVisible(false)} />
      </Modal>
    </Layout>
  );
};

export default Event;
