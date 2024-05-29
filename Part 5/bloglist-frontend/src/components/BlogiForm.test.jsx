import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import BlogForm from "./BlogForm";

describe("BlogForm component", () => {
  it("CREATEBLOG", () => {
    const createBlog = vi.fn();
    const toggleVisibility = vi.fn();

    const { getByPlaceholderText, getByRole } = render(
      <BlogForm createBlog={createBlog} toggleVisibility={toggleVisibility} />
    );

    // Haetaan placeholderin perusteella
    const titleInput = getByPlaceholderText("Enter title");
    const authorInput = getByPlaceholderText("Enter author");
    const urlInput = getByPlaceholderText("Enter URL");
    const submitButton = getByRole("button", { name: /create/i });

    fireEvent.change(titleInput, {
      target: { value: "Testi Title" },
    });
    fireEvent.change(authorInput, {
      target: { value: "Kalle K" },
    });
    fireEvent.change(urlInput, {
      target: { value: "http://testiurl.com" },
    });

    fireEvent.click(submitButton);

    expect(createBlog).toHaveBeenCalledTimes(1);
    expect(createBlog).toHaveBeenCalledWith({
      title: "Testi Title",
      author: "Kalle K",
      url: "http://testiurl.com",
    });
    expect(toggleVisibility).toHaveBeenCalledTimes(1);
  });
});
