from flask import Blueprint
from app.models import db, Product, ProductImage
from app.forms import ProductForm, ProductImageForm

product_routes = Blueprint('products', __name__)

@product_routes.route('/')
def products():
    all_products = Product.query.all()
    return {'products': [product.to_dict() for product in all_products]}

@product_routes.route('/images')
def images():
    all_images = ProductImage.query.all()
    return {'images': [image.to_dict() for image in all_images]}
