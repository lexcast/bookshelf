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

Books live in `src/data/books.json`, as an array with each book in the following format:

```js
[
  {
    "isbn": "8478884459", // has to be a isbn 10
    "title": "Harry Potter y la piedra filosofal",
    "collection": 1, // optional
    "authors": ["jk-rowling"], // ids from `src/data/authors.json`
    "year": 1997, // year of the original publication, not of this edition
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

## Add Author

Authors live in `src/data/authors.json`, keyed by an id that books reference:

```js
{
  "jk-rowling": {
    "name": "J.K. Rowling",
    "born": "1965-07-31", // optional, YYYY-MM-DD or just YYYY
    // "died": "YYYY-MM-DD", optional, leave it out for living authors
    "country": "GB" // optional, ISO 3166 code
  }
}
```

The photo is taken from `public/images/authors/<id>.jpg`, and it is skipped if that file doesn't exist.

## Available Scripts

- `npm run dev`: start the development server
- `npm run build`: build for production into `dist/`
- `npm run preview`: serve the production build locally
- `npm run lint`: run ESLint
