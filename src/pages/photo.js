import React from "react";
import { Layout, Seo } from "../components";
import Masonry from "react-masonry-component";
import "../styles/pages-styles/photo.scss";

const Photo = ({ data }) => {
	const masonryOptions = {
		transitionDuration: 3,
		gutter: 50,
		fitWidth: true,
		// columnWidth: 400,
		// itemSelector: ".grid-item",
		// percentPosition: true,
	};
	// const { igpost } = styles;
	return (
		<Layout>
			<Masonry
				className={"my-gallery-class"} // default ''
				elementType={"ul"} // default 'div'
				options={masonryOptions} // default {}
				disableImagesLoaded={false} // default false
				updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
				// imagesLoadedOptions={imagesLoadedOptions} // default {}
			>
				{Array.from({ length: 105 }).map((item, index) => {
					return (
						<li key={index} className="grid-item">
							<img
								alt="instagram_post"
								src={`https://filedn.eu/ll8NkasFkw1XVJBG2Fp9A1p/gatsby_image/instagram_post/igpo${index}.jpg`}
							/>
						</li>
					);
				})}
			</Masonry>
		</Layout>
	);
};

export default Photo;
export const Head = () => <Seo title="Home" />;
