import { keyframes } from "styled-components";

export const fadeIn = keyframes`
    0% {
        opacity: 0;
    } 100% {
        opacity: 1;
    }
`;

export const fadeOut = keyframes`
    0% {
        opacity: 1;
    } 100% {
        opacity: 0;
    }
`;

export const heightIn = keyframes`
    0% {
        height: 0;
    } 100% {
        height: 72px;
    }
`;
