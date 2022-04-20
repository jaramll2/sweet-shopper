const {expect} = require('chai');
const { db, models: { LineItem, Candy } } = require('../index');

describe('LineItem model', () => {
  it('Virtual Field works', async () => {
    const candy = await Candy.create({name: 'testCandy', price: .1, weight: '2'})
    const li = await LineItem.create({qty: 5, candyId: candy.id})

    
  })
})