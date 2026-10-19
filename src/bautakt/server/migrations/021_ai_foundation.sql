-- KI-Fundament: Protokoll jedes KI-Aufrufs (Modell, Dauer, Token, Fehler) - zeigt bei Problemen
-- sofort, woran es lag - und Zwischenspeicher fertiger Schritte großer KI-Aufgaben: bricht die
-- Verbindung ab, setzt ein erneuter Aufruf mit derselben Auftragskennung dort fort.

CREATE TABLE ai_calls (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  label TEXT NOT NULL,
  model TEXT NOT NULL,
  status TEXT NOT NULL,
  duration_ms INTEGER NOT NULL DEFAULT 0,
  input_tokens INTEGER NOT NULL DEFAULT 0,
  output_tokens INTEGER NOT NULL DEFAULT 0,
  attempts INTEGER NOT NULL DEFAULT 1,
  error TEXT
);
CREATE INDEX IF NOT EXISTS idx_ai_calls_created ON ai_calls(created_at);

CREATE TABLE ai_step_cache (
  job_id TEXT NOT NULL,
  step_key TEXT NOT NULL,
  result TEXT NOT NULL,
  created_at TEXT NOT NULL,
  PRIMARY KEY (job_id, step_key)
);
CREATE INDEX IF NOT EXISTS idx_ai_step_cache_created ON ai_step_cache(created_at);
