import React from "react";
import { Seo, Album } from "../components";

const Photo = () => {
	return <Album />;
};

export default Photo;
export const Head = () => (
	<>
		<html lang="zh-Hant-TW" />
		<Seo title="Photo" />;
	</>
);
