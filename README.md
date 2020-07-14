# Bookshelf
![CI DEPLOY](https://github.com/lexcast/bookshelf/workflows/CI%20DEPLOY/badge.svg?branch=personal)
![CI UPDATE PERSONAL](https://github.com/lexcast/bookshelf/workflows/CI%20UPDATE%20PERSONAL/badge.svg)

Show your virtual book collection.

See in action [here](https://lexcast.github.io/bookshelf/).

![example](https://user-images.githubusercontent.com/10590799/82294403-b5e20a00-9973-11ea-9664-9f58fc9d1b55.png)

Based on [this article](https://tympanus.net/codrops/2013/01/08/3d-book-showcase/) by [@crnacura](https://github.com/crnacura).

## Install

Just clone it or download the repository, and run `yarn install`.

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
    "pages": "254",
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

This project is a Create React App, and it has all of its scripts, plus two to run tailwindcss (generates the styles):

### `yarn start:tw`

Runs tailwindcss in the development mode.

### `yarn build:tw`

Runs tailwindcss in the production mode.<br />
