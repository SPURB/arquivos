import { Schema, model } from 'mongoose'

const { String, ObjectId, Object, Date } = Schema.Types

const arquivosSchema = Schema({
  _id: ObjectId,
  file: {
    type: Object,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  updatedAt: Date,
  metadados: Object
})

module.exports = model('Arquivo', arquivosSchema)
