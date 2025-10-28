CREATE TABLE IF NOT EXISTS raw_mgnrega_responses (
  id SERIAL PRIMARY KEY,
  fetched_at TIMESTAMP DEFAULT now(),
  api_endpoint TEXT,
  response JSONB
);

CREATE TABLE IF NOT EXISTS mgnrega_snapshots (
  id SERIAL PRIMARY KEY,
  district_id INT,
  district_name TEXT,
  year INT,
  month INT,
  people_benefited BIGINT,
  persondays_provided BIGINT,
  fund_util_percent NUMERIC,
  created_at TIMESTAMP DEFAULT now(),
  source_raw JSONB
);

CREATE TABLE IF NOT EXISTS districts (
  id SERIAL PRIMARY KEY,
  state TEXT,
  district_code TEXT,
  district_name TEXT
);

INSERT INTO districts(state,district_code,district_name) VALUES
('Tamil Nadu','TN01','Chennai'),
('Tamil Nadu','TN02','Coimbatore')
ON CONFLICT DO NOTHING;
