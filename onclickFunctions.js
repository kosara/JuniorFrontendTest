document.getElementById("submit").addEventListener('click', function() {
    clearDataFromPage(); //removes information from previous search on page
    var username = document.getElementById('username').value;
    displayUserInfo(username);
    displayUserRepos(username);
    document.getElementById('username').value = ""; //reset text-field
});

document.getElementById("username").addEventListener("keydown", function(event) { // click of Enter on text field also prompts search
	if(event.key !== "Enter"){
	    return;
	} else {
	    clearDataFromPage(); //removes information from previous search on page
	    var username = document.getElementById('username').value;
	    displayUserInfo(username);
	    displayUserRepos(username);
	    document.getElementById('username').value = ""; //reset text-field
	}
});
