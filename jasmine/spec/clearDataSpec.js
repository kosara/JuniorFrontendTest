
describe( "Clear Data Function:", function() {

	beforeEach(function() {
		jasmine.getFixtures().fixturesPath = 'jasmine/spec/';
		loadFixtures('fixture.html');
	});

	describe( "When there is NO data on page:", function() {
		
		it("clears all data from tables and error messages", function() {
			clearDataFromPage();
			var mocked_user_info_table = document.getElementById("display-user-info");
       		expect(mocked_user_info_table.rows[0].cells[0].innerHTML).toEqual('');
    		expect(mocked_user_info_table.rows[0].cells[1].innerHTML).toEqual('');
    		expect(mocked_user_info_table.rows[1].cells[0].innerHTML).toEqual('');
    		expect(mocked_user_info_table.rows[2].cells[0].innerHTML).toEqual('');

			var mocked_user_repos_table = document.getElementById("display-user-repos");
			expect(mocked_user_repos_table.rows[0].cells[0].innerHTML).toEqual('');
			expect(document.getElementById("repo-table-body")).toBeEmpty();

			var mocked_error_message = document.getElementById("error-message");
			expect(mocked_error_message).toBeEmpty();
		});
	});	

	describe( "When there is already data on page:", function() {

		beforeEach(function() {
			var mocked_user_info_table = document.getElementById("display-user-info");
			var mocked_user_repos_table = document.getElementById("display-user-repos");
			mocked_user_repos_table.rows[0].cells[0].innerHTML = "Repositories";
			mocked_user_repos_table.insertRow(1).insertCell(0).innerHTML = '<script src=\"https://cdnjs.cloudflare.com/ajax/libs/bluebird/3.3.5/bluebird.min.js\"></script>';
			mocked_user_info_table.rows[0].cells[0].innerHTML = "a";
		    mocked_user_info_table.rows[0].cells[1].innerHTML = "<div>a=b</c>";
		    mocked_user_info_table.rows[1].cells[0].innerHTML = "";
			displayErrorMessage("Testing!");
		});
		
		it("clears all data from tables and error messages", function() {
			clearDataFromPage();
			var mocked_user_info_table = document.getElementById("display-user-info");
       		expect(mocked_user_info_table.rows[0].cells[0].innerHTML).toEqual('');
    		expect(mocked_user_info_table.rows[0].cells[1].innerHTML).toEqual('');
    		expect(mocked_user_info_table.rows[1].cells[0].innerHTML).toEqual('');
    		expect(mocked_user_info_table.rows[2].cells[0].innerHTML).toEqual('');

			var mocked_user_repos_table = document.getElementById("display-user-repos");
			expect(mocked_user_repos_table.rows[0].cells[0].innerHTML).toEqual('');
			expect(document.getElementById("repo-table-body")).toBeEmpty();

			var mocked_error_message = document.getElementById("error-message");
			expect(mocked_error_message).toBeEmpty();
		});
	});
});