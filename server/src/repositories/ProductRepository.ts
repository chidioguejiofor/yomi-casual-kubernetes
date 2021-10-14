import * as AWS from "aws-sdk";
import { IProductCategoryRequest, IProductRequest } from "requestTypes";
import db from "database/models";
import { uuidGenerator } from "services/cache/Cache";

const bucketName = process.env.ATTACHMENT_S3_BUCKET;
const SIGNED_URL_EXPIRATION = +process.env.SIGNED_URL_EXPIRATION;
const AWS_ID = process.env.AWS_ID;
const AWS_SECRET = process.env.AWS_SECRET;

const Product = db.Product;
const ProductCategory = db.ProductCategory;

class ProductRepository {
  private s3: AWS.S3;
  constructor() {
    this.s3 = new AWS.S3({
      signatureVersion: "v4",
      accessKeyId: AWS_ID,
      secretAccessKey: AWS_SECRET,
    });
  }

  async createProductCategory(category: IProductCategoryRequest) {
    console.log(category);
    const newCategory = await ProductCategory.create({
      ...category,
      slug: category.slug || category.title?.toLowerCase(),
    });
    return newCategory;
  }

  async retriveManyProductCategories(where = {}) {
    const categories = await ProductCategory.findAll({ where });
    return categories;
  }

  async getProductCategory(where = {}) {
    const categories = await ProductCategory.findOne({ where });
    return categories;
  }

  async createProduct(product: IProductRequest) {
    const defaultSlug = product.name
      ?.toString()
      .toLowerCase()
      .replace(/ /g, "-");

    const id = uuidGenerator();
    const defaultImageURL = `https://${bucketName}.s3.amazonaws.com/${id}`;
    let imageUrl = product.imageUrl;

    let uploadURL;

    if (!imageUrl) {
      imageUrl = defaultImageURL;
      uploadURL = await this.generatePresignedURL(id);
    }

    const newProduct = await Product.create({
      id,
      ...product,
      slug: product.slug || defaultSlug,
      imageUrl,
    });
    return { ...newProduct.dataValues, uploadURL };
  }

  async retrieveProducts(where = {}) {
    const products = await Product.findAll({ where });

    return products;
  }
  private async generatePresignedURL(productId) {
    const result = await this.s3.getSignedUrl("putObject", {
      Bucket: bucketName,
      Key: productId,
      Expires: SIGNED_URL_EXPIRATION,
    });

    return result;
  }
}

export const productRepository = new ProductRepository();
export type ProductRepoType = typeof productRepository;
