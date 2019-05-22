export interface Event {
  id: number;
  domain_id: number;
  kind: string;
  type: string;
  metadata: any;
  created_at?: string;
}

export type EventCallback = (evt: Event) => void;
