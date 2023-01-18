const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');

const { products, newProduct } = require('../mocks/products.mock');

describe('Testes de unidade da camada Service de products', function () {
  describe('Recuperando a lista com todos os produtos', function () {
    it('retorna a lista completa de produtos', async function () {
      // arrange
      sinon.stub(productsModel, 'listProducts').resolves(products);
      // act
      const result = await productsService.listProducts();
      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(products);
    });
  });

  describe('Recuperando um produto através do seu id', function () { 
    it('retorna o product caso encontre o ID', async function () {
      // arrange
      sinon.stub(productsModel, 'listProductById').resolves(products[0])
      // act
      const result = await productsService.listProductById(1);
      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(products[0]);
    });

    it('retorna um erro caso o produto não exista', async function () {
      // act
      const result = await productsService.listProductById(999);
      // assert
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });

    it('retorna um erro caso receba um ID inválido', async function () {
      // act
      const result = await productsService.listProductById('a');
      // assert
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });
  });

  describe('Adicionando product com valores válidos', function () {
    it('retorna o ID do product adicionado', async function () {
      // arrange
      sinon.stub(productsModel, 'addProduct').resolves(4)
      sinon.stub(productsModel, 'listProductById').resolves(newProduct);
      // act
      const result = await productsService.addProduct(newProduct.name);
      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(newProduct);
    });
  });

  describe('Adicionando product com valores inválidos', function () {
    it('retorna um erro ao passar um nome inválido', async function () {
      // act
      const result = await productsService.addProduct('');
      // assert 
      expect(result.type).to.be.equal('INVALID_VALUE');
      expect(result.message).to.be.equal('"name" length must be at least 5 characters long');
    });
  });
  
  afterEach(function () {
    sinon.restore();
  });
});