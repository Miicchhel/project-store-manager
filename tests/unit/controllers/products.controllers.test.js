const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { products } = require('../mocks/products.mock');

describe('Teste de unidade da camada Controller de products', function () {
  describe('Recuperando a lista com todos os produtos', function () {
    it('deve retornar o status 200 e a lista', async function () {
      // arrange
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
  
      sinon.stub(productsService, 'listProducts').resolves({ type: null, message: products });
      // act
      await productsController.listProducts(req, res);
      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledOnceWith(products);
    });
  });

  describe('Recuperando um produto através do seu id', function () {
    it('deve respoder com 200 e os dados do banco quando existir', async function () {
      // arrange
      const res = {};
      const req = { params: { id: 1 } };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'listProductById').resolves({ type: null, message: products[0]})
      // act
      await productsController.listProductById(req, res);
      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products[0]);
    });

    it('deve retornar um erro ao passar um id que não existe no banco', async function () {
      // arrange
      const res = {};
      const req = { params: { id: 999 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'listProductById').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      // act
      await productsController.listProductById(req, res);
      // assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});