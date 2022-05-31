import React from "react"
import ContentLoader from "react-content-loader"

const Sceleton = () => (
	<ContentLoader
		className="pizza-block"
		speed={ 2 }
		width={ 280 }
		height={ 465 }
		viewBox="0 0 280 465"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
	>
		<circle cx="134" cy="136" r="125" />
		<rect x="256" y="320" rx="0" ry="0" width="20" height="0" />
		<rect x="242" y="312" rx="0" ry="0" width="35" height="3" />
		<rect x="10" y="310" rx="0" ry="0" width="21" height="0" />
		<rect x="163" y="319" rx="0" ry="0" width="0" height="17" />
		<rect x="7" y="299" rx="14" ry="14" width="268" height="21" />
		<rect x="114" y="307" rx="0" ry="0" width="0" height="8" />
		<rect x="258" y="311" rx="0" ry="0" width="0" height="4" />
		<rect x="11" y="329" rx="14" ry="14" width="265" height="68" />
		<rect x="13" y="409" rx="6" ry="6" width="142" height="23" />
		<rect x="174" y="402" rx="19" ry="19" width="100" height="36" />
	</ContentLoader>
)

export default Sceleton;