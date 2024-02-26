from flask import Blueprint, request
from app.models import db, Order, OrderItem
from app.forms import OrderItemForm, OrderForm
from flask_login import login_required, current_user

order_routes = Blueprint('orders', __name__)

# @order_routes.route('/')
# def orders():
#     all_orders = Order.query.all()
#     return {'orders': [order.to_dict() for order in all_orders]}

@order_routes.route('/')
@login_required
def orders():
    user_orders = Order.query.filter_by(buyer_id=current_user.id).all()
    return {'user_orders': [order.to_dict() for order in user_orders]}

@order_routes.route('/<int:orderId>')
@login_required
def order(orderId):
    single_order = Order.query.get(orderId)
    return single_order.to_dict()

@order_routes.route('/new', methods=['POST'])
@login_required
def create_order():
    form = OrderForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        order = Order(
            buyer_id = current_user.id
        )
        db.session.add(order)
        db.session.commit()
        return order.to_dict()
    return form.errors, 401

@order_routes.route('/<int:orderId>', methods=['DELETE'])
@login_required
def delete_order(orderId):
    order = Order.query.get(orderId)
    db.session.delete(order)
    db.session.commit()
    return 'Successfully Deleted'


@order_routes.route('/<int:orderId>/items')
@login_required
def order_items(orderId):
    items = OrderItem.query.filter(OrderItem.order_id == orderId).all()
    return {'items': [item.to_dict() for item in items]}

@order_routes.route('/<int:orderId>/items', methods=['POST'])
@login_required
def create_order_item(orderId):
    order = Order.query.get(orderId)
    form = OrderItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        order_item = OrderItem(
            order_id = order.id,
            product_id = form.data['product_id'],
            quantity = form.data['quantity']
        )
        db.session.add(order_item)
        db.session.commit()
        return order_item.to_dict()
    return form.errors, 401

@order_routes.route('/<int:orderId>/items/<int:itemId>', methods=['DELETE'])
@login_required
def delete_order_item(orderId, itemId):
    order = Order.query.get(orderId)
    order_item = OrderItem.query.get(itemId)
    db.session.delete(order_item)
    db.session.commit()
    return 'Successfully Deleted'
