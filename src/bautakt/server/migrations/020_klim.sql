-- Vorlagenzeilen: Notizen (z. B. KLIM-Modulwissen) und Stand beim Anlegen (z. B. KLIM-Baufortschritt)
ALTER TABLE template_tasks ADD COLUMN notes TEXT;
ALTER TABLE template_tasks ADD COLUMN stand TEXT;

-- Prüfsumme datengetriebener Vorlagen: nur neu einspielen, wenn sich der Inhalt geändert hat
ALTER TABLE project_templates ADD COLUMN content_hash TEXT;

-- Verknüpfung Projekt <-> KLIM-Vorlage für den Abgleich mit der Tafel „KLIM-Weg – Baufortschritt“
CREATE TABLE project_klim_links (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL UNIQUE REFERENCES projects(id) ON DELETE CASCADE,
  template_id TEXT NOT NULL,
  tafel_stand TEXT NOT NULL DEFAULT '',
  pending_stand TEXT,
  mapping TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL,
  last_synced_at TEXT
);
