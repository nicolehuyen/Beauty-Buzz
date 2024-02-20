from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Length

class ReviewForm(FlaskForm):
    product_id = IntegerField('Product Id')
    creator_id = IntegerField('Creator Id')
    review = TextAreaField('Review', validators=[DataRequired(), Length(min=10, max=340)])
    stars = IntegerField('Stars', validators=[DataRequired()])
    submit = SubmitField('Submit')
