import { createGuestData, genericGuest, guests } from '../data/guests'

const capitalizeFirst = (text) => {
  const value = String(text || '').trim()
  if (!value) return ''
  return value.charAt(0).toUpperCase() + value.slice(1)
}

const slugToDisplayName = (slug) => String(slug || '')
  .split('-')
  .filter(Boolean)
  .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
  .join(' ')

export const useGuest = () => {
  const cleanPath = window.location.pathname.replace(/\/+$/, '')
  const cleanHash = window.location.hash.replace(/^#/, '')
  const hashSlug = cleanHash.startsWith('/invite/') ? decodeURIComponent(cleanHash.slice('/invite/'.length)) : ''
  const pathSlug = cleanPath.startsWith('/invite/') ? decodeURIComponent(cleanPath.slice('/invite/'.length)) : ''
  const slug = hashSlug || pathSlug

  const mappedDisplayName = guests[slug]
  const guest = mappedDisplayName ? createGuestData(mappedDisplayName) : genericGuest

  const fallbackDisplayName = slug ? slugToDisplayName(slug) : genericGuest.displayName
  const displayName = guest.displayName || fallbackDisplayName || genericGuest.displayName

  return {
    slug,
    guest,
    guestDisplayName: capitalizeFirst(displayName),
    inviteLine: guest.inviteLine,
    thankYouLine: guest.thankYouLine,
    heroGreeting: `Rất mong được gặp ${capitalizeFirst(displayName)} trong ngày đặc biệt này.`,
    hasGuestProfile: Boolean(mappedDisplayName)
  }
}
