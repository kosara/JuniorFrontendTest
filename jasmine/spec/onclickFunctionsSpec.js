
describe( "User interaction:", function() {

	beforeEach(function() {
		jasmine.getFixtures().fixturesPath = 'jasmine/spec/';
		loadFixtures('fixture.html');
		document.getElementById('username').value = 'some_username';
	});

	it("upon click of the Search button, a query starts and the form resets itself", function() {
		spyOn(window, 'clearDataFromPage');
		spyOn(window, 'displayUserInfo');	
		spyOn(window, 'displayUserRepos');
		document.getElementById("submit").click();
		expect(clearDataFromPage).toHaveBeenCalled();
		expect(displayUserInfo).toHaveBeenCalledWith('some_username');
		expect(displayUserRepos).toHaveBeenCalledWith('some_username');
		expect(document.getElementById('username').value).toEqual('');
	});

	it("upon press of Enter, a query starts and the form resets itself", function(){
		spyOn(window, 'clearDataFromPage');
		spyOn(window, 'displayUserInfo');	
		spyOn(window, 'displayUserRepos');

		var event = document.createEvent('Event');
		event.key = "Enter";
		event.initEvent('keydown');
		document.getElementById("username").dispatchEvent(event);

  		expect(clearDataFromPage).toHaveBeenCalled();
   		expect(displayUserInfo).toHaveBeenCalledWith('some_username');
		expect(displayUserRepos).toHaveBeenCalledWith('some_username');
		expect(document.getElementById('username').value).toEqual('');
	});
});