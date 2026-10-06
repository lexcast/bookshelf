# Bookshelf
![CI DEPLOY](https://github.com/lexcast/bookshelf/workflows/CI%20DEPLOY/badge.svg?branch=personal)
![CI UPDATE PERSONAL](https://github.com/lexcast/bookshelf/workflows/CI%20UPDATE%20PERSONAL/badge.svg)

Show your virtual book collection.

See in action [here](https://lexcast.github.io/bookshelf/).

![example](https://user-images.githubusercontent.com/10590799/82294403-b5e20a00-9973-11ea-9664-9f58fc9d1b55.png)

Based on [this article](https://tympanus.net/codrops/2013/01/08/3d-book-showcase/) by [@crnacura](https://github.com/crnacura).

## Install

Just clone it or download the repository, and run `npm install`.

The `master` branch only has a sample book. Keep your own collection (data and images) in a separate branch, like `personal`, which is the one that gets deployed.

## Add Book

To add a book you need to specify it in `src/data/index.json`.
This file has an array with each book in the following format:

```js
[
  {
    "isbn": "8478884459", // has to be a isbn 10
    "title": "Harry Potter y la piedra filosofal",
    "collection": 1, // optional
    "author": "J.K. Rowling",
    "author_photo": "rowling.jpg", // you need to add this file in `public/images/author`
    "publisher": "Salamandra",
    "cover": "8478884459.jpg", // you need to add this file in `public/images/covers`
    "pages": 254, // also sets the spine thickness
    "w": 306, // width
    "h": 500, // height
    "bg": "#faf599", // background color
    "text": "#000", // text color
    "excerpt": "Harry debes saber que eres un mago.",
    "sinopsis": "Harry Potter se ha quedado huérfano y vive en casa de sus abominables tíos y del insoportable primo Dudley."
  }
]
```

## Available Scripts

- `npm run dev`: start the development server
- `npm run build`: build for production into `dist/`
- `npm run preview`: serve the production build locally
- `npm run lint`: run ESLint
