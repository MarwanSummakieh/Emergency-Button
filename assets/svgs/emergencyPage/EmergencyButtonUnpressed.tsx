import * as React from "react";
import Svg, {
  SvgProps,
  Circle,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

const SvgComponent = (props: SvgProps) => (
  <Svg width={288} height={288} fill="none" {...props}>
    <Circle
      cx={144}
      cy={144}
      r={142}
      fill="#F7FAFD"
      stroke="url(#a)"
      strokeOpacity={0.2}
      strokeWidth={3}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M231.782 92.182c-.143-7.527-7.817-11.377-15.591-10.889-4.36.275-15.57 2.84-31.96-3.555-13.812-5.386-18.078-14.524-32.534-18.883-3.768-1.14-10.156-1.14-13.928 0-14.453 4.359-18.722 13.497-32.534 18.884-16.386 6.394-27.586 3.565-31.957 3.554-8.198-.017-13.92 4.712-13.917 12.51 0 0-9.61 91.257 70.297 129.357 1.765.841 8.311 3.83 15.003 3.84h.147c6.689-.014 13.238-2.999 15-3.84 79.91-38.1 71.974-130.978 71.974-130.978Z"
      fill="#F7FAFD"
      stroke="url(#b)"
      strokeOpacity={0.4}
      strokeWidth={3}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M182.49 167.473c-5.117 7.362-12.315 14.684-19.732 19.854-6.012 4.191-12.082 7.775-17.473 8.673-5.503-1.059-11.943-5.033-18.156-9.792-6.551-5.019-12.865-11.892-17.619-18.731-12.987-18.679-12.628-38.06.804-47.536 9.774-6.902 23.78-4.327 35.688 4.521 11.907-8.845 25.91-11.423 35.687-4.521 13.429 9.473 13.787 28.853.801 47.532Z"
      fill="#fff"
      stroke="url(#c)"
      strokeOpacity={0.41}
      strokeWidth={3}
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={60.324}
        y1={55.486}
        x2={245.601}
        y2={136.658}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#33DDEC" />
        <Stop offset={1} stopColor="#34AAFC" />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={94.528}
        y1={89.828}
        x2={206.527}
        y2={140.057}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#33DDEC" />
        <Stop offset={1} stopColor="#34AAFC" />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={118.894}
        y1={131.067}
        x2={175.95}
        y2={159.813}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#33DDEC" />
        <Stop offset={1} stopColor="#34AAFC" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default SvgComponent;
