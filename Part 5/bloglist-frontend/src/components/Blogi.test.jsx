import React from "react";
import { render, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import Blog from "./Blog";

describe("Blog component", () => {
  const blog = {
    id: "1",
    title: "Testi Title",
    author: "Kalle K",
    url: "http://testiurl.com",
    likes: 5,
    user: {
      id: "12345",
      name: "Test User",
    },
  };

  it("RENDERING BLOG TITLE", () => {
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

  it("INFO SHOWN AFTER PRESSING VIEW", () => {
    const { getByText } = render(
      <Blog
        blog={blog}
        updateBlog={() => {}}
        deleteBlog={() => {}}
        currentUser={{ id: "12345", name: "Test User" }}
      />
    );

    // view
    const button = getByText("view");
    fireEvent.click(button);

    // Varmistaa, että url, tykkäykset ja käyttäjä näytetään
    expect(getByText("http://testiurl.com")).toBeInTheDocument();
    expect(getByText("likes 5")).toBeInTheDocument();
    expect(getByText("Test User")).toBeInTheDocument();
  });

  it("LIKE BUTTON CLICKED TWICE", () => {
    const mockHandler = vi.fn();

    const { getByText } = render(
      <Blog
        blog={blog}
        updateBlog={mockHandler}
        deleteBlog={() => {}}
        currentUser={{ id: "12345", name: "Test User" }}
      />
    );

    const viewButton = getByText("view");
    fireEvent.click(viewButton);

    // Klikkaa "like" -nappia kahdesti
    const likeButton = getByText("like");
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    // updateBlog kutsutaan kahdesti
    // Jaba
    expect(mockHandler).toHaveBeenCalledTimes(2);
  });
});
