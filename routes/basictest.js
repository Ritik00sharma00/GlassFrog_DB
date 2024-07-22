'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/basic', async function (request, reply) {
    return { message :  'wbskhgs v'}
  })
}
