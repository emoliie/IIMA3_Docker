USE moodtracker;

CREATE TABLE IF NOT EXISTS moods (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    emoji VARCHAR(10) NOT NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT INTO moods (name, emoji) VALUES
    ('excellent', '😄'),
    ('good', '🙂'),
    ('neutral', '😐'),
    ('bad', '😔');

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Ajout d’un utilisateur test
INSERT INTO users (username, email, password) VALUES
("test", "test@example.com", "$2b$10$1r5yQeHkFBB6P2nR8xDS2u6Ia8ys2DWMhRkYjqMOEMf7iU9QoPhnO");
-- Mot de passe : test1234

CREATE TABLE IF NOT EXISTS entries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL UNIQUE,
    mood_id INT NOT NULL,
    comment TEXT,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (mood_id) REFERENCES moods(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_date (date)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Exemple d’insertion dans entries
INSERT INTO entries (date, mood_id, comment, user_id) VALUES
    ('2025-10-01', 1, "Journée incroyable ! Tout s'est bien passé au travail.", 1),
    ('2025-10-02', 2, "Bonne journée, productive et agréable.", 1),
    ('2025-10-03', 3, "Journée normale, rien de spécial.", 1),
    ('2025-10-04', 4, "Journée difficile, beaucoup de stress.", 1);

-- Message pour vérifier que la base est initialisée
SELECT 'Base de données Mood Tracker initialisée avec succès!' AS message;
SELECT COUNT(*) AS total_entries FROM entries;
