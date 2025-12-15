export class URLNotValidError extends Error {
  url: string
  constructor(url: string) {
    super(`The provided URL is not valid: ${url}`)
    this.name = 'URLNotValidError'
    this.url = url
    // Set the prototype explicitly for correct inheritance
    Object.setPrototypeOf(URLNotValidError, new.target.prototype)
  }
}
