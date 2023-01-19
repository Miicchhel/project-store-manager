const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { sale, sales } = require('../mocks/sales.mock');

describe('Testes de unidade da camada Model de sales', function () {
  it('Recuperando a lista com todos os sales', async function () {
    // arrange 
    sinon.stub(connection, 'execute').resolves([sales]);
    // act
    const result = await salesModel.listSales();
    // assert
    expect(result).to.be.deep.equal(sales);
  });

  it('Recuperando uma venda através do seu id', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([sale]);
    // act
    const result = await salesModel.listSaleById(1)
    // assert
    expect(result).to.be.deep.equal(sale);
  });

  afterEach(function () {
    sinon.restore();
  });
});