from app.models import db, Favorite, environment, SCHEMA
from sqlalchemy.sql import text

def seed_favorites():
    item1 = Favorite(
        user_id=1,
        product_id=3
    )
    item2 = Favorite(
        user_id=1,
        product_id=5
    )
    item3 = Favorite(
        user_id=1,
        product_id=16
    )
    item4 = Favorite(
        user_id=2,
        product_id=17
    )
    item5 = Favorite(
        user_id=2,
        product_id=11
    )
    item6 = Favorite(
        user_id=2,
        product_id=7
    )
    item7 = Favorite(
        user_id=3,
        product_id=4
    )
    item8 = Favorite(
        user_id=3,
        product_id=20
    )
    item9 = Favorite(
        user_id=3,
        product_id=14
    )
    item10 = Favorite(
        user_id=4,
        product_id=2
    )
    item11 = Favorite(
        user_id=4,
        product_id=9
    )
    item12 = Favorite(
        user_id=4,
        product_id=15
    )

    db.session.add(item1)
    db.session.add(item2)
    db.session.add(item3)
    db.session.add(item4)
    db.session.add(item5)
    db.session.add(item6)
    db.session.add(item7)
    db.session.add(item8)
    db.session.add(item9)
    db.session.add(item10)
    db.session.add(item11)
    db.session.add(item12)
    db.session.commit()

def undo_favorites():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM favorites"))

    db.session.commit()
