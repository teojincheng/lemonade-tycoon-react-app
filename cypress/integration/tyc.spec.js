describe("lemonade tycoon", () => {
  it("should visit the webpage of the app and header 'Supplies' is visible on the page", () => {
    cy.visit("https://vigorous-hugle-ee108f.netlify.com");
    cy.get(".card-default h3").contains("Supplies");
  });

  it("should double click on the plus button for lemon and the supplies of lemon should become two", () => {
    cy.get("button")
      .eq(1)
      .dblclick();
    cy.get("button")
      .eq(3)
      .dblclick();
    cy.get("button")
      .eq(5)
      .dblclick();
    cy.get(".vertical-center")
      .eq(0)
      .contains("2");
  });

  it("should click on 'Buy' button and screen is changed to recipe selection screen", () => {
    cy.get("button")
      .eq(6)
      .click();
    cy.get(".card-default h3").contains("Recipe");
  });

  it("should click on plus button for lemon and the recipe amount for lemon should become one", () => {
    cy.get("button")
      .eq(1)
      .click();
    cy.get("button")
      .eq(3)
      .click();
    cy.get("button")
      .eq(5)
      .click();
    cy.get(".vertical-center")
      .eq(0)
      .contains("1");
  });

  it("should click on 'Set Recipe' button and the screen is changed to Marketing screen", () => {
    cy.get("button")
      .eq(6)
      .click();
    cy.get(".card-default h3").contains("Marketing");
  });

  it("should click on 'Set price' button and 'Start Day' button is visible on the screen", () => {
    cy.get("button")
      .eq(2)
      .click();

    cy.get("button").should("have.text", "Start Day");
    cy.get("button").click();
  });

  it("should show customer image when game day has started", () => {
    cy.get(".customer-img").should("be.visible");
  });
});
