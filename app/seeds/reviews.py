from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    review1 = Review(
        product_id=1,
        creator_id=2,
        review='I absolutely love this foundation. I have tried sooooo many different foundations and way too many to count. I would have to say this has been my absolute favorite and highly recommended.',
        stars=5
    )
    review2 = Review(
        product_id=2,
        creator_id=3,
        review='The hype around this concealer is real! Its so creamy, blendable, and the coverage can be as buildable as you choose. Its a little pricey though, but the quality is amazing so its worth it (:',
        stars=5
    )
    review3 = Review(
        product_id=3,
        creator_id=4,
        review='I use tinted sunscreen for base and finish with this powder that allow a slight healthy glow to come through. I have used for years.',
        stars=5
    )
    review4 = Review(
        product_id=4,
        creator_id=1,
        review='I high recommend this product! It gives a nice set in/finished look after doing your makeup. My only dislike is this product is a bit on the pricey side.',
        stars=4
    )
    review5 = Review(
        product_id=5,
        creator_id=2,
        review='I\'ve tried this mascara multiple times and it was great but this time it came really dry. I can barley get any product.',
        stars=3
    )
    review6 = Review(
        product_id=6,
        creator_id=3,
        review='This product really fills in my brows well. It stays on all day and doesn\'t smudge. I will definitely keep this on my list of faves!',
        stars=5
    )
    review7 = Review(
        product_id=7,
        creator_id=4,
        review='I use this palette for my competition makeup and it has great pigment and lasts long/all day. it also smells good lol',
        stars=5
    )
    review8 = Review(
        product_id=8,
        creator_id=1,
        review='I woukd gatekeep but these are so stunning that im not going to .. everyone needs these lashes! ive literally have been asked im wearing lash extensions EVERY TIME I WEAR THESE. Perfect amount of volume & well separated!',
        stars=4
    )
    review9 = Review(
        product_id=9,
        creator_id=2,
        review='It is more of a lip gloss to me than a lip oil but it doesn\'t bother me. I got the shade cherry and it leaves the perfect tint. It isn\'t sticky at all and I love the way it feels and looks.',
        stars=4
    )
    review10 = Review(
        product_id=10,
        creator_id=3,
        review='Love this lipstick! Highly recommend.',
        stars=5
    )
    review11 = Review(
        product_id=11,
        creator_id=4,
        review='Nice lip pencil!',
        stars=4
    )
    review12 = Review(
        product_id=12,
        creator_id=1,
        review='My lips get really dry and this lip balm helps a lot!',
        stars=5
    )
    review13 = Review(
        product_id=13,
        creator_id=2,
        review='I never leave the house without putting on this blush! Great product!',
        stars=5
    )
    review14 = Review(
        product_id=14,
        creator_id=3,
        review='Great contour stick. Gets the job done.',
        stars=4
    )
    review15 = Review(
        product_id=15,
        creator_id=4,
        review='Definitely gives you that sun-soaked glow! I recommend.',
        stars=5
    )
    review16 = Review(
        product_id=16,
        creator_id=1,
        review='Nice highlight but nothing special.',
        stars=4
    )
    review17 = Review(
        product_id=17,
        creator_id=2,
        review='I use these brushes every time I put on makeup! Great brushes for a great price.',
        stars=5
    )
    review18 = Review(
        product_id=18,
        creator_id=3,
        review='I always restock on this! Must buy!',
        stars=5
    )
    review19 = Review(
        product_id=19,
        creator_id=4,
        review='Best lash curlers ever!',
        stars=5
    )
    review20 = Review(
        product_id=20,
        creator_id=1,
        review='This brush is a life saver whenever I do my brows. Highly recommend!',
        stars=5
    )

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)
    db.session.add(review7)
    db.session.add(review8)
    db.session.add(review9)
    db.session.add(review10)
    db.session.add(review11)
    db.session.add(review12)
    db.session.add(review13)
    db.session.add(review14)
    db.session.add(review15)
    db.session.add(review16)
    db.session.add(review17)
    db.session.add(review18)
    db.session.add(review19)
    db.session.add(review20)
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
