// utils/response.js
export const handleNotFound = (res, resource = "Resource") =>
    res.status(404).json({ success: false, message: `${resource} not found` });
  
  export const handleServerError = (res, error, message = "Internal Server Error") => {
    console.error(error);
    return res.status(500).json({ success: false, message });
  };