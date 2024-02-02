from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField, SubmitField
from wtforms.validators import DataRequired

class ReviewForm(FlaskForm):
    review = TextAreaField('Review', validators=[DataRequired()])
    stars = IntegerField('Stars', validators=[DataRequired()])
    submit = SubmitField('Submit')
