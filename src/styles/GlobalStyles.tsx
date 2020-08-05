import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
    ${reset};
    * {
        box-sizing: border-box;
    }
    html {
        width: 100%;
        height: 100%;
    }
    body {
        width: 100%;
        height: 100%;
        font-family: ${(props) => props.theme.font.default};
        background-color: ${(props) => props.theme.bgColor.body};
        color: ${(props) => props.theme.color.black};
    }
    #root {
        width: 100%;
        height: 100%;
        /* display: flex;
        flex-direction: column;
        min-height: 100vh; */
    }
    a {
        color: inherit;
        text-decoration: none;
    }
`;
