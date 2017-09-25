
describe( "Displaying Error Message Function:", function() {

	beforeEach(function() {
		jasmine.getFixtures().fixturesPath = 'jasmine/spec/';
		loadFixtures('fixture.html');
	});

	describe( "When field is empty:", function() {

		it("displays the right message in the error field in the right format", function() {
			displayErrorMessage("Test me!");
			var mocked_error_message = document.getElementById("error-message");
			var mocked_error_text = document.getElementById("error-text");
			expect(mocked_error_message).not.toBeEmpty();
			expect(mocked_error_text).not.toBeEmpty();
			expect(mocked_error_text).toHaveClass("alert alert-danger");
			expect(mocked_error_text).toContainText("Test me!");
		});
	});	

	describe( "When there is already text in the field:", function() {

		beforeEach(function() {
			displayErrorMessage("First error!")
		});
		
		it("displays the right message in the error field in the right format", function() {
			displayErrorMessage("Second error!");
			var mocked_error_message = document.getElementById("error-message");
			var mocked_error_text = document.getElementById("error-text");
			expect(mocked_error_message).not.toBeEmpty();
			expect(mocked_error_text).not.toBeEmpty();
			expect(mocked_error_text).toHaveClass("alert alert-danger");
			expect(mocked_error_text).toContainText("First error!");
		});
	});
});