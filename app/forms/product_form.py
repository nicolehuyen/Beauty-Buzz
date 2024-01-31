from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, TextAreaField, SelectField, SubmitField
from wtforms.validators import DataRequired, Length, NumberRange

class ProductForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(max=140)])
    price = DecimalField('Price', validators=[DataRequired(), NumberRange(min=1, max=999)])
    description = TextAreaField('Description', validators=[DataRequired()])
    category = SelectField('Category', validators=[DataRequired()], choices=['Face', 'Eyes', 'Lips', 'Cheeks', 'Brushes & Tools', 'Bags & Organizers'])
    submit = SubmitField('Submit')
