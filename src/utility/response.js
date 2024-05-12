export function send_formatted_response(res, message, data, status) {
  let response_message = {};
  response_message["message"] = message;
  if (data) response_message["data"] = data;

  res.status(status).json(response_message);
}

export function send_error_response(res, message, status) {
  let response_message = {};
  response_message["message"] = message;
  res.status(status).json(response_message);
}
