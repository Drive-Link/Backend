module.exports = async function ({ body, url, headers, method }) {
  const response = await fetch(url, {
    method,
    headers,
    body: body && body,
  })
  return await response.json()
}
