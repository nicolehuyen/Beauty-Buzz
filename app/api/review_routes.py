from flask import Blueprint
from app.models import db, Review
from app.forms import ReviewForm

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/')
def reviews():
    all_reviews = Review.query.all()
    return {'reviews': [review.to_dict() for review in all_reviews]}
