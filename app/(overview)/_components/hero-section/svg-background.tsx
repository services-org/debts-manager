export const SVGBackground = () => {
	return (
		<svg
			className="absolute top-0 left-0 w-full h-40 md:h-56 z-0"
			viewBox="0 0 1440 320"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				fill="url(#heroGradient)"
				fillOpacity="1"
				d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
			/>
			<defs>
				<linearGradient id="heroGradient" x1="0" y1="0" x2="1440" y2="320" gradientUnits="userSpaceOnUse">
					<stop stopColor="brown" />
					<stop offset="0.5" stopColor="orange" />
					<stop offset="1" stopColor="orangered" />
				</linearGradient>
			</defs>
		</svg>
	);
};

SVGBackground.displayName = "SVGBackground";
