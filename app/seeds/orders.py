from app.models import db, Order, environment, SCHEMA
from sqlalchemy.sql import text

def seed_orders():
    order1 = Order(
        buyer_id=1
    )
    order2 = Order(
        buyer_id=2
    )
    order3 = Order(
        buyer_id=3
    )
    order4 = Order(
        buyer_id=4
    )

    db.session.add(order1)
    db.session.add(order2)
    db.session.add(order3)
    db.session.add(order4)
    db.session.commit()

def undo_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM orders"))

    db.session.commit()