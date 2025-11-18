USE moodtracker;

CREATE TABLE IF NOT EXISTS mood_entries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL UNIQUE,
    mood VARCHAR(20) NOT NULL,
    mood_emoji VARCHAR(10) NOT NULL,
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_date (date)
);

INSERT INTO mood_entries (date, mood, mood_emoji, note) VALUES
    ('2025-10-01', 'excellent', '😄', 'Journée incroyable ! Tout s\'est bien passé au travail.'),
    ('2025-10-02', 'good', '🙂', 'Bonne journée, productive et agréable.'),
    ('2025-10-03', 'neutral', '😐', 'Journée normale, rien de spécial.'),
    ('2025-10-04', 'bad', '😔', 'Journée difficile, beaucoup de stress.'),
    ('2025-10-05', 'excellent', '😄', 'Week-end parfait avec la famille !'),
    ('2025-10-06', 'good', '🙂', 'Dimanche relaxant, lecture et repos.'),
    ('2025-10-07', 'good', '🙂', 'Bon début de semaine.');

-- Afficher les données insérées
SELECT 'Base de données Mood Tracker initialisée avec succès!' AS message;
SELECT COUNT(*) AS total_entries FROM mood_entries;