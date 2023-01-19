const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');

const { sales, sale } = require('../mocks/sales.mock');

describe('Testes de unidade da camada Service de sales', function () {
  describe('Recuperando a lista com todos os sales', function () {
    it('retorna a lista completa de todas as vendas', async function () {
      // arrange
      sinon.stub(salesModel, 'listSales').resolves(sales);
      // act
      const result = await salesService.listSales();
      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(sales);
    });
  });

  describe('Recuperando um produto através do seu id', function () {
    it('retorna o product caso encontre o ID', async function () {
      // arrange
      sinon.stub(salesModel, 'listSaleById').resolves(sale)
      // act
      const result = await salesService.listSaleById(1);
      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(sale);
    });

    it('retorna um erro caso o sale não exista', async function () {
      // act
      const result = await salesService.listSaleById(9999999999999);
      // assert
      expect(result.type).to.equal('SALE_NOT_FOUND');
      expect(result.message).to.equal('Sale not found');
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});