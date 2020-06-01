const KEY = "SUBDOMAIN_SAVE"

export const state = {}

export function save() {
  localStorage.setItem(KEY, JSON.stringify(state))
}

export function load() {
  Object.assign(state, JSON.parse(localStorage.getItem(KEY)) || {})
}
