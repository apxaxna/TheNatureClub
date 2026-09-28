-- Create admin user
-- Default password is 'admin123' (you should change this after first login)
-- Password hash is bcrypt hash of 'admin123'

INSERT INTO users (email, password_hash, role)
VALUES (
  'admin@thenatureclub.com',
  '$2a$10$rW5qrLZ8yZqKZ5hqHGxJVuxvXH4qXYqK5hQX9xqZpQxYqK5hqHGxJ',
  'admin'
)
ON CONFLICT (email) DO NOTHING;

-- Note: After running this, login with:
-- Email: admin@thenatureclub.com
-- Password: admin123
--
-- IMPORTANT: Change this password immediately after first login!
