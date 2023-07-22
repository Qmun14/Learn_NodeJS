import { getBalance } from "../src/async";

it("mock async function", async () => {
  const from = jest.fn();
  from.mockResolvedValueOnce(1000);

  expect(getBalance("Ma'mun", from)).resolves.toEqual({
    name: "Ma'mun",
    balance: 1000
  });

  expect(from.mock.calls.length).toBe(1);
  await expect(from.mock.results[0].value).resolves.toBe(1000);
});

it.failing("mock async function rejected", async () => {
  const from = jest.fn();
  from.mockRejectedValueOnce(new Error("Upss"));

  await getBalance("Ma'mun", from);
});

it("mock async function error matchers", async () => {
  const from = jest.fn();
  from.mockRejectedValueOnce("Rejected");

  await expect(getBalance("Ma'mun", from)).rejects.toBe("Rejected");
})