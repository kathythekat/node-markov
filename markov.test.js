const { MarkovMachine } = require("./markov");

test("make chain", function() {
  let mm = new MarkovMachine("the cat in the hat");
  expect(mm.chain).toEqual({
    "the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]
  })
})
test("make chain", function() {
  let mm = new MarkovMachine("the the the");
  expect(mm.chain).toEqual({
    "the": ["the", "the", null]
  })
})

test("get text", function() {
  let mm = new MarkovMachine("roses are red");
  let totalLength = mm.getText().split(' ').length;
  expect(totalLength).toEqual(100)
})

test("get text of custom length", function() {
  let mm = new MarkovMachine("roses are red");
  let totalLength = mm.getText(50).split(' ').length;
  expect(totalLength).toEqual(50)
  expect(mm.getText()).toEqual(expect.any(String))
})