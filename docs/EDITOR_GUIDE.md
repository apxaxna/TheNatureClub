# Rich Text Editor & Media Library Guide

## Overview

Phase 5 implementation includes a fully-featured rich text editor with media management capabilities.

## Features

### Rich Text Editor (Tiptap)
- **Text Formatting**: Bold, Italic, Headings (H2, H3)
- **Lists**: Bullet lists and numbered lists
- **Links**: Inline hyperlinks
- **Images**: Inline image insertion with optimization
- **Videos**: YouTube embed support
- **Blockquotes**: Quote formatting

### Media Library
- **Upload**: Multi-file image uploads
- **Optimization**: Automatic WebP conversion with Sharp
- **Management**: View, select, and delete media files
- **Bulk Operations**: Select and delete multiple files
- **File Info**: Display file size and upload date

### Image Optimization
- Automatic resize to max 1920x1920px
- WebP conversion for optimal file size
- Quality set to 85% (balance between size and quality)
- Original aspect ratio maintained

## Usage

### Using the Rich Text Editor

```tsx
'use client';

import { useState } from 'react';
import RichTextEditor from '@/components/RichTextEditor';

export default function MyPage() {
  const [content, setContent] = useState('');

  const handleSave = async () => {
    // Save content to your API
    await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
  };

  return (
    <div>
      <RichTextEditor
        content={content}
        onChange={setContent}
        placeholder="Start writing..."
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}
```

### Using the Media Library

```tsx
'use client';

import { useState } from 'react';
import MediaLibrary from '@/components/MediaLibrary';

export default function MyPage() {
  const [showLibrary, setShowLibrary] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  return (
    <div>
      <button onClick={() => setShowLibrary(true)}>
        Select Image
      </button>

      {selectedImage && (
        <img src={selectedImage} alt="Selected" />
      )}

      {showLibrary && (
        <MediaLibrary
          onSelect={(url) => {
            setSelectedImage(url);
            setShowLibrary(false);
          }}
          onClose={() => setShowLibrary(false)}
        />
      )}
    </div>
  );
}
```

### Direct Upload API

```typescript
const handleUpload = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  console.log('Uploaded:', data.url);
};
```

## API Endpoints

### POST /api/upload
Upload and optimize an image file.

**Request:**
- Content-Type: multipart/form-data
- Body: file (image file)

**Response:**
```json
{
  "id": 1,
  "url": "/uploads/1234567890.webp",
  "fileName": "1234567890.webp",
  "fileType": "image/webp",
  "size": 45678,
  "uploadedAt": "2026-09-09T12:00:00.000Z"
}
```

### GET /api/media
Retrieve all uploaded media files.

**Response:**
```json
{
  "media": [
    {
      "id": 1,
      "fileName": "1234567890.webp",
      "url": "/uploads/1234567890.webp",
      "fileType": "image/webp",
      "size": 45678,
      "uploadedAt": "2026-09-09T12:00:00.000Z"
    }
  ]
}
```

### DELETE /api/media/:id
Delete a media file.

**Response:**
```json
{
  "success": true
}
```

## Database Schema

The media table stores metadata for uploaded files:

```sql
CREATE TABLE media (
    id SERIAL PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    url VARCHAR(500) NOT NULL,
    file_type VARCHAR(50) NOT NULL,
    size INTEGER NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    uploaded_by INTEGER REFERENCES users(id) ON DELETE SET NULL
);
```

Rich content fields added to blogs and events:

```sql
ALTER TABLE blogs ADD COLUMN content_html TEXT;
ALTER TABLE blogs ADD COLUMN featured_image VARCHAR(500);

ALTER TABLE events ADD COLUMN content_html TEXT;
ALTER TABLE events ADD COLUMN featured_image VARCHAR(500);
```

## Setup Instructions

1. **Install Dependencies:**
   ```bash
   npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-image @tiptap/extension-link @tiptap/extension-youtube sharp
   ```

2. **Run Database Migrations:**
   ```bash
   node scripts/migrate.js
   ```

3. **Create Uploads Directory:**
   The upload API will automatically create `public/uploads/` if it doesn't exist.

4. **Test the Editor:**
   Visit `/admin/editor-demo` to try out the editor and media library.

## Editor Toolbar

| Button | Function |
|--------|----------|
| **B** | Bold text |
| *I* | Italic text |
| H2 | Heading level 2 |
| H3 | Heading level 3 |
| • List | Bullet list |
| 1. List | Numbered list |
| 🔗 Link | Insert hyperlink |
| 🖼️ Image | Upload image |
| 📹 YouTube | Embed YouTube video |
| " Quote | Blockquote |

## Image Upload Flow

1. User selects image from toolbar or media library
2. File is uploaded to `/api/upload`
3. Sharp processes the image:
   - Resizes to max 1920x1920px
   - Converts to WebP format
   - Compresses to 85% quality
4. File saved to `public/uploads/`
5. Metadata saved to database
6. URL returned and inserted into editor

## Media Library Features

- **Grid View**: Responsive grid layout (2-5 columns)
- **Selection Mode**: Click to select/deselect files
- **Bulk Delete**: Delete multiple files at once
- **Quick Actions**: Hover to see Select/Delete buttons
- **File Info**: Shows filename and size for each file
- **Upload Multiple**: Select and upload multiple files at once

## Best Practices

1. **Image Sizes**: Upload reasonably sized images (under 5MB)
2. **Alt Text**: Add descriptive alt text for accessibility
3. **File Organization**: Use descriptive filenames before upload
4. **Regular Cleanup**: Delete unused media files to save space
5. **Content Backup**: Save editor content regularly

## Troubleshooting

**Upload fails:**
- Check file type (must be jpg, jpeg, png, webp, or gif)
- Ensure `public/uploads/` is writable
- Check database connection

**Images not displaying:**
- Verify file exists in `public/uploads/`
- Check URL path is correct
- Ensure Next.js is serving static files

**Editor not loading:**
- Check Tiptap packages are installed
- Verify component is used in client component ('use client')
- Check browser console for errors

## Future Enhancements

- [ ] Drag-and-drop upload
- [ ] Image editing (crop, rotate, filters)
- [ ] Video uploads
- [ ] File organization (folders/tags)
- [ ] CDN integration
- [ ] User-specific media libraries
- [ ] Advanced search and filtering
