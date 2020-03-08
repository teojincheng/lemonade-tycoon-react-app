describe("tycoon", () => {
  it("should visit the webpage of the app and header 'supplies' is visible on the page", () => {
    cy.visit("https://vigorous-hugle-ee108f.netlify.com");
    cy.get(".card-default h3").contains("Supplies");
  });

  it("should click on the plus button for lemon and supplies of lemon should become one", () => {
    cy.get("button")
      .eq(1)
      .click();
    cy.get(".vertical-center").contains("1");
  });
});
