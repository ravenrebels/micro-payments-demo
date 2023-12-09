import session from "express-session";
import FileStore from "session-file-store";

export function setupSession(app) {
  // Define the file store options
  const fileStoreOptions = {
    path: "./sessions", // Directory where session files will be stored
  };

  // Create an instance of the file store
  const fileStore = FileStore(session);

  // Configure express-session middleware with the file store
  app.use(
    session({
      // The secret used to sign the session ID cookie. Replace "your-secret-key" with a real secret string.
      secret: "your-secret-key",

      // Determines whether the session data is saved back to the session store, even if the session was never modified during the request.
      // Setting this to false can reduce server load and the number of session store operations.
      resave: false,

      // Forces a session that is "uninitialized" to be saved to the store. An uninitialized session is a new session that has not been modified.
      // Setting this to true ensures that a session is saved even if it hasn't been modified.
      saveUninitialized: true,

      // Configuration options for the session cookie.
      // Setting secure to false allows the cookie to be set over HTTP, not just HTTPS.
      // In production, you should consider setting this to true and using HTTPS.
      cookie: { secure: false },

      // The session store instance. Here, a file-based session store is used.
      // You can replace this with a different store like Redis, MongoDB, etc.
      // The fileStoreOptions variable should contain any configuration needed for the file store.
      store: new fileStore(fileStoreOptions),
    })
  );
}
