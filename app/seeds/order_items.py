from app.models import db, OrderItem, environment, SCHEMA
from sqlalchemy.sql import text

def seed_order_items():
    item1 = OrderItem(
        order_id=1,
        product_id=2,
        quantity=1
    )
    item2 = OrderItem(
        order_id=1,
        product_id=12,
        quantity=2
    )
    item3 = OrderItem(
        order_id=1,
        product_id=15,
        quantity=1
    )
    item4 = OrderItem(
        order_id=2,
        product_id=19,
        quantity=1
    )
    item5 = OrderItem(
        order_id=2,
        product_id=8,
        quantity=2
    )
    item6 = OrderItem(
        order_id=2,
        product_id=9,
        quantity=1
    )
    item7 = OrderItem(
        order_id=3,
        product_id=10,
        quantity=1
    )
    item8 = OrderItem(
        order_id=3,
        product_id=1,
        quantity=1
    )
    item9 = OrderItem(
        order_id=3,
        product_id=16,
        quantity=1
    )
    item10 = OrderItem(
        order_id=4,
        product_id=13,
        quantity=1
    )
    item11 = OrderItem(
        order_id=4,
        product_id=6,
        quantity=1
    )
    item12 = OrderItem(
        order_id=4,
        product_id=18,
        quantity=1
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

def undo_order_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.order_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM order_items"))

    db.session.commit()
