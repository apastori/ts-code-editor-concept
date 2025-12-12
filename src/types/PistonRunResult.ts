export interface PistonRunResult {
  stdout: string
  stderr: string
  output: string
  code: number
  signal: string | null
}
