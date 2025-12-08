export class RootNotDivElementError extends Error {
    constructor() {
      // Pass the message to the parent Error class
      super('Element with "root" id is not a HTML Div Element, use standard <div id="root"></div>')
      // Set a custom name for the error
      this.name = 'Root Not Div Element'
      // Set the prototype explicitly for correct inheritance
      Object.setPrototypeOf(this, RootNotDivElementError.prototype)
    }
  }