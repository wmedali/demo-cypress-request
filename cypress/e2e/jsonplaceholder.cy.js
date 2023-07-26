/// <reference types="cypress" />

const randomIndex = Math.floor(Math.random() * 99);
const randomCommentIndex = Math.floor(Math.random() * 4);
describe("JsonPlaceholder api tests", () => {
  it("should get posts from api", () => {
    cy.request("/posts").should((response) => {
      expect(response.status).be.ok;
      expect(response.body).be.an("array");
      expect(response.body.length).above(50);
      const randomPost = response.body[randomIndex];
      expect(randomPost.id).not.null;
      expect(randomPost.id).be.a("number");
      expect(randomPost.userId).not.null;
      expect(randomPost.userId).be.a("number");
      expect(randomPost.body).not.null;
      expect(randomPost.title).not.null;
    });
  });

  it("should get a random post", () => {
    cy.request(`/posts/${randomIndex}`).should((response) => {
      expect(response.body.id).eq(randomIndex);
      expect(response.body.title).not.null;
      expect(response.body.userId).not.null;
      expect(response.body.body).not.null;
    });
  });
  it("it should get empty response when post id not found", () => {
    cy.request({
      method: "GET",
      url: "/posts/190",
      failOnStatusCode: false,
    }).should((response) => {
      expect(response.status).eq(404);
      expect(response.body).be.empty;
    });
  });

  it("should get comments for random post", () => {
    cy.request(`/posts/${randomIndex}/comments`).should((response) => {
      expect(response.status).be.ok;
      expect(response.body).be.an("array");
      expect(response.body.length).eq(5);
      const randomComment = response.body[randomCommentIndex];
      expect(randomComment.postId).not.null;
      expect(randomComment.postId).be.a("number");
      expect(randomComment.id).not.null;
      expect(randomComment.id).be.a("number");
      expect(randomComment.name).not.null;
      expect(randomComment.email).not.null;
      expect(randomComment.body).not.null;
    });
  });

  it("should create post", () => {
    const post = {
      title: "Random post from Cypress",
      body: "Nothins realy to say about API tests",
    };
    cy.request({
      method: "POST",
      url: "/posts",
      body: post,
    }).then((response) => {
      expect(response.status).eq(201);
      expect(response.body.title).eq("Random post from Cypress");
      expect(response.body.body).eq("Nothins realy to say about API tests");
    });
  });
});
