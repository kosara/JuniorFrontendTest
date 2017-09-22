

describe( "Github API request functions:", function() {
	describe( "Making requests for user information to Github API:", function () {

	    it("returns user information when username is valid", function (done) {
	    	makeRequestForUserInfo('kosara').then(function(result) {
	    		expect(result).toEqual(userInformation);
	    		done();
	    	});
	    });

	    it("returns an error message when username is invalid", function (done) {
	    	makeRequestForUserInfo('azxscdvf').catch(function(result) {
	    		expect(result).toEqual('Username does not exist.');
	    		done();
	    	});
	    });

	    it("returns an error message when no username has been entered", function (done) {
	    	makeRequestForUserInfo('').catch(function(result) {
	    		expect(result).toEqual('Please enter a username.');
	    		done();
	    	});
	    });
	});

	describe( "Making requests for user repositories to Github API:", function () {

	    it("returns user information when username is valid", function (done) {
	    	makeRequestForUserRepos('kaka').then(function(result) {
	    		expect(result).toEqual(userRepos);
	    		done();
	    	});
	    });

	    it("returns an error message when username is invalid", function (done) {
	    	makeRequestForUserRepos('qazwsxcdevfr').catch(function(result) {
	    		expect(result).toEqual('Username does not exist.');
	    		done();
	    	});
	    });

	    it("returns an error message when no username has been entered", function (done) {
	    	makeRequestForUserRepos('').catch(function(result) {
	    		expect(result).toEqual('Please enter a username.');
	    		done();
	    	});
	    });
	});
});

