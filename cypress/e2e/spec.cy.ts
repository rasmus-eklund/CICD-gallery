describe("template spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });
  it("passes", () => {
    cy.get(".header__title").should("contain.text", "Logo");
  });
});