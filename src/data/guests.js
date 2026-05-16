export const guests = {
  hieu: 'bạn Trung Hiếu',
  linh: 'chị Linh',
  ha: 'chị Hà',
  khai_le: 'bạn Khải Lệ',
}

const SUPPORTED_PRONOUNS = new Set(['bạn', 'anh', 'chị', 'em', 'cô', 'chú', 'bác'])

/**
 * Build normalized guest copy from a short display name.
 * Example: "anh Nam" -> inviteLine "Thân mời anh Nam", thankYouLine "Cảm ơn anh đã xác nhận tham dự."
 */
export const createGuestData = (displayName) => {
  const safeName = String(displayName || '').trim() || 'quý khách'
  const firstWord = safeName.split(/\s+/)[0].toLowerCase()
  const pronoun = SUPPORTED_PRONOUNS.has(firstWord) ? firstWord : 'quý khách'

  return {
    displayName: safeName,
    inviteLine: `Thân mời ${safeName}`,
    thankYouLine: `Cảm ơn ${pronoun} đã xác nhận tham dự.`
  }
}

export const genericGuest = createGuestData('quý khách')
