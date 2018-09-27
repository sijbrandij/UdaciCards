import React from 'react'

export const FLASHCARDS_STORAGE_KEY = 'UdaciCards:flashcards'

export function parameterizeString (string) {
  return string.trim().toLowerCase().replace(/[^a-zA-Z0-9 -]/, "").replace(/\s/g, "-")
}