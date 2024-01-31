from flask import Blueprint, request
from app.models import db, Product, ProductImage
from app.forms import ProductForm, ProductImageForm

product_routes = Blueprint('products', __name__)

@product_routes.route('/')
def products():
    all_products = Product.query.all()
    return {'products': [product.to_dict() for product in all_products]}

@product_routes.route('/<int:id>')
def productDetail(id):
    product = Product.query.get(id)
    return product.to_dict()

@product_routes.route('/images')
def images():
    all_images = ProductImage.query.all()
    return {'images': [image.to_dict() for image in all_images]}

@product_routes.route('/new', methods=['POST'])
def product_form():
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        product = Product(
            seller_id=form.data['seller_id'],
            name=form.data['name'],
            price=form.data['price'],
            description=form.data['description'],
            category=form.data['category']
        )
        db.session.add(product)
        db.session.commit()
        return product.to_dict()
    return form.errors, 401
