from flask_wtf import FlaskForm
from wtforms import IntegerField, SubmitField
from wtforms.validators import DataRequired, NumberRange

class ShoppingBagForm(FlaskForm):
    buyer_id = IntegerField('Buyer Id')
    product_id = IntegerField('Product Id')
    quantity = IntegerField('Quantity', validators=[DataRequired(), NumberRange(min=1)])
    submit = SubmitField('Submit')
