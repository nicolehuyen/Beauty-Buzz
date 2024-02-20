from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    seller_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(140), nullable=False)
    price = db.Column(db.Numeric(10,2), nullable=False)
    description = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(40), nullable=False)
    image = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    seller = db.relationship('User', back_populates='products')
    review = db.relationship('Review', back_populates='product', cascade='all, delete-orphan')
    order_item = db.relationship('OrderItem', back_populates='product', cascade='all, delete-orphan')
    favorite = db.relationship('Favorite', back_populates='product', cascade='all, delete-orphan')
    # image = db.relationship('ProductImage', back_populates='product', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'seller_id': self.seller_id,
            'name': self.name,
            'price': self.price,
            'description': self.description,
            'category': self.category,
            'image': self.image,
            'reviews': [review.stars for review in self.review],
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
