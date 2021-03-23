
'use strict'

const mutations = require('./mutations.js')
const queries = require('./queries.js')
const types = require ('./types')

module.exports = {
   Query: queries,
   Mutation: mutations,
   ...types
}