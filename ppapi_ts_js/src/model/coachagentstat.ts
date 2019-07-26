/*
AgentID    int    `db:"agent_id" json:"agent_id"`
	AgentName  string `db:"agent_name" json:"agent_name"`
    OrderCount int    `db:"order_count" json:"order_count"`*/

export interface CoachAgentStat {
    agent_id: number;
    agent_name: string;
    order_count: number;
}
