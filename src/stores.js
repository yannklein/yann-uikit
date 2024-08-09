import { writable } from 'svelte/store'
import { data } from '../data/data'

export const sections = writable(data.sections)
export const cards = writable(data.cards)
export const items = writable(data.items)
export const buttons = writable(data.buttons)
export const navbars = writable(data.navbars)