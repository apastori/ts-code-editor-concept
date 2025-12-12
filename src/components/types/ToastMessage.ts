import type { ToastStatus } from './ToastStatus'

export interface ToastMessage {
  title: string
  description: string
  status: ToastStatus
}