from flask import Blueprint, request
from app.models import db, Product, Review
from app.forms import ProductForm, ReviewForm
from flask_login import login_required, current_user
from app.api.aws_routes import (upload_file_to_s3, get_unique_filename, remove_file_from_s3)

product_routes = Blueprint('products', __name__)

@product_routes.route('/')
def products():
    all_products = Product.query.all()
    return {'products': [product.to_dict() for product in all_products]}

@product_routes.route('/<int:id>')
def product_detail(id):
    product = Product.query.get(id)
    return product.to_dict()

@product_routes.route('/category/<cate>')
def product_category(cate):
    product_categories = Product.query.filter_by(category=cate).all()
    return {'product_categories': [category.to_dict() for category in product_categories]}

@product_routes.route('/manage')
@login_required
def manage_products():
    user_products = Product.query.filter_by(seller_id=current_user.id).all()
    return {'user_products': [product.to_dict() for product in user_products]}

@product_routes.route('/new', methods=['POST'])
@login_required
def product_form():
    form = ProductForm()
    # giving the form a csrf token so we can make changes to the data on the server
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        image = form.data['image']
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        print(upload)

        if 'url' not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when you tried to upload
        # so you send back that error message (and you printed it above)
            return {'errors': {'message': 'error with upload'}}, 401

        url = upload['url']

        product = Product(
            seller_id = current_user.id,
            name = form.data['name'],
            price = form.data['price'],
            description = form.data['description'],
            category = form.data['category'],
            image = url
        )

        # productImage = ProductImage(
        #     product_id=product.id,
        #     image=form.data['image']
        # )

        db.session.add(product)
        db.session.commit()
        return product.to_dict()
    return form.errors, 401

@product_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def product_update(id):
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        product = Product.query.get(id)
        image = form.data['image']

        if image is not None:
            remove_file_from_s3(product.image)
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            print(upload)

            if 'url' not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when you tried to upload
            # so you send back that error message (and you printed it above)
                return {'errors': {'message': 'error with upload'}}, 401

            url = upload['url']
            product.image = url

        product.seller_id = current_user.id
        product.name = form.data['name']
        product.price = form.data['price']
        product.description = form.data['description']
        product.category = form.data['category']

        db.session.commit()
        return product.to_dict()
    return form.errors, 401

@product_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_product(id):
    product = Product.query.get(id)
    remove_file_from_s3(product.image)
    db.session.delete(product)
    db.session.commit()
    return 'Successfully Deleted'


@product_routes.route('/<int:id>/reviews')
def product_reviews(id):
    reviews = Review.query.filter(Review.product_id == id).all()
    return {'reviews': [review.to_dict() for review in reviews]}

@product_routes.route('/<int:id>/reviews', methods=['POST'])
@login_required
def create_review(id):
    product = Product.query.get(id)
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review(
            product_id = product.id,
            creator_id = current_user.id,
            review = form.data['review'],
            stars = form.data['stars']
        )
        db.session.add(review)
        db.session.commit()
        return review.to_dict()
    return form.errors, 401

@product_routes.route('/<int:id>/reviews/<int:reviewId>', methods=['PUT'])
@login_required
def edit_review(id, reviewId):
    product = Product.query.get(id)
    review = Review.query.get(reviewId)
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review.product_id = product.id
        review.creator_id = current_user.id
        review.review = form.data['review']
        review.stars = form.data['stars']

        db.session.commit()
        return review.to_dict()
    return form.errors, 401

@product_routes.route('/<int:id>/reviews/<int:reviewId>', methods=['DELETE'])
@login_required
def delete_review(id, reviewId):
    product = Product.query.get(id)
    review = Review.query.get(reviewId)
    db.session.delete(review)
    db.session.commit()
    return 'Successfully Deleted'


# @product_routes.route('/images')
# def images():
#     all_images = ProductImage.query.all()
#     return {'images': [image.to_dict() for image in all_images]}

# @product_routes.route('/<int:id>/image')
# def product_images(id):
#     product_image = ProductImage.query.filter_by(product_id=id).all()
#     return {'product_images': [image.to_dict() for image in product_image]}

# @product_routes.route('/images/new', methods=['POST'])
# @login_required
# def upload_image():
#     form = ProductImageForm()
#     if form.validate_on_submit():
#         image = form.data["image"]
#         image.filename = get_unique_filename(image.filename)
#         upload = upload_file_to_s3(image)
#         print(upload)
#         url = upload['url']
#         new_image = ProductImage(
#             image=url)
#         db.session.add(new_image)
#         db.session.commit()
#         return new_image.to_dict()
#     return form.errors, 401
