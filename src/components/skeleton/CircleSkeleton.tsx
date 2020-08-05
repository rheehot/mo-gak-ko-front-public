import React from "react";
import styled from "styled-components";

const Circle = styled.div<{ size: string }>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  background-color: ${(props) => props.theme.bgColor.skeleton};
  border-radius: 50%;
`;

const CircleSkeleton: React.FunctionComponent<{ size: string }> = ({
  size,
}) => {
  return <Circle size={size}></Circle>;
};

export default CircleSkeleton;
