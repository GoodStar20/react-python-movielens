import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import MovieList from "./index";

describe("List Component", () => {
  test("Empty Data", () => {
    const { getByTestId } = render(<MovieList data={[]} currentPage={1} />);
    const textContent = getByTestId("table-tbody");

    expect(textContent).toHaveTextContent("There is no result");
  });
});
