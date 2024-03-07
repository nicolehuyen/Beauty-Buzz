from flask import Blueprint, request
from app.models import db, ShoppingBag, Product
from app.forms import ShoppingBagForm
from flask_login import login_required, current_user

shopping_bag_routes = Blueprint('bag', __name__)

@shopping_bag_routes.route('/')
@login_required
def bag():
    bag_items = ShoppingBag.query.filter_by(buyer_id=current_user.id).all()
    return {'bag_items': [item.to_dict() for item in bag_items]}

@shopping_bag_routes.route('/new', methods=['POST'])
@login_required
def add_to_bag():
    form = ShoppingBagForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        bag = ShoppingBag(
            buyer_id = current_user.id,
            product_id = form.data['product_id'],
            quantity = form.data['quantity']
        )
        db.session.add(bag)
        db.session.commit()
        return bag.to_dict()
    return form.errors, 401

@shopping_bag_routes.route('/<int:itemId>/<int:productId>', methods=['DELETE'])
@login_required
def delete_from_bag(itemId, productId):
    product = Product.query.get(productId)
    bag_item = ShoppingBag.query.get(itemId)
    db.session.delete(bag_item)
    db.session.commit()
    return 'Successfully Deleted'
