-- Add content_html field to blogs for rich text content
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS content_html TEXT;

-- Note: featured_image already exists in blogs table

-- Add content_html field to destinations for rich text content
ALTER TABLE destinations ADD COLUMN IF NOT EXISTS content_html TEXT;
