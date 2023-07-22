import { getAllProducts, getProductById } from "../src/database"
import { ProductService } from "../src/product-service";

jest.mock("../src/database.js", () => {
  const originalModule = jest.requireActual("../src/database.js");

  return {
    __esModule: true,
    ...originalModule,
    getAllProducts: jest.fn(),
  }

});

it.failing("mock modules getProductById", () => {

  const product = ProductService.findById(1);

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