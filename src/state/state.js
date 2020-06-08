const KEY = "SUBDOMAIN_SAVE"
const definitions = {}
const state = {}

/**
 * Define a key on the save state
 * @param {string} key The name of the key, e.g. `player.cards`
 * @param {*} defaults The default value of the key. Note, this must be serializable via JSON.stringify()
 */
export function define(key, defaults) {
  definitions[key] = defaults
}

/**
 * Get the value of a saved key
 * @param {string} key The name of the key, e.g. `player.cards`
 */
export function get(key) {
  return state[key] || definitions[key]
}

/**
 * Set the value of a saved key
 * @param {string} key The name of the key, e.g. `player.cards`
 * @param {*} value The value to store. Note, this must be serializable via JSON.stringify()
 */
export function set(key, value) {
  state[key] = value
}

/**
 * Saves the state
 */
export function save() {
  localStorage.setItem(KEY, JSON.stringify(state))
}

/**
 * Restores the state
 */
export function load() {
  Object.assign(state, definitions, JSON.parse(localStorage.getItem(KEY)) || {})
}
