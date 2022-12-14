import { requestData } from './requestData'
import { RawAxiosRequestHeaders } from 'axios'

const searchHook = async (
  request: unknown,
  url: string,
  headers: RawAxiosRequestHeaders
) => {
  let count = 0

  const info = new Promise(resolve => {
    const interval = setInterval(async () => {
      count++

      if (count <= 9) {
        const { data, error, loaded } = await requestData(
          url,
          'POST',
          request,
          headers
        )
        if (!error && loaded) {
          const {
            data: { antiguedadImss, antiguedadContpaq }
          } = data

          if (antiguedadContpaq) {
            const {
              data: {
                salarioContpaq: { sueldoMensual, cuentapagoelectronico }
              }
            } = data
            resolve({
              age: antiguedadContpaq.años,
              salary: sueldoMensual,
              account: !!cuentapagoelectronico
            })
            clearInterval(interval)
          } else if (antiguedadImss && count === 9) {
            const {
              data: {
                salarioImss: { salarioMensual, nombrePatron }
              }
            } = data
            resolve({
              age: antiguedadImss.años,
              salary: parseFloat(salarioMensual),
              company: nombrePatron,
              account: false
            })
            clearInterval(interval)
          } else if (!antiguedadImss && !antiguedadContpaq && count === 9) {
            clearInterval(interval)
            resolve(undefined)
          }
        }
      } else {
        clearInterval(interval)
        resolve(undefined)
      }
    }, 9000)
  })

  return await info
}

export { searchHook }
