const SESSION_KEY = 'table_track_session'

export const saveSession = (data) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(data))
}

export const getSession = () => {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export const clearSession = () => {
  localStorage.removeItem(SESSION_KEY)
}

export const hasSession = () => {
  return getSession() !== null
}
