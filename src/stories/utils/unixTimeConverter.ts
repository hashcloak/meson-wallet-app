export const unixTimeConverter = (timestamp: number) => {
  const d = new Date(timestamp * 1000).toString().split(' ')
  const date = `${d[1]} ${d[2]} ${d[3]}`
  const time = `${d[4].slice(0, 5)}`
  return { date, time }
}
