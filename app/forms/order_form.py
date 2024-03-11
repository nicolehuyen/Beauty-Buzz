from flask_wtf import FlaskForm
from wtforms import IntegerField, SubmitField, StringField

class OrderForm(FlaskForm):
    buyer_id = IntegerField('Buyer Id')
    status = StringField('Status')
    submit = SubmitField('Submit')
