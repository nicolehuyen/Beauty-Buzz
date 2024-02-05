from flask import Blueprint, request
from app.models import db, Review
from app.forms import ReviewForm
from flask_login import login_required, current_user

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/')
def reviews():
    all_reviews = Review.query.all()
    return {'reviews': [review.to_dict() for review in all_reviews]}

# @review_routes.route('/<int:productId>')
# def product_reviews(productId):
#     reviews = Review.query.filter_by(product_id = productId).all()
#     return {'reviews': [review.to_dict() for review in reviews]}

# @review_routes.route('/<int:productId>/new', methods=['POST'])
# @login_required
# def create_review(productId):
#     form = ReviewForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         review = Review(
#             product_id = productId,
#             creator_id = current_user.id,
#             review = form.data['review'],
#             stars = form.data['stars']
#         )
#         db.session.add(review)
#         db.session.commit()
#         return review.to_dict()
#     return form.errors, 401

# @review_routes.route('/<int:productId>/edit', methods=['PUT'])
# @login_required
# def edit_review(productId):
#     form = ReviewForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         review = Review.query.get(productId)
#         review.product_id = productId
#         review.creator_id = current_user.id
#         review.review = form.data['review']
#         review.stars = form.data['stars']
#         db.session.commit()
#         return review.to_dict()
#     return form.errors, 401

# @review_routes.route('/<int:productId>', methods=['DELETE'])
# @login_required
# def delete_review(productId):
#     review = Review.query.get(productId)
#     db.session.delete(review)
#     db.session.commit()
#     return 'Successfully Deleted'
