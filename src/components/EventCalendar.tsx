import { Calendar } from "antd";
import { Moment } from "moment";
import React, { FC } from "react";
import { IEvent } from "../types/types";
import { formDate } from "../utils/date";

interface EventCalendarProps {
  events: IEvent[];
}

const EventCalendar: FC<EventCalendarProps> = ({ events }) => {
  const dataCellRender = (value: Moment) => {
    const formatedDate = formDate(value.toDate());
    const currentDayEvents = events.filter((e) => e.date === formatedDate);
    return (
      <div>
        {currentDayEvents.map((e, index) => (
          <p key={index}>{e.description}</p>
        ))}
      </div>
    );
  };

  return <Calendar dateCellRender={dataCellRender} />;
};

export default EventCalendar;
