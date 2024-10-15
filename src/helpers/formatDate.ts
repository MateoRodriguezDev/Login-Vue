export function formatTime(timestamp: Date | number) {
  const date = new Date(timestamp) // Convertir el timestamp a un objeto Date
  const hours = String(date.getHours()).padStart(2, '0') // Obtener las horas y agregar ceros a la izquierda
  const minutes = String(date.getMinutes()).padStart(2, '0') // Obtener los minutos
  const seconds = String(date.getSeconds()).padStart(2, '0') // Obtener los segundos

  return `${hours}:${minutes}:${seconds}` // Formatear la hora
}
