function returnFirstArgument(a) {
  let result = a;
  return result;
}

function sumWithDefaults(a, b = 100) {
  let result = a + b;
  return result;
}

function returnFnResult(fn) {
  let result = fn();
  return result;
}

function returnCounter(number = 0) {
  let num = number;
  return function f() {
    return ++num;
  }
}
// let f = returnCounter(10);
// console.log(f());

function returnArgumentsArray() {
  let args = [];
  for (let i = 0; i < arguments.length; i++) {
    args[i] = arguments[i];
  }
  return args;
}

export {
    returnFirstArgument,
    sumWithDefaults,
    returnArgumentsArray,
    returnFnResult,
    returnCounter
}
