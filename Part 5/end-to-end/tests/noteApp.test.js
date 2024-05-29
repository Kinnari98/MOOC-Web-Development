const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Note app", () => {
  beforeEach(async ({ page, request }) => {
    // Nollataan tietokannan tilanne
    await request.post("http://localhost:3003/api/testing/reset");

    // Luodaan uusi käyttäjä
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Matti Luukkainen",
        username: "mluukkai",
        password: "salainen",
      },
    });

    // Mennään sovellukseen
    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    // Tarkistetaan, että kirjautumislomake näkyy
    const heading = page.locator("h2", { hasText: "Log in to application" });
    await expect(heading).toBeVisible();

    // Tarkistetaan, että Username ja Password kentät ovat näkyvissä
    const usernameInput = page.locator('input[placeholder="Username"]');
    await expect(usernameInput).toBeVisible();

    const passwordInput = page.locator('input[placeholder="Password"]');
    await expect(passwordInput).toBeVisible();
  });
});
