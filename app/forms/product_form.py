from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, DecimalField, TextAreaField, SelectField, SubmitField
from wtforms.validators import DataRequired, Length, NumberRange
from flask_wtf.file import FileField, FileAllowed
from app.api.aws_routes import ALLOWED_EXTENSIONS

class ProductForm(FlaskForm):
    seller_id = IntegerField('Seller Id')
    name = StringField('Name', validators=[DataRequired(), Length(max=75)])
    price = DecimalField('Price', validators=[DataRequired(), NumberRange(min=1, max=999)])
    description = TextAreaField('Description', validators=[DataRequired(), Length(min=30, max=1000)])
    category = SelectField('Category', validators=[DataRequired()], choices=[('face', 'Face'), ('eyes', 'Eyes'), ('lips', 'Lips'), ('cheeks', 'Cheeks'), ('brushes&tools', 'Brushes & Tools')])
    image = FileField('Image File', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField('Submit')
