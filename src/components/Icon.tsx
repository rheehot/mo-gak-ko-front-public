import React from "react";

// * 하단 표기없이 사용 가능
export const Notification: React.FunctionComponent<{ size: string }> = ({
  size,
}) => (
  <svg
    height={size}
    width={size}
    viewBox="0 0 24 24"
    style={{ fill: "#606060" }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      className="heroicon-ui"
      d="M15 19a3 3 0 0 1-6 0H4a1 1 0 0 1 0-2h1v-6a7 7 0 0 1 4.02-6.34 3 3 0 0 1 5.96 0A7 7 0 0 1 19 11v6h1a1 1 0 0 1 0 2h-5zm-4 0a1 1 0 0 0 2 0h-2zm0-12.9A5 5 0 0 0 7 11v6h10v-6a5 5 0 0 0-4-4.9V5a1 1 0 0 0-2 0v1.1z"
    />
  </svg>
);

// * 하단 표기없이 사용 가능
export const Search: React.FunctionComponent<{ size: string }> = ({ size }) => (
  <svg
    enableBackground="new 0 0 512 512"
    width={size}
    height={size}
    style={{ fill: "#888" }}
    id="Layer_1"
    version="1.1"
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M497.913,497.913c-18.782,18.782-49.225,18.782-68.008,0l-84.862-84.863c-34.889,22.382-76.13,35.717-120.659,35.717  C100.469,448.767,0,348.312,0,224.383S100.469,0,224.384,0c123.931,0,224.384,100.452,224.384,224.383  c0,44.514-13.352,85.771-35.718,120.676l84.863,84.863C516.695,448.704,516.695,479.131,497.913,497.913z M224.384,64.109  c-88.511,0-160.274,71.747-160.274,160.273c0,88.526,71.764,160.274,160.274,160.274c88.525,0,160.273-71.748,160.273-160.274  C384.657,135.856,312.909,64.109,224.384,64.109z" />
  </svg>
);

// * 판매를 제외한 모든 이용 가능

export const Plus: React.FunctionComponent<{ size: string }> = ({ size }) => (
  <svg
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    style={{
      fill: "none",
      stroke: "#333",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2px",
    }}
  >
    <title />
    <g id="plus">
      <line className="cls-1" x1="16" x2="16" y1="7" y2="25" />
      <line className="cls-1" x1="7" x2="25" y1="16" y2="16" />
    </g>
  </svg>
);

// * Open Font License (판매를 제외한 모든 상업적 이용 가능)
export const Github: React.FunctionComponent<{ size: string }> = ({ size }) => (
  <svg
    height={size}
    version="1.1"
    viewBox="0 0 60 60"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <title />
    <desc />
    <defs />
    <g fill="none" fillRule="evenodd" id="soical" stroke="none" strokeWidth="1">
      <g id="social" transform="translate(-1073.000000, -638.000000)">
        <g id="slices" transform="translate(173.000000, 138.000000)" />
        <g
          fill="#000000"
          id="square-black"
          transform="translate(173.000000, 138.000000)"
        >
          <path
            d="M902.995937,500 L957.004063,500 C958.658673,500 960,501.33731 960,502.995937 L960,557.004063 C960,558.658673 958.66269,560 957.004063,560 L902.995937,560 C901.341327,560 900,558.66269 900,557.004063 L900,502.995937 C900,501.341327 901.33731,500 902.995937,500 Z"
            id="square-60"
          />
        </g>
        <g
          fill="#FFFFFF"
          id="icon"
          transform="translate(182.000000, 150.000000)"
        >
          <path
            d="M916.425274,535.516889 C916.425274,535.067173 916.409407,533.877227 916.40034,532.296831 C911.265178,533.440294 910.181705,529.758899 910.181705,529.758899 C909.3419,527.571909 908.131493,526.989719 908.131493,526.989719 C906.455284,525.81488 908.258427,525.839283 908.258427,525.839283 C910.111438,525.97292 911.08611,527.790376 911.08611,527.790376 C912.732853,530.682734 915.406401,529.848378 916.459274,529.3638 C916.627008,528.140155 917.104144,527.305798 917.631147,526.832841 C913.531857,526.355236 909.221766,524.730682 909.221766,517.477126 C909.221766,515.410989 909.941437,513.721359 911.122377,512.397777 C910.933109,511.91901 910.298439,509.994645 911.303711,507.388152 C911.303711,507.388152 912.85412,506.879172 916.37994,509.328786 C917.852149,508.909284 919.432024,508.69779 921.002833,508.690817 C922.570242,508.69779 924.148985,508.909284 925.624593,509.328786 C929.148146,506.879172 930.696289,507.388152 930.696289,507.388152 C931.703828,509.993483 931.070291,511.917848 930.87989,512.397777 C932.063096,513.721359 932.7771,515.410989 932.7771,517.477126 C932.7771,524.749274 928.460209,526.349426 924.347319,526.817735 C925.011456,527.402249 925.600793,528.557333 925.600793,530.323659 C925.600793,532.854618 925.576993,534.896351 925.576993,535.516889 C925.576993,536.023545 925.910195,536.611546 926.847467,536.426779 C934.176775,533.919061 939.461538,526.828193 939.461538,518.46836 C939.461538,508.013339 931.194958,499.538462 920.999433,499.538462 C910.805042,499.538462 902.538462,508.013339 902.538462,518.46836 C902.539595,526.830517 907.828892,533.926034 915.165,536.429103 C916.087539,536.602249 916.425274,536.017735 916.425274,535.516889 Z"
            id="github"
          />
        </g>
      </g>
    </g>
  </svg>
);

// SIL Open Font License (OFL)
export const ArrowLeft: React.FunctionComponent<{
  size: string;
}> = ({ size }) => (
  <svg
    viewBox="0 0 1792 1792"
    height={size}
    width={size}
    style={{ fill: "#ff9500" }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1664 896v128q0 53-32.5 90.5t-84.5 37.5h-704l293 294q38 36 38 90t-38 90l-75 76q-37 37-90 37-52 0-91-37l-651-652q-37-37-37-90 0-52 37-91l651-650q38-38 91-38 52 0 90 38l75 74q38 38 38 91t-38 91l-293 293h704q52 0 84.5 37.5t32.5 90.5z" />
  </svg>
);

// * 아이콘을 판매하는 것 제외하고 어떤 이용이든 가능, 저자 표기는 자유
export const ArrowRight: React.FunctionComponent<{ size: string }> = ({
  size,
}) => (
  <svg
    height={size}
    width={size}
    id="Layer_1"
    version="1.1"
    viewBox="0 0 128 128"
  >
    <g>
      <g>
        <line
          style={{
            fill: "none",
            stroke: "#2F3435",
            strokeWidth: "12",
            strokeLinecap: "square",
            strokeMiterlimit: 10,
          }}
          x1="70.88"
          x2="110.213"
          y1="24.666"
          y2="64"
        />
        <line
          style={{
            fill: "none",
            stroke: "#2F3435",
            strokeWidth: "12",
            strokeLinecap: "square",
            strokeMiterlimit: 10,
          }}
          x1="110.213"
          x2="70.88"
          y1="64"
          y2="103.334"
        />
      </g>
      <line
        style={{
          fill: "none",
          stroke: "#2F3435",
          strokeWidth: "12",
          strokeMiterlimit: 10,
        }}
        x1="110.213"
        x2="9.787"
        y1="64"
        y2="64"
      />
    </g>
  </svg>
);

// * Free Icon, 저자 표기 자유, 파는 것만 금지
export const Edit: React.FunctionComponent<{ size: string }> = ({ size }) => (
  <svg
    height={size}
    version="1.1"
    viewBox="0 0 18 18"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <title />
    <desc />
    <defs />
    <g fill="none" fillRule="evenodd" id="Page-1" stroke="none" strokeWidth="1">
      <g
        fill="#767676"
        id="Core"
        transform="translate(-213.000000, -129.000000)"
      >
        <g id="create" transform="translate(213.000000, 129.000000)">
          <path
            d="M0,14.2 L0,18 L3.8,18 L14.8,6.9 L11,3.1 L0,14.2 L0,14.2 Z M17.7,4 C18.1,3.6 18.1,3 17.7,2.6 L15.4,0.3 C15,-0.1 14.4,-0.1 14,0.3 L12.2,2.1 L16,5.9 L17.7,4 L17.7,4 Z"
            id="Shape"
          />
        </g>
      </g>
    </g>
  </svg>
);

// * Free Icon, 파는 것만 금지
export const Mail: React.FunctionComponent<{ size: string }> = ({ size }) => (
  <svg
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    style={{ fill: "#fcfcfc" }}
  >
    <title />
    <g id="mail">
      <path d="M29,6H3L2.92,6a.78.78,0,0,0-.21,0l-.17.07a.65.65,0,0,0-.15.1.67.67,0,0,0-.15.14l-.06.06a.36.36,0,0,0,0,.09,1.08,1.08,0,0,0-.08.19A1.29,1.29,0,0,0,2,6.9S2,7,2,7V25a1,1,0,0,0,1,1H29a1,1,0,0,0,1-1V7A1,1,0,0,0,29,6ZM16,14.81,6.2,8H27.09ZM4,24V8.91l11.43,7.91,0,0a1.51,1.51,0,0,0,.18.09l.08,0A1.09,1.09,0,0,0,16,17h0a1,1,0,0,0,.41-.1l.07,0,0,0L28,9.79V24Z" />
    </g>
  </svg>
);

// * SIL License
export const Question: React.FunctionComponent<{ size: string }> = ({
  size,
}) => (
  <svg
    viewBox="0 0 1792 1792"
    width={size}
    height={size}
    style={{ fill: "#fcfcfc" }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1088 1256v240q0 16-12 28t-28 12h-240q-16 0-28-12t-12-28v-240q0-16 12-28t28-12h240q16 0 28 12t12 28zm316-600q0 54-15.5 101t-35 76.5-55 59.5-57.5 43.5-61 35.5q-41 23-68.5 65t-27.5 67q0 17-12 32.5t-28 15.5h-240q-15 0-25.5-18.5t-10.5-37.5v-45q0-83 65-156.5t143-108.5q59-27 84-56t25-76q0-42-46.5-74t-107.5-32q-65 0-108 29-35 25-107 115-13 16-31 16-12 0-25-8l-164-125q-13-10-15.5-25t5.5-28q160-266 464-266 80 0 161 31t146 83 106 127.5 41 158.5z" />
  </svg>
);
