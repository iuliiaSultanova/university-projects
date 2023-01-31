/// <reference types="cypress" />
describe("тестируем игру в пары", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("создается поле 4 на 4, цифры невидимы", () => {
    cy.get(".game-card").should("have.length", 16);
    cy.get(".game-card").should("not.have.class", "flip");
  });

  it("нажатая карточка осталась открытой", () => {
    cy.get(".game-card").first().click();
    cy.get(".game-card").first().should("have.class", "flip");
  });

  it.only("найденная пара остаётся видимой", () => {
    let counter = 1;
    function clickCards(cards) {
      cy.get(cards).first().trigger("click");
      //cy.get(cards).eq(counter).click();
      cy.get(cards).eq(counter).trigger("click");

      // если подождать больше одной секунды, то все элементы проверяются поочередно
      cy.wait(2000);

      if (cards[0].getAttribute("data-card-value") === cards[counter].getAttribute("data-card-value")
      ) {
        cy.get(cards).first().should("have.class", "flip");
        cy.get(cards).eq(counter).should("have.class", "flip");
      } else {
        counter++;
        clickCards(cards);
      }
    }

    cy.get(".game-card").then((cards) => {
      clickCards(cards);
    });
  });
  //});

  it("непарные карты становятся невидимыми", () => {
    cy.get(".game-card").then((cards) => {
      for (let i = 1; i < 16; i++) {
        let cardOne = cy.get(cards).first();
        let cardTwo = cy.get(cards).eq(i);

        cardOne.click();
        cardTwo.click();

        if (
          cardOne.invoke("attr", "data-card-value") !==
          cardTwo.invoke("attr", "data-card-value")
        ) {
          cy.get(cards).first().should("not.have.class", "flip");
          cy.get(cards).eq(i).should("not.have.class", "flip");
          return;
        }
      }
    });
  });
});
