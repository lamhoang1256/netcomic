interface Icon404Props extends React.SVGProps<SVGSVGElement> {}

const Icon404 = ({ ...props }: Icon404Props) => {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_1939_72580)">
        <path
          d="M120 18L120.241 18.4578C120.554 19.012 120.988 19.4699 121.542 19.759L122 20L121.542 20.241C120.988 20.5542 120.53 20.988 120.241 21.5422L120 22L119.759 21.5422C119.446 20.988 119.012 20.5301 118.458 20.241L118 20L118.458 19.759C119.012 19.4458 119.47 19.012 119.759 18.4578L120 18Z"
          fill="#FFCE73"
        ></path>
        <path
          d="M121 113L121.241 113.458C121.554 114.012 121.988 114.47 122.542 114.759L123 115L122.542 115.241C121.988 115.554 121.53 115.988 121.241 116.542L121 117L120.759 116.542C120.446 115.988 120.012 115.53 119.458 115.241L119 115L119.458 114.759C120.012 114.446 120.47 114.012 120.759 113.458L121 113Z"
          fill="#C042FF"
        ></path>
        <circle cx="18" cy="122" r="2" fill="url(#paint0_linear_1939_72580)"></circle>
        <circle cx="17" cy="17" r="3" fill="url(#paint1_linear_1939_72580)"></circle>
        <g opacity="0.04" filter="url(#filter0_d_1939_72580)">
          <path
            d="M124 70.2813C124 74.5 123.438 78.7188 122.594 82.6563C122.031 85.1875 121.187 87.4375 120.344 89.6875C115 103.75 103.75 115 89.6875 120.344C88.5625 120.625 87.7187 121.188 86.5937 121.469C81.25 123.156 75.9062 124 70 124C40.1875 124 16 99.8125 16 70C16 40.1875 40.1875 16 70 16C99.8125 16.2813 124 40.4687 124 70.2813Z"
            fill="white"
          ></path>
        </g>
        <path
          opacity="0.12"
          d="M70 114C94.3005 114 114 94.3005 114 70C114 45.6995 94.3005 26 70 26C45.6995 26 26 45.6995 26 70C26 94.3005 45.6995 114 70 114Z"
          fill="#FF493F"
        ></path>
        <path
          d="M70 102C87.6731 102 102 87.6731 102 70C102 52.3269 87.6731 38 70 38C52.3269 38 38 52.3269 38 70C38 87.6731 52.3269 102 70 102Z"
          fill="#FF493F"
        ></path>
        <path
          d="M66.0088 60.1578L67.6638 73.8124C67.8148 75.3129 68.8688 76.6634 70.3738 76.6634C71.5778 76.6634 72.7818 75.3129 73.0828 73.8124L74.7388 60.1578C75.1898 56.8566 73.0828 54.0057 70.5238 54.0057C67.6638 53.8556 65.8578 56.7066 66.0088 60.1578Z"
          fill="white"
        ></path>
        <path
          d="M70.3739 86.2672C72.1189 86.2672 73.5349 84.8562 73.5349 83.1162C73.5349 81.3752 72.1189 79.9648 70.3739 79.9648C68.6279 79.9648 67.2129 81.3752 67.2129 83.1162C67.2129 84.8562 68.6279 86.2672 70.3739 86.2672Z"
          fill="white"
        ></path>
      </g>
      <defs>
        <filter
          id="filter0_d_1939_72580"
          x="-1.33333"
          y="9.5"
          width="142.667"
          height="142.667"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          ></feColorMatrix>
          <feOffset dy="10.8333"></feOffset>
          <feGaussianBlur stdDeviation="8.66667"></feGaussianBlur>
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.054902 0 0 0 0 0.0156863 0 0 0 0 0.133333 0 0 0 0.88 0"
          ></feColorMatrix>
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1939_72580"
          ></feBlend>
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1939_72580"
            result="shape"
          ></feBlend>
        </filter>
        <linearGradient
          id="paint0_linear_1939_72580"
          x1="16.0927"
          y1="122.012"
          x2="19.8956"
          y2="122.012"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF66A9"></stop>
          <stop offset="1" stopColor="#F53689"></stop>
        </linearGradient>
        <linearGradient
          id="paint1_linear_1939_72580"
          x1="14.1391"
          y1="17.0175"
          x2="19.8435"
          y2="17.0175"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF66A9"></stop>
          <stop offset="1" stopColor="#F53689"></stop>
        </linearGradient>
        <clipPath id="clip0_1939_72580">
          <rect width="140" height="140" fill="white"></rect>
        </clipPath>
      </defs>
    </svg>
  );
};

export default Icon404;
