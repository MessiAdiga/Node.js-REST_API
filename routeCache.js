import NodeCache from "node-cache";

const cache = new NodeCache();

let cacheResult;

export default cacheResult = (duration) => (req, res, next) => {
  //check if it's a GET request, else call next.
  if (req.method !== "GET") {
    console.error("Cannot cache non-GET methods!");
    return next();
  }
  //check if key exists in cache
  const key = req.originalUrl;
  const cachedResponse = cache.get(key);

  //if it exists, send the cached result.
  if (cachedResponse) {
    console.log(`Cache hit for ${key}`);
    res.send(cachedResponse);
  } else {
    // if not, replace .send with method to set response to cache.
    console.log(`Cache miss for ${key}`);
    res.originalSend = res.send;
    res.send = (body) => {
      res.originalSend(body);
      cache.set(key, body, duration);
    };
    next();
  }
};
