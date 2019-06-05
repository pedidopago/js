export interface OrderAdmrow {
  order_id: number;
  order_display_id: string;
  order_vendor_id: string;
  order_vendor_subsid: string;
  order_formula_groups?: string;
  domain_id: number;
  order_status: number;
  payment_status: number;
  payment_amount?: number;
  payment_method?: number;
  user_id: number;
  user_fullname: string;
  user_email: string;
  user_phone: string;
  user_document: string;
  user_document_type?: number;
  date_nf_printed?: string;
  date_client_access?: string;
  next_call?: string;
  calls?: number;
  calculated_agent_id?: number;
  calculated_agent_name?: string;
  coach_agent_id?: number;
  coach_agent_name?: string;
  created_at: string;
  price_total: string;
  agent_last_msg_title?: string;
  agent_last_msg_body?: string;
  client_last_msg?: string;
  date_approved?:string
}
