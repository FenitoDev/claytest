# Clay internationalization api documentation

### 1. Get Translations by Language

**Endpoint:** `GET /translations/:language`

**Description:** Retrieve all translations for a specific language.

**Parameters:**

- `language` (string, required): The language code (e.g., "en", "es").

**Response:**

- `200 OK`: Returns an array of translation objects.
- `404 Not Found`: No translations found for the specified language.

**Example Request:**

`GET /translations/en`

**Example Response:**

```
[
	{
		"_id": "64d56f58f1b2a78a7e6f3e1b",
		"language": "en",
		"key": "greeting",
		"text": "Hello"
	},
	{
		"_id": "64d56f58f1b2a78a7e6f3e1c",
		"language": "en",
		"key": "farewell",
		"text": "Goodbye"
	}
]
```

---

### 2. Create a New Translation

**Endpoint:** `POST /translations`

**Description:** Add a new translation to the database.

**Request Body:**

- `language` (string, required): The language code.
- `key` (string, required): The translation key.
- `text` (string, required): The translated text.

**Response:**

- `201 Created`: Returns the newly created translation object.
- `400 Bad Request`: Invalid data provided.

**Example Request:**

```
POST /translations
Content-Type: application/json
{
	"language": "en",
	"key": "welcome",
	"text": "Welcome"
}
```

**Example Response:**

```
{
	"_id": "64d5708df1b2a78a7e6f3e1d",
	"language": "en",
	"key": "welcome",
	"text": "Welcome"
}
```

---

### 3. Update a Translation (Full Update)

**Endpoint:** `PUT /translations/:id`

**Description:** Replace an existing translation with new data.

**Parameters:**

- `id` (string, required): The ID of the translation to update.

**Request Body:**

- `language` (string, required): The language code.
- `key` (string, required): The translation key.
- `text` (string, required): The translated text.

**Response:**

- `200 OK`: Returns the updated translation object.
- `404 Not Found`: Translation with the specified ID not found.
- `500 Internal Server Error`: Error during the update process.

**Example Request:**

```
PUT /translations/64d5708df1b2a78a7e6f3e1d
Content-Type: application/json
{
	"language": "en",
	"key": "welcome",
	"text": "Welcome to our site!"
}
```

**Example Response:**

```
{
	"_id": "64d5708df1b2a78a7e6f3e1d",
	"language": "en",
	"key": "welcome",
	"text": "Welcome to our site!"
}
```

---

### 4. Update a Translation (Partial Update)

**Endpoint:** `PATCH /translations/:id`

**Description:** Update specific fields of an existing translation.

**Parameters:**

- `id` (string, required): The ID of the translation to update.

**Request Body:**

- Any combination of `language`, `key`, or `text`.

**Response:**

- `200 OK`: Returns the updated translation object.
- `404 Not Found`: Translation with the specified ID not found.
- `500 Internal Server Error`: Error during the update process.

**Example Request:**

```
PATCH /translations/64d5708df1b2a78a7e6f3e1d
Content-Type: application/json
{ "text": "Welcome aboard!" }
```

**Example Response:**

```
{
	"_id": "64d5708df1b2a78a7e6f3e1d",
	"language": "en",
	"key": "welcome",
	"text": "Welcome aboard!"
}
```

---

### 5. Delete a Translation

**Endpoint:** `DELETE /translations/:id`

**Description:** Delete a translation by its ID.

**Parameters:**

- `id` (string, required): The ID of the translation to delete.

**Response:**

- `204 No Content`: Translation successfully deleted.
- `404 Not Found`: Translation with the specified ID not found.
- `500 Internal Server Error`: Error during the deletion process.

**Example Request:**

`DELETE /translations/64d5708df1b2a78a7e6f3e1d`

**Example Response:**

`{ "message": "Translation deleted" }`

---

Note: Even though there are 5 endpoints, the client does not currently use the `PUT` endpoint.
