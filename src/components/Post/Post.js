import React from "react";

import "./Post.css";

const post = (props) => {
    const classNames = ["Post"];
        if (props.active) {
            classNames.push("active");
        }
        
	return (
		<article className={classNames.join(' ')} onClick={() => props.clicked(props.postId)}>
			<h1>{props.title}</h1>
			<div className="Info">
				<div className="Author">{props.author}</div>
			</div>
		</article>
	);
};

export default post;
