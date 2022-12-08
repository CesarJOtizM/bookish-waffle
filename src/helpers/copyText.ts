export const copyText: (
  text: string,
  changeState: React.Dispatch<React.SetStateAction<boolean>>
) => void = (text, changeState) => {
  changeState(true)

  const timeOut = setTimeout(() => {
    changeState(false)
    clearTimeout(timeOut)
  }, 1500)

  return navigator.clipboard.writeText(text)
}
