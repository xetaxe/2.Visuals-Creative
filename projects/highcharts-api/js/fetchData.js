import setLink from "./setLink.js";

async function fetchData(linkParams) {
	
	let link = "https://api.streamhatchet.com/discovery/games/" 
	link += setLink(linkParams);

	try {
		let res = await fetch(link);
		document.getElementById("error_message").innerHTML = "";
		return await res.json();
	} catch (error) {
		document.getElementById("error_message").innerHTML = error;
	}

}

export default fetchData;