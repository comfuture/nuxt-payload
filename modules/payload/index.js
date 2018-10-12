import path from "path";

export default async function payload(moduleOptions = null) {
  // setup plugin
  this.addPlugin(path.resolve(__dirname, "plugin.js"));

  // setup serverMiddleware
  let moduleFile = path.resolve(__dirname, "server.js");
  this.addServerMiddleware(moduleFile);

  // change stack order or this serverMiddleware to 1st
  this.nuxt.hook("modules:done", moduleContainer => {
    let container = moduleContainer.nuxt.options.serverMiddleware;
    let ix = container.indexOf(moduleFile);
    if (ix > -1) {
      moduleContainer.nuxt.options.serverMiddleware.unshift(
        container.splice(ix, 1)[0]
      );
    }
  });
}
