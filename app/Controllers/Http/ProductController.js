'use strict'

const Product = use("App/Models/Product");

class ProductController {
  
  async index ({ request, response, view }) {
    const products = await Product.all();

    return products;
  }

  async create ({ request, response, view }) {
    const data = request.only
    ([
      'title',
      'category',
      'used_product',
      'colors',
      'quantity',
      'features',
      'price',
      'store_id',
      'featured_product',
      'description'
    ]);

    const product = Product.create(data);

    return product;
  }

  async store ({ request, response }) {
  }

  async show ({ params, request, response, view }) {
    const product = await Product.findOrFail(params.id);

    await product.load('images');

    return product;
  }

 
  async update ({ params, request, response }) {
    const product = await Product.findOrFail(params.id);

    const data = request.only([
      'title',
      'category',
      'used_product',
      'colors',
      'quatity',
      'features',
      'price',
      'store_id',
      'featured_product',
      'description'
    ]);

    product.merge(data);

    await product.save();

    return product;
  }

  
  async destroy ({ params, request, response }) {
    const product = await Product.findOrFail(params.id);

    await product.delete();
  }
}

module.exports = ProductController
