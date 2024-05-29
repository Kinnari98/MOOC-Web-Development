const { test, expect, beforeEach, describe } = require("@playwright/test");
// komentoja
//npx playwright show-report

describe("Note app", () => {
  beforeEach(async ({ page, request }) => {
    // Nollataan tietokanta
    await request.post("http://localhost:3003/api/testing/reset");

    // Luo käyttäjän
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Kalle Kinnari",
        username: "kalki",
        password: "password",
      },
    });

    // Mennään sovellukseen
    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    const heading = page.locator("h2", { hasText: "Log in to application" });
    await expect(heading).toBeVisible();

    const usernameInput = page.locator('input[placeholder="Username"]');
    await expect(usernameInput).toBeVisible();

    const passwordInput = page.locator('input[placeholder="Password"]');
    await expect(passwordInput).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.fill('input[placeholder="Username"]', "kalki");
      await page.fill('input[placeholder="Password"]', "password");
      await page.click('button[type="submit"]');

      const logoutButton = page.locator("button", { hasText: "logout" });
      await expect(logoutButton).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.fill('input[placeholder="Username"]', "kalki");
      await page.fill('input[placeholder="Password"]', "wrongpassword");
      await page.click('button[type="submit"]');

      const errorMessage = page.locator(".error");
      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toHaveText("wrong username/password");

      const loginForm = page.locator("h2", {
        hasText: "Log in to application",
      });
      await expect(loginForm).toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      // Kirjaudu sisään
      await page.fill('input[placeholder="Username"]', "kalki");
      await page.fill('input[placeholder="Password"]', "password");
      await page.click('button[type="submit"]');

      // Varmistaa onnistuneen kirjautumisen
      await page.waitForSelector("button", { hasText: "logout" });
    });

    test("a new blog can be created", async ({ page }) => {
      // Ota screenshot
      await page.screenshot({ path: "screenshots/after_login.png" });

      const createButton = page.locator("button", {
        hasText: "create new blog",
      });
      await expect(createButton).toBeVisible();
      await createButton.click();

      // Ota screenshot
      await page.screenshot({ path: "screenshots/form_opened.png" });

      await page.waitForSelector('input[placeholder="Enter title"]', {
        timeout: 10000,
      });

      // Täytä blogin tiedot
      await page.fill('input[placeholder="Enter title"]', "TESTIN GENEROIMA");
      await page.fill('input[placeholder="Enter author"]', "TESTIN GENEROIMA");
      await page.fill(
        'input[placeholder="Enter URL"]',
        "http://testblog.com/TESTINGENEROIMA"
      );

      await page.click('button[type="submit"]');

      // Ota screenshot
      await page.screenshot({ path: "screenshots/blog_created.png" });

      const newBlog = page
        .locator("div")
        .filter({ hasText: "TESTIN GENEROIMA" })
        .first();
      await expect(newBlog).toBeVisible();
    });
  });
});
