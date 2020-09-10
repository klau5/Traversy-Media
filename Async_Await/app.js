const http = new EasyHTTP();

let url = "https://jsonplaceholder.typicode.com/users";

// Get Users
http
  .get(url)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

// Create User
http
  .post(url, data)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

// Update Post
http
  .put(url, data)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

// Delete User
http
  .delete(url)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
