module.exports = {
  timeJamMenit: (time) => {
    const [jam, menit, detik] = time.split(':')

    return `${jam}:${menit}`
  }
}