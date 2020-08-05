import React from "react";

type _Props = {
  value: string;
};

function Time({ value }: _Props) {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return (
    <>
      {year}-{month}-{day} {hours}:{minutes < 10 ? `0${minutes}` : minutes}
    </>
  );
}

export default Time;
