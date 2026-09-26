-- Media storage table
CREATE TABLE IF NOT EXISTS media (
    id SERIAL PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    url VARCHAR(500) NOT NULL,
    file_type VARCHAR(50) NOT NULL,
    size INTEGER NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    uploaded_by UUID REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX idx_media_uploaded_at ON media(uploaded_at DESC);
CREATE INDEX idx_media_uploaded_by ON media(uploaded_by);
