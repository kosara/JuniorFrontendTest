
describe( "Displaying Functions:", function() {
	var request;

	beforeEach(function() {
		jasmine.getFixtures().fixturesPath = 'jasmine/spec/';
		loadFixtures('fixture.html');
		jasmine.Ajax.install();
	});

	afterEach(function() {
		jasmine.Ajax.uninstall();
	});

	describe("Displaying user infromation:", function() {

		describe("When username is valid:", function() {

			beforeEach(function(done) {
				displayUserInfo('kosara');
				request = jasmine.Ajax.requests.mostRecent();
				expect(request.url).toBe('https://api.github.com/users/kosara');
				request.respondWith(Responses.displayUserInfo.success);
				done();
			});


			it("fills in the right user information in the table", function(done) {
				var mocked_user_info_table = document.getElementById("display-user-info");
	       		expect(mocked_user_info_table.rows[0].cells[0].innerHTML).toEqual('<img src=\"https://avatars2.githubusercontent.com/u/5045714?v=4\" style=\"display:block; width:100%; height:auto;\">');
	    		expect(mocked_user_info_table.rows[0].cells[1].innerHTML).toEqual('@syahdeini');
	    		expect(mocked_user_info_table.rows[1].cells[0].innerHTML).toEqual('Aldy syahdeini');
	    		expect(mocked_user_info_table.rows[2].cells[0].innerHTML).toEqual('Machine learning and NLP enthusiast ');
				done();
			});

			it("does not display an error message", function(done) {
				var mocked_error_message = document.getElementById("error-message");
				expect(mocked_error_message).toBeEmpty();
				done();
			});

		});

		describe("When username is invalid:", function() {

			beforeEach(function(done) {
				displayUserInfo('rtyhgfvbn');
				request = jasmine.Ajax.requests.mostRecent();
				expect(request.url).toBe('https://api.github.com/users/rtyhgfvbn');
				request.respondWith(Responses.displayUserInfo.failure);
				done();
			});

			it("fills in NO information in the table", function(done) {
				var mocked_user_info_table = document.getElementById("display-user-info");
	       		expect(mocked_user_info_table.rows[0].cells[0].innerHTML).toEqual('');
	    		expect(mocked_user_info_table.rows[0].cells[1].innerHTML).toEqual('');
	    		expect(mocked_user_info_table.rows[1].cells[0].innerHTML).toEqual('');
	    		expect(mocked_user_info_table.rows[2].cells[0].innerHTML).toEqual('');
				done();
			});

			it("displays the right message in the error field", function(done) {
				var mocked_error_text = document.getElementById("error-text");
				expect(mocked_error_text).toContainText("Username does not exist.");
				done();
			});
		});

		describe("When no username has been entered:", function() {

			beforeEach(function(done) {
				displayUserInfo('');
				done();
			});

			it("fills in NO information in the table", function(done) {
				var mocked_user_info_table = document.getElementById("display-user-info");
	       		expect(mocked_user_info_table.rows[0].cells[0].innerHTML).toEqual('');
	    		expect(mocked_user_info_table.rows[0].cells[1].innerHTML).toEqual('');
	    		expect(mocked_user_info_table.rows[1].cells[0].innerHTML).toEqual('');
	    		expect(mocked_user_info_table.rows[2].cells[0].innerHTML).toEqual('');
				done();
			});

			it("displays the right message in the error field", function(done) {
				var mocked_error_text = document.getElementById("error-text");
				expect(mocked_error_text).toContainText("Please enter a username.");
				done();
			});
		});
	});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	describe("Displaying user repository infromation:", function() {

		describe("When username is valid:", function() {

			beforeEach(function(done) {
				displayUserRepos('cecero');
				request = jasmine.Ajax.requests.mostRecent();
				expect(request.url).toBe('https://api.github.com/users/cecero/repos');
				request.respondWith(Responses.displayUserRepos.success);
				done();
			});

			it("fills in the right user repositories' information in the table", function(done) {
				var mocked_user_repos_table = document.getElementById("display-user-repos");
				expect(mocked_user_repos_table.rows[0].cells[0].innerHTML).toEqual('Repositories');
	       		expect(mocked_user_repos_table.rows[1].cells[0].innerHTML).toEqual('cecero');
	    		expect(mocked_user_repos_table.rows[1].cells[1].innerHTML).toEqual('<span class="octicon octicon-star">0</span>');
	    		expect(mocked_user_repos_table.rows[1].cells[2].innerHTML).toEqual('<span class="octicon octicon-repo-forked">0</span>');
	    		expect(mocked_user_repos_table.rows[2].cells[0].innerHTML).toEqual('ghtyg');
	    		expect(mocked_user_repos_table.rows[2].cells[1].innerHTML).toEqual('<span class="octicon octicon-star">0</span>');
	    		expect(mocked_user_repos_table.rows[2].cells[2].innerHTML).toEqual('<span class="octicon octicon-repo-forked">0</span>');
				done();
			});

			it("does not display an error message", function(done) {
				var mocked_error_message = document.getElementById("error-message");
				expect(mocked_error_message).toBeEmpty();
				done();
			});

		});

		describe("When username is invalid:", function() {

			beforeEach(function(done) {
				displayUserRepos('rtyhgfvbn');
				request = jasmine.Ajax.requests.mostRecent();
				expect(request.url).toBe('https://api.github.com/users/rtyhgfvbn/repos');
				request.respondWith(Responses.displayUserRepos.failure);
				done();
			});

			it("fills in NO information in the table", function(done) {
				var mocked_user_repos_table = document.getElementById("display-user-repos");
				expect(mocked_user_repos_table.rows[0].cells[0].innerHTML).toEqual('');
				expect(document.getElementById("repo-table-body")).toBeEmpty();
				done();
			});

			it("displays the right message in the error field", function(done) {
				var mocked_error_text = document.getElementById("error-text");
				expect(mocked_error_text).toContainText("Username does not exist.");
				done();
			});
		});

		describe("When no username has been entered:", function() {

			beforeEach(function(done) {
				displayUserRepos('');
				done();
			});

			it("fills in NO information in the table", function(done) {
				var mocked_user_repos_table = document.getElementById("display-user-repos");
				expect(mocked_user_repos_table.rows[0].cells[0].innerHTML).toEqual('');
				expect(document.getElementById("repo-table-body")).toBeEmpty();
				done();
			});

			it("displays the right message in the error field", function(done) {
				var mocked_error_text = document.getElementById("error-text");
				expect(mocked_error_text).toContainText("Please enter a username.");
				done();
			});
		});
	});
});
