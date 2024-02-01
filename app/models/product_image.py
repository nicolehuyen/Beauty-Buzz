from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class ProductImage(db.Model):
    __tablename__ = 'product_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    image = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    product = db.relationship('Product', back_populates='image')

    def to_dict(self):
        return {
            'id': self.id,
            'product_id': self.product_id,
            'image': self.image
        }
