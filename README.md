# B-S-project-2021-ZJU

My course project for B/S Software Design @ZJU: an image annation website for machine learning collaborative tasks

# Demo

## Main Interface
![image](https://user-images.githubusercontent.com/60731287/204546025-eaa7769f-7e86-4764-ba3e-7ba63dd485b6.png)

## Upload & Convert
![image](https://user-images.githubusercontent.com/60731287/204546103-cb7c675b-98f9-47f1-8510-4c4dedae602a.png)

## Label Page
![image](https://user-images.githubusercontent.com/60731287/204546238-d6c2be28-515b-4a89-a94a-d5eb0c8d3cd1.png)


# How to run

`npm run dev` for frontend.

`node ./src/backend/index.js` for backend.

Modify the "password" below for your database:

```js
const db = mysql.createConnection({
  user: "root",
  host: "127.0.0.1",
  password: "", //depend on your implement
  database: "bs_project_login"
});
```

# Unfixed bugs

1. (Fixed)Preview after upload: needs reconstruction

## Comment:

Reference to this page. https://stackoverflow.com/questions/65176026/uploading-image-from-react-frontend-to-express-backend-and-displaying-it-back-in
Noticed my backend does not have static folder specified. `app.use(express.static("./public"));` But I still don't know how exactly it works; maybe this line tells the backend to watch for changes in the local `public` folder?

## Description:

The `public` folder is copied and taken to the backend at compile time, so in runtime though the `urls` would be updated, the contents in the `public` folder would't. Solutions to dynamic file adding have been unsuccessful.
