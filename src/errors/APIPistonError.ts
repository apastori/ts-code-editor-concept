export class APIPistonError extends Error {
  status: number
  constructor(status: number) {
    // Pass the message to the parent Error class
    super(`Piston API error: ${status}`)
    // Set a custom name for the error
    this.name = 'APIPistonError'
    this.status = status
    // Set the prototype explicitly for correct inheritance
    Object.setPrototypeOf(this, APIPistonError.prototype)
  }
}