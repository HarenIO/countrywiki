**Group Assignment, Backend 1 @ Nackademin**


* **Add**: POST
  ```
  Endpoint: http://localhost:5050/admin/add
  {
    "key": "secretkey",
    "country": "india",
    "population": "1408000000",
    "capital": "New Delhi",
    "language": "Hindi"
  }
  ```

* **Edit**: PUT
  ```
  Endpoint: http://localhost:5050/admin/edit
  {
    "key": "secretkey",
    "country": "india",
    "population": "1408000000",
    "capital": "New Delhi",
    "language": "English"
  }
  ```

* **Delete**: DELETE
  *  `http://localhost:5050/admin/delete?key=secretkey&country=india`