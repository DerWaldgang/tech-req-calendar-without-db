import { Button, DatePicker, Form, Input, Row, Select } from "antd";
import { Moment } from "moment";
import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { RootState } from "../store";
import { addEvents } from "../store/reducers/eventsSlice";
import { IEvent, IUser } from "../types/types";
import { formDate } from "../utils/date";

interface EventFormProps {
  guests: IUser[];
  setVisible: (arg: boolean) => void;
}

const EventForm: FC<EventFormProps> = ({ guests, setVisible }) => {
  const user = useTypedSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const [event, setEvent] = useState<IEvent>({
    author: "",
    date: "",
    description: "",
    guest: "",
  } as IEvent);

  const selectDate = (date: Moment | null) => {
    if (date) {
      setEvent({
        ...event,
        author: user.username,
        date: formDate(date.toDate()),
      });
    }
  };

  const submitForm = () => {
    dispatch(addEvents(event));
    setVisible(false);
  };

  return (
    <Form onFinish={submitForm}>
      <Form.Item
        label="Название события"
        name="description"
        rules={[{ required: true, message: "Description requiered field!" }]}
      >
        <Input
          value={event.description}
          onChange={(e) => setEvent({ ...event, description: e.target.value })}
        />
      </Form.Item>
      <Form.Item
        label="Выберите гостя"
        name="guest"
        rules={[{ required: true, message: "Guest requiered field!" }]}
      >
        <Select
          style={{ width: 287 }}
          onChange={(guest: string) => setEvent({ ...event, guest })}
        >
          {guests.map((guest) => {
            return (
              <Select.Option key={guest.username} value={guest.username}>
                {guest.username}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item
        label="Дата события"
        name="date"
        rules={[{ required: true, message: "Date requiered field!" }]}
      >
        <DatePicker onChange={(date) => selectDate(date)} />
      </Form.Item>

      <Row justify="end">
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Создать
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default EventForm;
