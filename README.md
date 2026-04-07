# Free APIs Backend

A comprehensive REST API backend that provides a curated collection of free APIs for front-end applications. Built with Express.js and MongoDB, this project makes it easy to discover, filter, sort, and access publicly available APIs.

## 🚀 Live Deployment

This project is deployed on **Vercel** and is live at:
**[https://free-apis-abhi.vercel.app/](https://free-apis-abhi.vercel.app/)**

## Features

- **Search APIs** - Find APIs by name with case-insensitive search
- **Filter by Category** - Browse APIs by category (Art & Design, Animals, Tracking, etc.)
- **Filter by Authentication** - Find APIs based on auth type (None, API Key, OAuth)
- **Filter by HTTPS** - Filter APIs that support or don't require HTTPS
- **Combine Filters** - Use multiple filters together for precise results
- **Random API** - Get a random API from the database
- **CORS Enabled** - Pre-configured for frontend applications

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-Origin Resource Sharing
- **Dotenv** - Environment variable management

## Project Structure

```
free-apis-backend/
├── app.js                 # Main application file
├── bin/www               # Server entry point
├── models/               # Database models
│   ├── Category.js       # API category model
│   ├── List.js          # Category list model
│   └── user.js          # User model
├── routes/               # API routes
│   ├── category.js      # Category endpoints
│   ├── lists.js         # Lists endpoints
│   ├── index.js         # Index routes
│   └── profile.js       # Profile routes
├── middleware/           # Custom middleware
├── utils/               # Utilities
├── public/              # Static files
├── views/               # View templates
├── package.json         # Dependencies
```

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/akuma392/free-apis.git
   cd free-apis-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables**
   Create a `.env` file in the root directory:

   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
   ```

4. **Start the server**
   ```bash
   npm start
   ```
   Server runs on `http://localhost:3000`

## API Endpoints

### Get All APIs / Search

- **GET** `/api/category`
- **Query Parameters:**
  - `q` - Search term for API name (optional)
  - `auth` - Filter by auth type: `""`, `apiKey`, `OAuth` (optional)
  - `https` or `HTTPS` - Filter by HTTPS support: `true` or `false` (optional)

**Example:**

```
GET /api/category?q=color&auth=apiKey&https=true
```

**Response:**

```json
{
  "filters": {
    "searchTerm": "color",
    "auth": "apiKey",
    "https": "true"
  },
  "count": 2,
  "categories": [
    {
      "_id": "69d11f75ebbcf526e464b713",
      "API": "ColorMagic",
      "Description": "Color Palette Generator",
      "Auth": "apiKey",
      "HTTPS": true,
      "Cors": "yes",
      "Link": "https://colormagic.app/api",
      "Category": "Art & Design"
    }
  ]
}
```

### Get APIs by Category

- **GET** `/api/category/:slug`
- **Parameters:**
  - `slug` - Category slug (e.g., `art-and-design`, `tracking`)

**Example:**

```
GET /api/category/art-and-design
```

### Get Random API

- **GET** `/api/category/random`

**Response:**

```json
{
  "Number": 5,
  "category": {
    "_id": "69d11f75ebbcf526e464b713",
    "API": "ColorMagic",
    "Description": "Color Palette Generator",
    ...
  }
}
```

### Get All Categories

- **GET** `/api/lists`

**Response:**

```json
[
  {
    "_id": "69d20c16f69830963e241af0",
    "name": "Art & Design",
    "slug": "art-and-design"
  },
  {
    "_id": "69d20c16f69830963e241af1",
    "name": "Tracking",
    "slug": "tracking"
  }
]
```

## Usage Examples

### Search for APIs containing "color"

```bash
curl "http://localhost:3000/api/category?q=color"
```

### Find HTTPS-enabled APIs without authentication

```bash
curl "http://localhost:3000/api/category?auth=&https=true"
```

### Get APIs in the Art & Design category

```bash
curl "http://localhost:3000/api/category/art-and-design"
```

### Find APIs with OAuth authentication

```bash
curl "http://localhost:3000/api/category?auth=OAuth"
```

### Combine multiple filters

```bash
curl "http://localhost:3000/api/category?q=api&auth=apiKey&https=true"
```

## Database Schema

### Category Collection

```javascript
{
  API: String,           // API name
  Description: String,   // Brief description
  Auth: String,          // Authentication type: "", "apiKey", "OAuth"
  HTTPS: Boolean,        // Supports HTTPS
  Cors: String,          // CORS support: "yes", "no", "unknown"
  Link: String,          // URL to API documentation
  Category: String       // Category name (e.g., "Art & Design")
}
```

### List Collection

```javascript
{
  name: String,          // Category name (e.g., "Art & Design")
  slug: String           // URL-friendly slug (e.g., "art-and-design")
}
```

## Environment Variables

- `MONGODB_URI` - MongoDB connection string (required)

**Example .env file:**

```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/collections
```

## CORS Configuration

CORS is enabled for all origins. Modify in `app.js` if needed:

```javascript
app.use(cors()); // Allow all origins
```

## Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `400` - Bad request (missing required parameters)
- `404` - Not found (category doesn't exist)
- `500` - Server error

## Development

- Uses Morgan for HTTP request logging
- Jade for view templating
- Cookie-parser for session management

## Future Enhancements

- User authentication and authorization
- API rating and reviews
- Add/update/delete API functionality
- Advanced filtering options
- Pagination for large result sets
- API documentation generation
- Rate limiting

## Data Sources

The API dataset has been curated and imported from the following open-source repositories:

1. **[public-apis/public-apis](https://github.com/public-apis/public-apis)** - A comprehensive list of free APIs for use in software and web development
2. **[marcelscruz/public-apis](https://github.com/marcelscruz/public-apis)** - A curated list of free and open APIs

All APIs in this backend have been sourced, verified, and organized from these two repositories. We're grateful to these projects for maintaining such extensive and well-documented API collections. For more information about specific APIs, credit, and usage guidelines, please visit the original repositories.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open-source and available under the MIT License.

## Support

For issues or questions, please open an issue on the [GitHub repository](https://github.com/akuma392/free-apis).
