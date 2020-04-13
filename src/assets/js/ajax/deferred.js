module.exports = function() {
  var promise = {
    resolve: null,
    reject: null,
    promise: null,
  };

  var innerPromise = new Promise((resolve, reject) => {
    promise.resolve = resolve;
    promise.reject = reject;
  });

  promise.promise = innerPromise;

  return promise;
};
