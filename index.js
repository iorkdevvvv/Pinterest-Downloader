/**@Developed by: Jaymar Cedd */
const CEDDS =
  "https://cedds-api.duckdns.org/downloader/pintedl?url=";

/**
 * Fetch Pinterest download information from the PinDL API.
 *
 * @param {string} pinterestUrl A Pinterest pin, board, or shared URL.
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {Promise<unknown>} The JSON response, or text when the API does not return JSON.
 */
async function ceddsdl(pinterestUrl, options = {}) {
  if (typeof pinterestUrl !== "string" || pinterestUrl.trim() === "") {
    throw new TypeError("A Pinterest URL is required.");
  }

  let url;
  try {
    url = new URL(pinterestUrl.trim());
  } catch {
    throw new TypeError("Please provide a valid Pinterest URL.");
  }

  if (!["http:", "https:"].includes(url.protocol)) {
    throw new TypeError("The Pinterest URL must use http or https.");
  }

  const response = await fetch(`${CEDDS}${encodeURIComponent(url.href)}`, {
    signal: options.signal,
    headers: {
      Accept: "application/json, text/plain;q=0.9, */*;q=0.8",
      "User-Agent": "pindl-fetch/1.0.0",
    },
  });

  const contentType = response.headers.get("content-type") || "";
  const body = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof body === "string" ? body : JSON.stringify(body);
    throw new Error(`ERROR (${response.status}): ${message}`);
  }

  return body;
}

module.exports = {
  CEDDS,
  ceddsdl,
};

/**
 * Run from the terminal with:
 * node index.js "<Pinterest URL>"
 */
if (require.main === module) {
  const pinterestUrl = process.argv[2];

  if (!pinterestUrl) {
    console.error("Usage: node index.js <Pinterest URL>");
    process.exitCode = 1;
  } else {
    ceddsdl(pinterestUrl)
      .then((data) => {
        console.log(
          typeof data === "string" ? data : JSON.stringify(data, null, 2),
        );
      })
      .catch((error) => {
        console.error(`Error: ${error.message}`);
        process.exitCode = 1;
      });
  }
}
