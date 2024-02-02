from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, TextAreaField, SelectField, SubmitField
from wtforms.validators import DataRequired, Length, NumberRange
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws_routes import ALLOWED_EXTENSIONS

class ProductForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(max=140)])
    price = DecimalField('Price', validators=[DataRequired(), NumberRange(min=1, max=999)])
    description = TextAreaField('Description', validators=[DataRequired()])
    category = SelectField('Category', validators=[DataRequired()], choices=[('face', 'Face'), ('eyes', 'Eyes'), ('lips', 'Lips'), ('cheeks', 'Cheeks'), ('brushes&tools', 'Brushes & Tools')])
    image = FileField('Image File', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField('Submit')
