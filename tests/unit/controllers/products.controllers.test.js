const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { products, newProduct } = require('../mocks/products.mock');

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

  describe('Adicionando um novo produto', function () {
    it('ao enviar dados válidos deve salvar com sucesso!', async function () {
      // arrange
      const res = {};
      const req = { body: newProduct.name };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'addProduct').resolves({ type: null, message: newProduct });
      // act
      await productsController.addProduct(req, res);
      // assert
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newProduct);
    });

    it('ao enviar dados inválidos deve retornar um erro', async function () {
      // arrange
      const res = {};
      const req = { body: { name:'' }};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'addProduct').resolves({ message: '"name" is required' });
      // act
      await productsController.addProduct(req, res);
      // assert
      // expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith('"name" is required');
    });

    it('ao enviar um nome com menos de 5 caracteres deve retornar um erro!', async function () {
      // arrange
      const res = {};
      const req = { body: { name: '' } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'addProduct').resolves({ type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' });
      // act
      await productsController.addProduct(req, res);
      // assert
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});