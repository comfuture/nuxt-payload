import accepts from "accepts";

export default (req, res, nuxt) => {
  res.status = code => {
    res.statusCode = code;
    return res;
  };

  res.json = val => {
    if (!res.getHeader("content-type")) {
      res.setHeader("Content-Type", "application/json; charset=utf-8");
    }
    res.end(JSON.stringify(val), "utf8");
  };

  let resolver = new Promise(resolve => {
    res.payload = function payload(data) {
      res.payload = data;
      resolve(data);
    };
  });
  let timeout = new Promise((_, reject) => setTimeout(reject, 2000));
  Promise.race([timeout, resolver])
    .then(data => {
      if (accepts(req).type(["html", "json"]) === "json") {
        res.setHeader("Surrogate-Control", "no-store");
        res.setHeader(
          "Cache-Control",
          "no-store, no-cache, must-revalidate, proxy-revalidate"
        );
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");
        res.json(data);
      } else {
        // XXX: url of sub mounted router points to parents router, so nuxt will try to render 1st depth router's url
        req.url = req.originalUrl;
        nuxt();
      }
    })
    .catch(error => {
      nuxt(new Error("Errors occurs while resolving payload" + error));
    });
  // continue to next middleware stack
  nuxt();
};
