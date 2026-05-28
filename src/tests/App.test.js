import { render, screen } from "@testing-library/react";
import App from "App";

test("renders MacGrades title", () => {
  render(<App />);
  const linkElement = screen.getByText(/MacGrades/i);
  expect(linkElement).toBeInTheDocument();
});
