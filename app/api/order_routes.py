from flask import Blueprint, request
from app.models import db, Order, OrderItem
from app.forms import OrderItemForm
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

@order_routes.route('/<int:orderId>/items')
@login_required
def order_items(orderId):
    items = OrderItem.query.filter(OrderItem.order_id == orderId).all()
    return {'items': [item.to_dict() for item in items]}
