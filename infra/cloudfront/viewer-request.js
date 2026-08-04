function handler(event) {
  var request = event.request;

  if (request.uri === "/") {
    return {
      statusCode: 302,
      statusDescription: "Found",
      headers: {
        location: { value: "/es" + queryString(request.querystring) },
        "cache-control": { value: "public,max-age=300" },
      },
    };
  }

  if (request.uri.endsWith("/")) {
    return {
      statusCode: 301,
      statusDescription: "Moved Permanently",
      headers: {
        location: {
          value: request.uri.slice(0, -1) + queryString(request.querystring),
        },
      },
    };
  }

  var finalSegment = request.uri.substring(request.uri.lastIndexOf("/") + 1);
  if (finalSegment.indexOf(".") === -1) {
    request.uri += "/index.html";
  }

  return request;
}

function queryString(query) {
  var keys = Object.keys(query || {});
  if (!keys.length) return "";

  var values = [];
  for (var index = 0; index < keys.length; index += 1) {
    var key = keys[index];
    var entry = query[key];
    if (entry.multiValue && entry.multiValue.length) {
      for (var valueIndex = 0; valueIndex < entry.multiValue.length; valueIndex += 1) {
        values.push(encodeURIComponent(key) + "=" + encodeURIComponent(entry.multiValue[valueIndex].value));
      }
    } else {
      values.push(encodeURIComponent(key) + "=" + encodeURIComponent(entry.value || ""));
    }
  }

  return "?" + values.join("&");
}
