import md5 from 'blueimp-md5'

export function encryptionPassword (userInfo) {
  const { password, username } = userInfo
  if (!password || !username) return ''
  return md5(md5(md5(username.toLowerCase() + password)))
}
