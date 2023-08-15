let compactAbout = document.getElementById("compact_about");
let spreadAbout = document.getElementById("spread_about");
let hideAbout = document.getElementById("hide_about");

compactAbout.onclick = function() {
    compactAbout.classList.add("hidden");
    spreadAbout.classList.remove("hidden");
}

hideAbout.onclick = function() {
    compactAbout.classList.remove("hidden");
    spreadAbout.classList.add("hidden");
}