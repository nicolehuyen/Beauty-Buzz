from flask_wtf import FlaskForm
from wtforms import IntegerField, SubmitField

class OrderForm(FlaskForm):
    buyer_id = IntegerField('Buyer Id')
    submit = SubmitField('Submit')
