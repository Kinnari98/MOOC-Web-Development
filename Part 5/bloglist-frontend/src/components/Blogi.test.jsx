import React from "react";
import { render, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import Blog from "./Blog";

describe("Blog component", () => {
  it("RENDERING BLOG TITLE", () => {
    const blog = {
      id: "1",
      title: "Testi Title",
      author: "Kalle K",
      url: "http://testiurl.com",
      likes: 5,
    };

    const { getByRole, queryByText } = render(
      <Blog blog={blog} updateBlog={() => {}} deleteBlog={() => {}} />
    );

    // Varmistaa, että titlen renderöinti onnistuu
    const blogElement = getByRole("article");
    const titleElement = within(blogElement).getByText("Testi Title", {
      exact: false,
    });
    expect(titleElement).toBeInTheDocument();

    expect(queryByText("http://testiurl.com")).toBeNull();

    expect(queryByText("likes 5")).toBeNull();
  });
});
