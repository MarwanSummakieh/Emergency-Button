import * as React from "react";
import Svg, {
	SvgProps,
	Circle,
	Path,
	Defs,
	LinearGradient,
	Stop
} from "react-native-svg";

const SvgComponent = (props: SvgProps) => (
	<Svg width={45} height={45} fill="none" {...props}>
		<Circle
			cx={22.5}
			cy={22.5}
			r={22.25}
			stroke="url(#a)"
			strokeWidth={0.5}
		/>
		<Path
			d="M22.5 6.91A11.59 11.59 0 0 1 34.09 18.5c0 5.508-3.708 10.767-11.52 15.737a.132.132 0 0 1-.141 0l-.487.767.488-.767c-7.812-4.97-11.52-10.229-11.52-15.737A11.59 11.59 0 0 1 22.5 6.91Z"
			stroke="#34AAFC"
			strokeWidth={1.818}
		/>
		<Path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M27.987 15.023c-.008-.446-.451-.674-.9-.645-.253.017-.9.168-1.848-.21-.799-.319-1.045-.86-1.88-1.117a1.626 1.626 0 0 0-.806 0c-.835.258-1.082.798-1.88 1.117-.948.378-1.595.21-1.848.21-.473 0-.804.28-.804.74 0 0-.556 5.4 4.063 7.655.102.05.48.226.867.227h.009c.387 0 .765-.177.867-.227 4.62-2.255 4.16-7.75 4.16-7.75Z"
			fill="#34AAFC"
		/>
		<Defs>
			<LinearGradient
				id="a"
				x1={9.242}
				y1={8.475}
				x2={38.599}
				y2={21.337}
				gradientUnits="userSpaceOnUse"
			>
				<Stop stopColor="#34AAFC" />
				<Stop offset={1} stopColor="#34AAFC" />
			</LinearGradient>
		</Defs>
	</Svg>
);

export default SvgComponent;
