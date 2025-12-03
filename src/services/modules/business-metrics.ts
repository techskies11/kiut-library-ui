// Mock service for Storybook
export const getCheckinMetrics = async (
  airline_name: string,
  startDate: string,
  endDate: string
) => {
  // Simular respuesta de API
  return {
    total_checkin_init: 1250,
    total_checkin_initiated: 1500,
    total_checkin_init_abandoned: 120,
    total_checkin_started: 1130,
    total_checkin_completed: 980,
    total_checkin_closed: 920,
    total_checkin_unrecovered: 50,
    checkin_by_day: [
      {
        date: '2024-11-24',
        checkin_initiated_count: 500,
        checkin_init_count: 420,
        checkin_started_count: 380,
        checkin_completed_count: 320,
        checkin_closed_count: 310,
      },
      {
        date: '2024-11-25',
        checkin_initiated_count: 520,
        checkin_init_count: 450,
        checkin_started_count: 400,
        checkin_completed_count: 350,
        checkin_closed_count: 330,
      },
      {
        date: '2024-11-26',
        checkin_initiated_count: 480,
        checkin_init_count: 380,
        checkin_started_count: 350,
        checkin_completed_count: 310,
        checkin_closed_count: 280,
      },
    ],
  };
};

export const getCheckinFailedMetrics = async (
  airline_name: string,
  startDate: string,
  endDate: string
) => {
  // Simular respuesta de API
  return {
    total_checkin_failed: 150,
    failed_by_step_by_day: [
      {
        date: '2024-11-24',
        steps: [
          { step_name: 'get_seatmap', failed_count: 15 },
          { step_name: 'save_missing_info', failed_count: 8 },
        ],
      },
      {
        date: '2024-11-25',
        steps: [
          { step_name: 'get_seatmap', failed_count: 20 },
          { step_name: 'checkin_segments', failed_count: 12 },
        ],
      },
      {
        date: '2024-11-26',
        steps: [
          { step_name: 'assign_seat', failed_count: 10 },
          { step_name: 'get_seatmap', failed_count: 18 },
        ],
      },
    ],
    unrecovered_by_step: [
      { step_name: 'get_seatmap', count: 35 },
      { step_name: 'save_missing_info', count: 12 },
      { step_name: 'checkin_segments', count: 8 },
    ],
  };
};

export const getFaqMetrics = async (
  airline_name: string,
  startDate: string,
  endDate: string
) => {
  // Simular respuesta de API
  return {
    total_faq_events: 4250,
    total_documents_found: 3890,
    total_airline_information_retrieved: 1520,
    total_booking_info_retrieved: 980,
    total_flight_status_retrieved: 1390,
    faq_by_day: [
      {
        date: '2024-11-24',
        faq_events_count: 850,
        documents_found_count: 780,
        airline_information_retrieved_count: 304,
        booking_info_retrieved_count: 196,
        flight_status_retrieved_count: 280,
      },
      {
        date: '2024-11-25',
        faq_events_count: 920,
        documents_found_count: 845,
        airline_information_retrieved_count: 328,
        booking_info_retrieved_count: 212,
        flight_status_retrieved_count: 305,
      },
      {
        date: '2024-11-26',
        faq_events_count: 780,
        documents_found_count: 715,
        airline_information_retrieved_count: 280,
        booking_info_retrieved_count: 180,
        flight_status_retrieved_count: 255,
      },
      {
        date: '2024-11-27',
        faq_events_count: 890,
        documents_found_count: 820,
        airline_information_retrieved_count: 320,
        booking_info_retrieved_count: 198,
        flight_status_retrieved_count: 302,
      },
      {
        date: '2024-11-28',
        faq_events_count: 810,
        documents_found_count: 730,
        airline_information_retrieved_count: 288,
        booking_info_retrieved_count: 194,
        flight_status_retrieved_count: 248,
      },
    ],
  };
};

export const getSellerMetrics = async (
  airline_name: string,
  startDate: string,
  endDate: string
) => {
  // Simular respuesta de API
  return {
    total_seller_conversations: 2850,
    total_sell_started: 2340,
    total_sell_get_quote: 1890,
    total_sell_booking_created: 1250,
    total_sell_success: 980,
    total_value_sell_success: 245680.50,
    seller_by_day: [
      {
        date: '2024-11-24',
        seller_conversations: 580,
        sell_started_count: 475,
        sell_get_quote_count: 385,
        sell_booking_created_count: 255,
        sell_success_count: 198,
        daily_value_sell_success: 49520.25,
      },
      {
        date: '2024-11-25',
        seller_conversations: 620,
        sell_started_count: 510,
        sell_get_quote_count: 412,
        sell_booking_created_count: 275,
        sell_success_count: 215,
        daily_value_sell_success: 53890.00,
      },
      {
        date: '2024-11-26',
        seller_conversations: 540,
        sell_started_count: 445,
        sell_get_quote_count: 358,
        sell_booking_created_count: 235,
        sell_success_count: 182,
        daily_value_sell_success: 45620.50,
      },
      {
        date: '2024-11-27',
        seller_conversations: 590,
        sell_started_count: 485,
        sell_get_quote_count: 392,
        sell_booking_created_count: 260,
        sell_success_count: 202,
        daily_value_sell_success: 50580.75,
      },
      {
        date: '2024-11-28',
        seller_conversations: 520,
        sell_started_count: 425,
        sell_get_quote_count: 343,
        sell_booking_created_count: 225,
        sell_success_count: 183,
        daily_value_sell_success: 46069.00,
      },
    ],
  };
};

export const getSellerFailedMetrics = async (
  airline_name: string,
  startDate: string,
  endDate: string
) => {
  // Simular respuesta de API
  return {
    total_sell_failed: 270,
    failed_by_reason_by_day: [
      {
        date: '2024-11-24',
        reasons: [
          { reason: 'payment_processing', failed_count: 12 },
          { reason: 'seat_selection', failed_count: 8 },
          { reason: 'booking_validation', failed_count: 5 },
        ],
      },
      {
        date: '2024-11-25',
        reasons: [
          { reason: 'payment_processing', failed_count: 15 },
          { reason: 'flight_availability', failed_count: 10 },
          { reason: 'timeout', failed_count: 6 },
        ],
      },
      {
        date: '2024-11-26',
        reasons: [
          { reason: 'rejected', failed_count: 18 },
          { reason: 'passenger_data', failed_count: 9 },
          { reason: 'system_error', failed_count: 4 },
        ],
      },
      {
        date: '2024-11-27',
        reasons: [
          { reason: 'payment_processing', failed_count: 14 },
          { reason: 'seat_selection', failed_count: 11 },
          { reason: 'booking_validation', failed_count: 7 },
        ],
      },
      {
        date: '2024-11-28',
        reasons: [
          { reason: 'rejected', failed_count: 16 },
          { reason: 'flight_availability', failed_count: 8 },
          { reason: 'timeout', failed_count: 5 },
        ],
      },
    ],
  };
};

export const getRecordLocatorMetrics = async (
  airline_name: string,
  startDate: string,
  endDate: string
) => {
  // Simular respuesta de API
  return {
    total_checkin_initiated: 1850,
    total_record_locator_init: 1620,
    total_record_locator_started: 1450,
    total_record_locator_completed: 1180,
    total_record_locator_closed: 1050,
    total_record_locator_failed: 95,
    total_record_locator_abandoned: 175,
    total_record_locator_init_abandoned: 170,
    total_record_locator_create_payment: 320,
    total_record_locator_create_payment_failed: 28,
    record_locator_by_day: [
      {
        date: '2024-11-24',
        checkin_initiated: 380,
        record_locator_init_count: 335,
        record_locator_started_count: 298,
        record_locator_completed_count: 242,
        record_locator_closed_count: 218,
        record_locator_failed_count: 18,
        record_locator_abandoned_count: 38,
        record_locator_create_payment_count: 65,
        record_locator_create_payment_failed_count: 5,
      },
      {
        date: '2024-11-25',
        checkin_initiated: 410,
        record_locator_init_count: 358,
        record_locator_started_count: 320,
        record_locator_completed_count: 265,
        record_locator_closed_count: 238,
        record_locator_failed_count: 22,
        record_locator_abandoned_count: 33,
        record_locator_create_payment_count: 72,
        record_locator_create_payment_failed_count: 6,
      },
      {
        date: '2024-11-26',
        checkin_initiated: 345,
        record_locator_init_count: 302,
        record_locator_started_count: 270,
        record_locator_completed_count: 218,
        record_locator_closed_count: 192,
        record_locator_failed_count: 15,
        record_locator_abandoned_count: 37,
        record_locator_create_payment_count: 58,
        record_locator_create_payment_failed_count: 5,
      },
      {
        date: '2024-11-27',
        checkin_initiated: 385,
        record_locator_init_count: 340,
        record_locator_started_count: 305,
        record_locator_completed_count: 248,
        record_locator_closed_count: 220,
        record_locator_failed_count: 20,
        record_locator_abandoned_count: 37,
        record_locator_create_payment_count: 68,
        record_locator_create_payment_failed_count: 7,
      },
      {
        date: '2024-11-28',
        checkin_initiated: 330,
        record_locator_init_count: 285,
        record_locator_started_count: 257,
        record_locator_completed_count: 207,
        record_locator_closed_count: 182,
        record_locator_failed_count: 20,
        record_locator_abandoned_count: 30,
        record_locator_create_payment_count: 57,
        record_locator_create_payment_failed_count: 5,
      },
    ],
  };
};

export const getBookingManagerMetrics = async (
  airline_name: string,
  startDate: string,
  endDate: string
) => {
  // Simular respuesta de API
  return {
    total_booking_initiated: 2450,
    total_booking_started: 2180,
    total_payment_initiated: 1520,
    total_not_found: 185,
    total_cancelled: 142,
    total_no_pending_balance: 98,
    total_errors: 65,
    total_payment_success: 1280,
    total_payment_failed: 240,
    booking_manager_by_day: [
      {
        date: '2024-11-24',
        booking_initiated_count: 485,
        booking_started_count: 432,
        payment_initiated_count: 302,
        not_found_count: 38,
        cancelled_count: 28,
        no_pending_balance_count: 19,
        error_count: 12,
        payment_success_count: 255,
        payment_failed_count: 47,
      },
      {
        date: '2024-11-25',
        booking_initiated_count: 520,
        booking_started_count: 468,
        payment_initiated_count: 328,
        not_found_count: 42,
        cancelled_count: 32,
        no_pending_balance_count: 22,
        error_count: 15,
        payment_success_count: 278,
        payment_failed_count: 50,
      },
      {
        date: '2024-11-26',
        booking_initiated_count: 445,
        booking_started_count: 395,
        payment_initiated_count: 275,
        not_found_count: 32,
        cancelled_count: 25,
        no_pending_balance_count: 17,
        error_count: 11,
        payment_success_count: 232,
        payment_failed_count: 43,
      },
      {
        date: '2024-11-27',
        booking_initiated_count: 510,
        booking_started_count: 452,
        payment_initiated_count: 318,
        not_found_count: 38,
        cancelled_count: 30,
        no_pending_balance_count: 21,
        error_count: 14,
        payment_success_count: 268,
        payment_failed_count: 50,
      },
      {
        date: '2024-11-28',
        booking_initiated_count: 490,
        booking_started_count: 433,
        payment_initiated_count: 297,
        not_found_count: 35,
        cancelled_count: 27,
        no_pending_balance_count: 19,
        error_count: 13,
        payment_success_count: 247,
        payment_failed_count: 50,
      },
    ],
  };
};

export const getDisruptionMetrics = async (
  airline_name: string,
  startDate: string,
  endDate: string
) => {
  // Simular respuesta de API
  return {
    total_disruption_conversations: 1850,
    total_disruption_initiated: 1620,
    total_voluntary: 890,
    total_involuntary: 520,
    total_accepted: 385,
    total_confirmed: 680,
    total_sell_success: 520,
    total_sell_failed: 85,
    total_finished: 520,
    total_payment_success: 520,
    disruption_by_day: [
      {
        date: '2024-11-24',
        disruption_conversations: 380,
        disruption_initiated_count: 335,
        voluntary_count: 185,
        involuntary_count: 108,
        accepted_count: 80,
        confirmed_count: 142,
        sell_success_count: 108,
        sell_failed_count: 18,
      },
      {
        date: '2024-11-25',
        disruption_conversations: 410,
        disruption_initiated_count: 358,
        voluntary_count: 198,
        involuntary_count: 115,
        accepted_count: 85,
        confirmed_count: 152,
        sell_success_count: 115,
        sell_failed_count: 20,
      },
      {
        date: '2024-11-26',
        disruption_conversations: 345,
        disruption_initiated_count: 302,
        voluntary_count: 165,
        involuntary_count: 98,
        accepted_count: 72,
        confirmed_count: 128,
        sell_success_count: 98,
        sell_failed_count: 15,
      },
      {
        date: '2024-11-27',
        disruption_conversations: 385,
        disruption_initiated_count: 340,
        voluntary_count: 188,
        involuntary_count: 110,
        accepted_count: 82,
        confirmed_count: 145,
        sell_success_count: 110,
        sell_failed_count: 18,
      },
      {
        date: '2024-11-28',
        disruption_conversations: 330,
        disruption_initiated_count: 285,
        voluntary_count: 154,
        involuntary_count: 89,
        accepted_count: 66,
        confirmed_count: 113,
        sell_success_count: 89,
        sell_failed_count: 14,
      },
    ],
  };
};

export const getNpsMetrics = async (
  airline_name: string,
  startDate: string,
  endDate: string
) => {
  // Simular respuesta de API
  return {
    total_surveys_sent: 2450,
    total_responses: 1680,
    response_rate: 68.6,
    nps_score: 42,
    promoters: 890,
    passives: 520,
    detractors: 270,
    nps_by_day: [
      {
        date: '2024-11-24',
        surveys_sent: 490,
        responses: 336,
        promoters: 178,
        passives: 104,
        detractors: 54,
        nps_score: 37,
      },
      {
        date: '2024-11-25',
        surveys_sent: 520,
        responses: 358,
        promoters: 192,
        passives: 110,
        detractors: 56,
        nps_score: 38,
      },
      {
        date: '2024-11-26',
        surveys_sent: 445,
        responses: 305,
        promoters: 165,
        passives: 95,
        detractors: 45,
        nps_score: 39,
      },
      {
        date: '2024-11-27',
        surveys_sent: 510,
        responses: 352,
        promoters: 188,
        passives: 108,
        detractors: 56,
        nps_score: 38,
      },
      {
        date: '2024-11-28',
        surveys_sent: 485,
        responses: 329,
        promoters: 167,
        passives: 103,
        detractors: 59,
        nps_score: 33,
      },
    ],
  };
};

export const getMessagesPerAgentMetrics = async (
  airline_name: string,
  startDate: string,
  endDate: string
) => {
  // Simular respuesta de API
  return {
    total_messages: 15420,
    total_agents: 45,
    avg_messages_per_agent: 342.7,
    messages_by_agent: [
      { agent_id: 'agent_001', agent_name: 'Agent Alpha', messages: 520 },
      { agent_id: 'agent_002', agent_name: 'Agent Beta', messages: 485 },
      { agent_id: 'agent_003', agent_name: 'Agent Gamma', messages: 412 },
      { agent_id: 'agent_004', agent_name: 'Agent Delta', messages: 398 },
      { agent_id: 'agent_005', agent_name: 'Agent Epsilon', messages: 375 },
    ],
    messages_by_day: [
      { date: '2024-11-24', total_messages: 3120, active_agents: 42 },
      { date: '2024-11-25', total_messages: 3280, active_agents: 44 },
      { date: '2024-11-26', total_messages: 2950, active_agents: 40 },
      { date: '2024-11-27', total_messages: 3180, active_agents: 43 },
      { date: '2024-11-28', total_messages: 2890, active_agents: 39 },
    ],
  };
};

export const getCheckinSegmentMetrics = async (
  airline_name: string,
  startDate: string,
  endDate: string
) => {
  // Simular respuesta de API
  return {
    segments_table: [
      {
        departure_airport: 'BOG',
        conexion_airport: 'None',
        arrival_airport: 'MDE',
        segment_init_count: 450,
        segment_started_count: 385,
        segment_completed_count: 342,
        segment_closed_count: 318,
      },
      {
        departure_airport: 'MDE',
        conexion_airport: 'None',
        arrival_airport: 'BOG',
        segment_init_count: 420,
        segment_started_count: 365,
        segment_completed_count: 320,
        segment_closed_count: 298,
      },
      {
        departure_airport: 'BOG',
        conexion_airport: 'CTG',
        arrival_airport: 'MIA',
        segment_init_count: 280,
        segment_started_count: 245,
        segment_completed_count: 218,
        segment_closed_count: 195,
      },
      {
        departure_airport: 'MIA',
        conexion_airport: 'BOG',
        arrival_airport: 'MDE',
        segment_init_count: 195,
        segment_started_count: 172,
        segment_completed_count: 152,
        segment_closed_count: 138,
      },
      {
        departure_airport: 'CLO',
        conexion_airport: 'None',
        arrival_airport: 'BOG',
        segment_init_count: 320,
        segment_started_count: 278,
        segment_completed_count: 245,
        segment_closed_count: 225,
      },
      {
        departure_airport: 'BOG',
        conexion_airport: 'None',
        arrival_airport: 'CLO',
        segment_init_count: 335,
        segment_started_count: 292,
        segment_completed_count: 258,
        segment_closed_count: 238,
      },
      {
        departure_airport: 'CTG',
        conexion_airport: 'None',
        arrival_airport: 'BOG',
        segment_init_count: 185,
        segment_started_count: 162,
        segment_completed_count: 142,
        segment_closed_count: 128,
      },
      {
        departure_airport: 'BOG',
        conexion_airport: 'None',
        arrival_airport: 'BOG',
        segment_init_count: 145,
        segment_started_count: 128,
        segment_completed_count: 115,
        segment_closed_count: 105,
      },
    ],
  };
};

