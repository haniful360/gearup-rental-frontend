export interface IMetricValue {
  value: number;
  growth: number;
}

export interface IOverviewMetricsData {
  mrr: IMetricValue;
  activePaidUsers: IMetricValue;
  conversionRate: IMetricValue;
  openTickets: IMetricValue;
}

export interface IOverviewMetricsResponse {
  statusCode: number;
  data: IOverviewMetricsData;
}

export interface IContentEngagementItem {
  id: string;
  title: string;
  contentType: string;
  count: number;
  actionLabel: string;
}

export interface IContentEngagementResponse {
  statusCode: number;
  data: IContentEngagementItem[];
}

export interface ISubscriptionRetentionItem {
  month: string;
  value: number;
  totalCohort: number;
  retainedCount: number;
}

export interface ISubscriptionRetentionResponse {
  statusCode: number;
  data: ISubscriptionRetentionItem[];
}
