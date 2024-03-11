from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, timedelta

class Order(db.Model):
    __tablename__ = 'orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    buyer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    status = db.Column(db.String, default='Payment Complete')
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    buyer = db.relationship('User', back_populates='orders')
    order_items = db.relationship('OrderItem', back_populates='order', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'buyer_id': self.buyer_id,
            'status': self.status,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

    def update_order_status():
        orders = Order.query.filter_by(status='Payment Complete').all()
        for order in orders:
            if (datetime.now() - order.created_at) >= timedelta(minutes=10):
                order.status = 'Shipped'
                db.session.commit()
            elif (datetime.now() - order.created_at) >= timedelta(minutes=20):
                order.status = 'Delivered'
                db.session.commit()
