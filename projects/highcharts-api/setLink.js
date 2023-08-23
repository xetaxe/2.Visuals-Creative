function setLink(linkParams) {
	let link = "";
	if (linkParams.month == undefined && linkParams.day == undefined) {
		console.log("Could not set timeframe of the request...");
		return 1;
	}
	console.log("Good");
	if ( linkParams.month == undefined) {
		link += "day/" + linkParams.day + "?";
	} else {
		link += "month/" + linkParams.month + "?";
	}

	link += "token=" + linkParams.token + "&";
	link += "sort_by=" + linkParams.sort_by + "&";
	link += "order=" + linkParams.order + "&";
	link += "limit=" + linkParams.limit + "&";
	link += "offset=" + linkParams.offset + "&";

	console.log(link)

	return link;
}

export default setLink;