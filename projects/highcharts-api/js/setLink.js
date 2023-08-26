function setLink(linkParams) {
	
	let link = "";

	if ( linkParams.month != undefined )
		link += "month/" + linkParams.month + "?";
	else if ( linkParams.day != undefined )
		link += "day/" + linkParams.day + "?";
	else {
		console.log("Could not set timeframe of the request...");
		return link
	}

	link += "token=" + linkParams.token + "&";
	link += "sort_by=" + linkParams.sort_by + "&";
	link += "order=" + linkParams.order + "&";
	link += "limit=" + linkParams.limit + "&";
	link += "offset=" + linkParams.offset + "&";

	return link;
}

export default setLink;