const BOOKING_ENGINE = 'https://booking.radiancehotels.com/inst/#/home'
const PROPERTY_ID = '283NTg0o9Bd5GZY2c0Zx0MzM='
const ROOM_IDS = '253235,253236,253237,253238,253239,253241,253242'

export function buildBookingUrl(checkIn?: string, checkOut?: string) {
  let url = `${BOOKING_ENGINE}?propertyId=${PROPERTY_ID}`
  if (checkIn) url += `&checkIn=${checkIn}`
  if (checkOut) url += `&checkOut=${checkOut}`
  return `${url}&JDRN=Y&RoomID=${ROOM_IDS}&ap=1&gsId=${PROPERTY_ID}`
}

export function todayLocal() {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}
