
function displayUserInfo(username) {

    var user_avatar, user_name, user_bio, responseUserInfo;
    var display_user_info_table = document.getElementById("display-user-info");

    responseUserInfo = makeRequestForUserInfo(username).
    then(function (responseUserInfo) {
      	// check if user supplied name
        if (responseUserInfo.name == null) {
            user_name = "No name supplied.";
        } else {
            user_name = responseUserInfo.name;
        }
        // check if user supplied bio
        if (responseUserInfo.bio == null) {
            user_bio = "No bio supplied.";
        } else {
            user_bio = responseUserInfo.bio;
        }
        // check if user supplied avatar
        if (responseUserInfo.avatar_url == null) {
            user_avatar = "";
        } else {
            var avatar_url = responseUserInfo.avatar_url;
            user_avatar= '<img style= \"display:block; width:100%; height:auto;\" src=\"' + avatar_url + '\">';
        }
        //fill in user information in table
        display_user_info_table.rows[0].cells[0].innerHTML = user_avatar;
        display_user_info_table.rows[0].cells[1].innerHTML = "@" + responseUserInfo.login;
        display_user_info_table.rows[1].cells[0].innerHTML = user_name;
        display_user_info_table.rows[2].cells[0].innerHTML = user_bio;
    })
    .catch(function (err) {
  		displayErrorMessage(err);
    }); 
}

function displayUserRepos(username) {

	var responseUserRepos;
    var display_user_repos_table = document.getElementById("display-user-repos");

    responseUserRepos = makeRequestForUserRepos(username).
    then(function (responseUserRepos) {
        var numberRepos = responseUserRepos.length;
        document.getElementById("repo-table-head").innerHTML = "Repositories";
        
        for (var i = 0; i < numberRepos; i++) {
            var row = display_user_repos_table.insertRow(i+1);
            var cellNameRepo = row.insertCell(0);
            cellNameRepo.innerHTML = responseUserRepos[i].name;
            cellNameRepo.style = "min-width:70%";
            var cellStar = row.insertCell(1);
            cellStar.innerHTML = '<span class="octicon octicon-star">' + responseUserRepos[i].stargazers_count + '</span>';
            var cellFork = row.insertCell(2);
            cellFork.innerHTML = '<span class="octicon octicon-repo-forked">' + responseUserRepos[i].forks_count + '</span>' ;
        }
    })
    .catch(function (err) {
		displayErrorMessage(err);
    }); 
}

function makeRequestForUserInfo(username) {
	return new Promise(function (resolve, reject) {
		var httpRequestUserInfo, responseUserInfo;
    	httpRequestUserInfo = new XMLHttpRequest();
    	
    	if (username == "") {
    		reject('Please enter a username.');
    	} else {
	    	if (!httpRequestUserInfo) {
	        	reject('Information cannot be displayed at this moment. Please try again later!');
	    	} else {
		        httpRequestUserInfo.onreadystatechange = function() {
		            if (httpRequestUserInfo.readyState === XMLHttpRequest.DONE) {
		                if (httpRequestUserInfo.status === 200) {
		                    responseUserInfo = JSON.parse(httpRequestUserInfo.responseText);
		                    resolve(responseUserInfo);
		                } else {
		                	reject('Username does not exist.');
		                }
		            }
	    	    }
			}
	        httpRequestUserInfo.open('GET', encodeURI('https://api.github.com/users/' + username));
	        httpRequestUserInfo.send();
	    }
	});
}

function makeRequestForUserRepos(username) {
	return new Promise(function (resolve, reject) {
		var httpRequestUserRepos, responseUserRepos;
    	httpRequestUserRepos = new XMLHttpRequest();
    	
    	if (username == "") {
    		reject('Please enter a username.');
    	} else {
	    	if (!httpRequestUserRepos) {
	        	reject('Information cannot be displayed at this moment. Please try again later!');
	    	} else {
		        httpRequestUserRepos.onreadystatechange = function() {
		            if (httpRequestUserRepos.readyState === XMLHttpRequest.DONE) {
		                if (httpRequestUserRepos.status === 200) {
		                    responseUserRepos = JSON.parse(httpRequestUserRepos.responseText);
		                    resolve(responseUserRepos);
		                } else {
		                	reject('Username does not exist.');
		                }
		            }
	    	    }
			}
	        httpRequestUserRepos.open('GET', encodeURI('https://api.github.com/users/' + username + '/repos'));
	        httpRequestUserRepos.send();
	    }
	});
}

function displayErrorMessage(message) {    

    var error_message = document.getElementById('error-message');
    if (error_message.hasChildNodes()===false){
        var message_node = document.createElement('div');
        error_message.appendChild(message_node);
        message_node.id = "error-text";
        message_node.className = "alert alert-danger";
        message_node.innerHTML = message.toString();
    }
}

function clearDataFromPage() {

    //clear user information
    var display_user_info_table = document.getElementById("display-user-info");
    display_user_info_table.rows[0].cells[0].innerHTML = "";
    display_user_info_table.rows[0].cells[1].innerHTML = "";
    display_user_info_table.rows[1].cells[0].innerHTML = "";
    display_user_info_table.rows[2].cells[0].innerHTML = "";

    //clear repositories' information
    var display_user_repos_table = document.getElementById("display-user-repos");
    document.getElementById("repo-table-head").innerHTML = "";
    while(display_user_repos_table.rows.length > 1) {
        display_user_repos_table.deleteRow(1);
    } 

    //clear error message information
    var error_message = document.getElementById('error-message');    
    if (error_message.hasChildNodes()){
        error_message.removeChild(error_message.childNodes[0]);
    }
}


