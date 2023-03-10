const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { products, newProduct } = require('../mocks/products.mock');

describe('Testes de unidade da camada Model de products', function () {
  it('Recuperando a lista com todos os produtos', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([products]);
    // act
    const result = await productsModel.listProducts();
    // assert
    expect(result).to.be.deep.equal(products);
  });

  it('Recuperando um produto através do seu id', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([[products[0]]]);
    // act
    const result = await productsModel.listProductById(1)
    // assert
    expect(result).to.be.deep.equal(products[0]);
  });

  it('Adicionando um novo product', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);
    // act
    const result = await productsModel.addProduct(newProduct);
    // assert
    expect(result).to.be.equal(42);
  });
  
  afterEach(function () {
    sinon.restore();
  });
});