export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
export interface EmailSettings {
  id: number;
  idx: number;
  email: string;
  send_alerts: number;
  receive_reports: number;
  reply_with_notifications: number;
}
