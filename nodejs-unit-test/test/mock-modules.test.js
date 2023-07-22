import { getAllProducts, getProductById } from "../src/database";
import { ProductService } from "../src/product-service";

jest.mock("../src/database.js");

it("mock modules getProductById", () => {
  getProductById.mockImplementation((id) => {
    return {
      id,
      name: "Product Mock"
    }
  });

  const product = ProductService.findById(1);

  expect(product).toEqual({ id: 1, name: "Product Mock" });
});

it("mock modules getAllProducts", () => {
  const products = [
    {
      id: 1,
      name: "Product Mock"
    },
    {
      id: 2,
      name: "Product Mock2"
    }
  ];

  getAllProducts.mockImplementation(() => {
    return products;
  });

  expect(ProductService.findAll()).toEqual(products);
});