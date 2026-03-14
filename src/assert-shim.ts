/**
 * Minimal browser shim for Node's `assert` module.
 * The equation-connect library calls `assert.strict(value)` as a simple
 * null/undefined guard — no full Node polyfill needed.
 */
function assert(value: unknown, message?: string): asserts value {
  if (!value) {
    throw new Error(message || "Assertion failed");
  }
}

assert.strict = assert;

export default assert;
export { assert as strict };
