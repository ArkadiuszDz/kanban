const add = (a, b) => {
  return a + b;
}

test('should add two number', () => {
  const result = add (9, 8);

  expect(result).toBe(9+8);

});