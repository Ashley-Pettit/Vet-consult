// Unit tests never use the network (no AI calls, no live connection): every test passes its own fake fetch.
globalThis.fetch = async (url) => {
  throw new Error(`A unit test tried to use the network (${String(url)}). Pass a fake fetch instead.`);
};
