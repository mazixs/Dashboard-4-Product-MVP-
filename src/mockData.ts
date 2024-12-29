export const mockUsers = [
  { user_id: 1, registration_date: "2023-01-01", traffic_source: "Google" },
  { user_id: 2, registration_date: "2023-01-02", traffic_source: "Facebook" },
  { user_id: 3, registration_date: "2023-01-03", traffic_source: "Direct" },
  { user_id: 4, registration_date: "2023-01-04", traffic_source: "Google" },
  { user_id: 5, registration_date: "2023-01-05", traffic_source: "Twitter" },
];

export const mockEvents = [
  { event_id: 1, user_id: 1, event_type: "view", event_time: "2023-01-01T10:00:00" },
  { event_id: 2, user_id: 1, event_type: "click", event_time: "2023-01-01T10:05:00" },
  { event_id: 3, user_id: 1, event_type: "purchase", event_time: "2023-01-01T10:10:00" },
  { event_id: 4, user_id: 2, event_type: "view", event_time: "2023-01-02T11:00:00" },
  { event_id: 5, user_id: 2, event_type: "click", event_time: "2023-01-02T11:05:00" },
  { event_id: 6, user_id: 3, event_type: "view", event_time: "2023-01-03T12:00:00" },
  { event_id: 7, user_id: 4, event_type: "view", event_time: "2023-01-04T13:00:00" },
  { event_id: 8, user_id: 4, event_type: "click", event_time: "2023-01-04T13:05:00" },
  { event_id: 9, user_id: 4, event_type: "purchase", event_time: "2023-01-04T13:10:00" },
  { event_id: 10, user_id: 5, event_type: "view", event_time: "2023-01-05T14:00:00" },
];

export const mockConversionRate = 0.4; // 40% conversion rate

