const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')

const offerSchema = mongoose.Schema({
  originatingUserId: String,
  targetUserId: String,
  originatingBookIds: [String],
  targetBookIds: [String],
  offerDate: { type: Date, default: Date.now },
  cancelled: { type: Boolean, default: false },
  rejected: { type: Boolean, default: false },
  accepted: { type: Boolean, default: false },
})

offerSchema.plugin(AutoIncrement, { inc_field: 'offerId' })

// need to use "this" so can't use arrow function definition
// eslint-disable-next-line func-names, prefer-arrow-callback
offerSchema.methods.toJson = function () {
  return {
    offerId: this.offerId,
    originatingUserId: this.originatingUserId,
    targetUserId: this.targetUserId,
    originatingBookIds: [...this.originatingBookIds],
    targetBookIds: [...this.targetBookIds],
    offerDate: this.offerDate,
    cancelled: this.cancelled,
    rejected: this.rejected,
    accepted: this.accepted,
  }
}

module.exports = mongoose.model('Offer', offerSchema)
