import setLink from "./setLink.js";

async function refetchData(linkParams) {
	
	const link = setLink(linkParams);

	try {
		let res = await fetch("https://api.streamhatchet.com/discovery/games/" + link);
		return await res.json();
	} catch (error) {
		console.log(error);
	}

}

export default refetchData;