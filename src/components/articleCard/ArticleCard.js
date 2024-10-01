import React from "react";
import { Link } from "gatsby";
import { card } from "./articleCard.module.scss";
import dayjs from "dayjs";

const ArticleCard = ({ title, date, linkPath }) => (
	<div className={card}>
		<h3>
			<Link to={linkPath}>{title}</Link>
		</h3>
		<p>{dayjs(date).format("YYYY-MM-DD ddd")}</p>
	</div>
);

export default ArticleCard;
