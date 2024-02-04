import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductList from "../../../components/product/ProductList";
import { RecoilRoot } from "recoil";
import fetchMock from "jest-fetch-mock";
import { BrowserRouter } from "react-router-dom";

beforeEach(() => {
  fetchMock.resetMocks();
});

test("loads and displays products", async () => {
  const productData = [
    {
      createdAt: "2023-07-17T07:21:02.529Z",
      name: "Bentley Focus",
      image: "https://loremflickr.com/640/480/food",
      price: "51.00",
      description:
        "Quasi adipisci sint veniam delectus. Illum laboriosam minima dignissimos natus earum facere consequuntur eius vero. Itaque facilis at tempore ipsa. Accusamus nihil fugit velit possimus expedita error porro aliquid. Optio magni mollitia veritatis repudiandae tenetur nemo. Id consectetur fuga ipsam quidem voluptatibus sed magni dolore.\nFacilis commodi dolores sapiente delectus nihil ex a perferendis. Totam deserunt assumenda inventore. Incidunt nesciunt adipisci natus porro deleniti nisi incidunt laudantium soluta. Nostrum optio ab facilis quisquam.\nSoluta laudantium ipsa ut accusantium possimus rem. Illo voluptatibus culpa incidunt repudiandae placeat animi. Delectus id in animi incidunt autem. Ipsum provident beatae nisi cumque nulla iure.",
      model: "CTS",
      brand: "Lamborghini",
      id: "1",
    },
  ];
  fetchMock.mockResponseOnce(JSON.stringify(productData));

  render(
    <BrowserRouter>
      <RecoilRoot>
        <ProductList />
      </RecoilRoot>
    </BrowserRouter>
  );

  const item = await screen.findByText("Bentley Focus");
  expect(item).toBeInTheDocument();
});
