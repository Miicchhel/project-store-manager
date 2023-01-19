const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { sales, sale } = require('../mocks/sales.mock');

describe('Teste de unidade da camada Controller de sales', function () {
  describe('Recuperando a lista com todos os sales', function () {
    it('deve retornar o status 200 e a lista', async function () {
      // arrange
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'listSales').resolves({ type: null, message: sales });
      // act
      await salesController.listSales(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledOnceWith(sales);
    });
  });

  describe('Recuperando um sale através do seu id', function () {
    it('deve respoder com 200 e os dados do banco quando existir', async function () {
      // arrange
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'listSaleById').resolves({ type: null, message: sale });
      // act
      await salesController.listSaleById(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledOnceWith(sale);
    });

    it('deve retornar um erro ao passar um id que não existe no banco', async function () {
      // arrange
      const res = {};
      const req = { params: { id: 999 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'listSaleById').resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });
      // act
      await salesController.listSaleById(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledOnceWith({message: 'Sale not found'});
    });
  });


  afterEach(function () {
    sinon.restore();
  });
});