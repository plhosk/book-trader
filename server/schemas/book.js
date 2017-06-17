const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')

const bookSchema = mongoose.Schema({
  title: String,
  authors: [String],
  publishedDate: String,
  thumbnail: String,
  ownerId: String,
  creationDate: { type: Date, default: Date.now },
  deleted: { type: Boolean, default: false },
})

bookSchema.plugin(AutoIncrement, { inc_field: 'bookId' })

// return object with all book fields
// need to use "this" so can't use arrow function definition
// eslint-disable-next-line func-names, prefer-arrow-callback
bookSchema.methods.toJson = function () {
  return {
    bookId: this.bookId,
    title: this.title,
    authors: [...this.authors],
    publishedDate: this.publishedDate,
    thumbnail: this.thumbnail,
    ownerId: String, // Exclude sending ownerId
    creationDate: this.creationDate,
    deleted: this.deleted,
  }
}

module.exports = mongoose.model('Book', bookSchema)
