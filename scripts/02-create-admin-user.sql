-- Create initial admin user
-- Replace the email and password_hash with actual values
-- To generate password hash, use: bcrypt.hash('your_password', 10)

INSERT INTO admin_users (email, password_hash)
VALUES (
  'admin@twentyfivemade.com',
  -- Password: 'admin123' (bcrypt hash)
  '$2a$10$9IQmtna7I5NyIEnJlylR8OPST9/PgBkqquzi.Ee3SE/PCFrTa8kKW'
)
ON CONFLICT (email) DO NOTHING;

-- Add sample categories
INSERT INTO categories (name, description)
VALUES 
  ('Electronics', 'Electronic devices and gadgets'),
  ('Home & Garden', 'Home and garden products'),
  ('Fashion', 'Clothing and accessories')
ON CONFLICT DO NOTHING;

-- Verify the data
SELECT COUNT(*) as admin_users_count FROM admin_users;
SELECT COUNT(*) as categories_count FROM categories;
