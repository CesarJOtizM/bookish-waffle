import axios, { RawAxiosRequestHeaders } from 'axios'

const requestData = async (
  url: string,
  method: 'POST' | 'GET',
  payload: unknown,
  headers: RawAxiosRequestHeaders
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let data: any | null
  let error: unknown | null
  let loaded: boolean

  try {
    const response = await axios.request({
      data: payload,
      method,
      url,
      headers
    })

    data = response.data
    loaded = true
    return { data, error: null, loaded }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    error = e.response || e
    return { data: null, error, loaded: true }
  }
}

export { requestData }
