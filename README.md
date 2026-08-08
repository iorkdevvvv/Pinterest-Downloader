# Pinterest Downloader

[![License](https://img.shields.io/github/license/iorkdevvvv/Pinterest-Downloader)](./LICENSE)
[![Node.js](https://img.shields.io/badge/node.js-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![GitHub stars](https://img.shields.io/github/stars/iorkdevvvv/Pinterest-Downloader?style=flat)](https://github.com/iorkdevvvv/Pinterest-Downloader/stargazers)
[![Last commit](https://img.shields.io/github/last-commit/iorkdevvvv/Pinterest-Downloader)](https://github.com/iorkdevvvv/Pinterest-Downloader/commits/main)

A small Node.js wrapper for downloading Pinterest media through the PinDL API.

```text
https://cedds-api.duckdns.org/downloader/pintedl?url=
```

## Table of contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Use as a module](#use-as-a-module)
- [Use from the command line](#use-from-the-command-line)
- [API request format](#api-request-format)
- [cURL request](#curl-request)
- [Example response](#example-response)
- [Response fields](#response-fields)
- [Extract a download URL](#extract-a-download-url)
- [Error handling](#error-handling)
- [Project information](#project-information)
- [License](#license)

## Features

- Supports Pinterest share links, including `pin.it` URLs
- Uses Node.js native `fetch`
- Returns video and image download URLs
- Includes JavaScript module and command-line usage
- Validates input URLs and handles API errors

## Requirements

- Node.js 18 or newer

Node.js 18+ includes the native `fetch` API, so no extra HTTP package is
required.

## Installation

Clone the repository and install the project:

```bash
git clone https://github.com/iorkdevvvv/Pinterest-Downloader.git
cd Pinterest-Downloader
npm install
```

## Use as a module

```js
const { ceddsdl } = require("./index");

async function main() {
  try {
    const result = await ceddsdl("https://pin.it/24teffNlt");
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}

main();
```

The function returns the API's parsed JSON response. If the API responds with
non-JSON content, it returns the response as text.

## Use from the command line

```bash
node index.js "https://pin.it/24teffNlt"
```

Or:

```bash
npm start -- "https://pin.it/24teffNlt"
```

## API request format

The wrapper URL-encodes the Pinterest URL and sends a request in this format:

```text
GET https://cedds-api.duckdns.org/downloader/pintedl?url=<encoded-pinterest-url>
```

## cURL request

```bash
curl --get \
  --data-urlencode "url=https://pin.it/24teffNlt" \
  "https://cedds-api.duckdns.org/downloader/pintedl"
```

## Example response

Request:

```text
https://cedds-api.duckdns.org/downloader/pintedl?url=https%3A%2F%2Fpin.it%2F24teffNlt
```

Tested with `https://pin.it/24teffNlt`, the API returned:

```json
{
  "operator": "ceddsdev",
  "timestamp": "2026-08-08T22:43:02.871Z",
  "responseTime": "928ms",
  "success": true,
  "data": {
    "source_url": "https://pin.it/24teffNlt",
    "pin_id": "977703400484037522",
    "title": "Pinterest Video Downloader- KlickPin",
    "thumbnail": "https://i.pinimg.com/736x/8c/94/92/8c9492983c6210b09be8ec97777278cd.jpg",
    "downloads": [
      {
        "type": "video",
        "quality": "hd",
        "url": "https://v1.pinimg.com/videos/iht/expMp4/7a/e4/d7/7ae4d7839c2e821ca4f9861549fda385_720w.mp4",
        "thumbnail": "https://i.pinimg.com/736x/8c/94/92/8c9492983c6210b09be8ec97777278cd.jpg"
      },
      {
        "type": "image",
        "quality": "standard",
        "url": "https://i.pinimg.com/736x/8c/94/92/8c9492983c6210b09be8ec97777278cd.jpg"
      }
    ]
  }
}
```

## Response fields

| Field | Description |
| --- | --- |
| `operator` | Name of the API operator |
| `timestamp` | Time when the API generated the response |
| `responseTime` | API processing time |
| `success` | Whether the request was successful |
| `data.source_url` | Original Pinterest URL |
| `data.pin_id` | Pinterest pin identifier |
| `data.title` | Title associated with the pin |
| `data.thumbnail` | Preview image URL |
| `data.downloads` | Available image and video download options |
| `downloads.type` | Media type, such as `video` or `image` |
| `downloads.quality` | Available media quality |
| `downloads.url` | Direct media download URL |
| `downloads.thumbnail` | Preview image for a video download, when available |

## Extract a download URL

```js
const { ceddsdl } = require("./index");

async function downloadLinks() {
  const result = await ceddsdl("https://pin.it/24teffNlt");

  const video = result.data.downloads.find(
    (item) => item.type === "video",
  );
  const image = result.data.downloads.find(
    (item) => item.type === "image",
  );

  console.log("Video URL:", video?.url);
  console.log("Image URL:", image?.url);
}

downloadLinks().catch(console.error);
```

## Error handling

`ceddsdl()` throws an error when:

- the Pinterest URL is missing or invalid;
- the URL does not use `http` or `https`; or
- the API returns a non-2xx HTTP status.

## Project information

- **Repository:** [iorkdevvvv/Pinterest-Downloader](https://github.com/iorkdevvvv/Pinterest-Downloader)
- **Operator:** Jaymar Cedd
- **Maintainer:** [iorkdevvvv](https://github.com/iorkdevvvv)
- **Runtime:** Node.js 18 or newer
- **License:** MIT

## License

This project is licensed under the [MIT License](./LICENSE).
