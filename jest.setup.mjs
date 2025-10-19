// jest.setup.mjs
global.TextEncoder = jest.fn().mockImplementation(() => ({
  encode: () => new Uint8Array(),
}));
global.TextDecoder = jest.fn();
