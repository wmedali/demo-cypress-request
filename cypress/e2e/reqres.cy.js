// Suite de test
describe(
  "Tests API reqres avec cypress",
  {
    baseUrl: "https://reqres.in",
  },
  () => {
    // Scénario de test
    it("get list of users ", () => {
      cy.request({
        method: "GET",
        url: "/api/users?page=2",
      }).then((response) => {
        expect(response.status).be.ok;
        expect(response.status).eq(200);
        expect(response.body).not.null;
        expect(response.body.page).eq(2);
        expect(response.body.data).not.null;
        expect(response.body.data).be.an("array");
        expect(response.body.data.length).above(2);

        const firstUser = response.body.data[0];
        expect(firstUser.id).not.null;
        expect(firstUser.id).eq(7);
        expect(firstUser.email).not.null;
      });
    });
    it("get list of users using explicit parameters", () => {
      cy.request({
        method: "GET",
        url: "/api/users",
        qs: {
          page: 2,
        },
      }).then((response) => {
        expect(response.status).be.ok;
        expect(response.status).eq(200);
        expect(response.body).not.null;
        expect(response.body.page).eq(2);
        expect(response.body.data).not.null;
        expect(response.body.data).be.an("array");
        expect(response.body.data.length).above(2);

        const firstUser = response.body.data[0];
        expect(firstUser.id).not.null;
        expect(firstUser.email).not.null;
      });
    });
    it("create user in reqres api", () => {
      cy.request({
        method: "POST",
        url: "/api/users",
        body: {
          name: "Damien",
          job: "Testeur",
        },
      }).then((response) => {
        expect(response.status).eq(201);
        expect(response.body.id).not.null;
        expect(response.body.name).eq("Damien");
        expect(response.body.job).eq("Testeur");
      });
    });

    it("update user using reqres api", () => {
      cy.request({
        method: "PUT",
        url: "/api/users/30",
        body: {
          name: "New name",
          job: "new job",
        },
      }).then((response) => {
        expect(response.status).eq(200);
        expect(response.body.name).eq("New name");
        expect(response.body.job).eq("new job");
      });
    });
  }
);
