
# Group Management Backend

This is a simple Flask backend for the Group Management application.

## Setup Instructions

1. Create a virtual environment:
   ```
   python -m venv venv
   ```

2. Activate the virtual environment:
   - On Windows: `venv\Scripts\activate`
   - On macOS/Linux: `source venv/bin/activate`

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Run the Flask application:
   ```
   python app.py
   ```

The server will start at http://localhost:9180

## API Endpoints

- `POST /api/groups` - Create a new group
- `GET /api/groups` - Get all groups
