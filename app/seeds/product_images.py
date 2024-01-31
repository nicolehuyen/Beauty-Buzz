from app.models import db, ProductImage, environment, SCHEMA
from sqlalchemy.sql import text

def seed_product_images():
    image1 = ProductImage(
        product_id = 1,
        url = 'https://media.ulta.com/i/ulta/2592526?w=1100&h=1100'
    )
    image2 = ProductImage(
        product_id = 2,
        url = 'https://media.ulta.com/i/ulta/2555984?w=1100&h=1100'
    )
    image3 = ProductImage(
        product_id = 3,
        url = 'https://media.ulta.com/i/ulta/2559917?w=1100&h=1100'
    )
    image4 = ProductImage(
        product_id = 4,
        url = 'https://media.ulta.com/i/ulta/2503490?w=1100&h=1100'
    )
    image5 = ProductImage(
        product_id = 5,
        url = 'https://media.ulta.com/i/ulta/2263444?w=1100&h=1100'
    )
    image6 = ProductImage(
        product_id = 6,
        url = 'https://media.ulta.com/i/ulta/2143881?w=1100&h=1100'
    )
    image7 = ProductImage(
        product_id = 7,
        url = 'https://media.ulta.com/i/ulta/2293234?w=1100&h=1100'
    )
    image8 = ProductImage(
        product_id = 8,
        url = 'https://media.ulta.com/i/ulta/2604618?w=1100&h=1100'
    )
    image9 = ProductImage(
        product_id = 9,
        url = 'https://media.ulta.com/i/ulta/2604263?w=1100&h=1100'
    )
    image10 = ProductImage(
        product_id = 10,
        url = 'https://media.ulta.com/i/ulta/2511157?w=1100&h=1100'
    )
    image11 = ProductImage(
        product_id = 11,
        url = 'https://media.ulta.com/i/ulta/2226177?w=1100&h=1100'
    )
    image12 = ProductImage(
        product_id = 12,
        url = 'https://media.ulta.com/i/ulta/2578180?w=1666&h=1666'
    )
    image13 = ProductImage(
        product_id = 13,
        url = 'https://media.ulta.com/i/ulta/2504457?w=1100&h=1100'
    )
    image14 = ProductImage(
        product_id = 14,
        url = 'https://media.ulta.com/i/ulta/2592591?w=1100&h=1100'
    )
    image15 = ProductImage(
        product_id = 15,
        url = 'https://media.ulta.com/i/ulta/2592464?w=1100&h=1100'
    )
    image16 = ProductImage(
        product_id = 16,
        url = 'https://media.ulta.com/i/ulta/2592587?w=1100&h=1100'
    )
    image17 = ProductImage(
        product_id = 17,
        url = 'https://media.ulta.com/i/ulta/2534700?w=1100&h=1100'
    )
    image18 = ProductImage(
        product_id = 18,
        url = 'https://media.ulta.com/i/ulta/2530759?w=1100&h=1100'
    )
    image19 = ProductImage(
        product_id = 19,
        url = 'https://media.ulta.com/i/ulta/2305959?w=1100&h=1100'
    )
    image20 = ProductImage(
        product_id = 20,
        url = 'https://media.ulta.com/i/ulta/2524588?w=1100&h=1100'
    )

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.add(image4)
    db.session.add(image5)
    db.session.add(image6)
    db.session.add(image7)
    db.session.add(image8)
    db.session.add(image9)
    db.session.add(image10)
    db.session.add(image11)
    db.session.add(image12)
    db.session.add(image13)
    db.session.add(image14)
    db.session.add(image15)
    db.session.add(image16)
    db.session.add(image17)
    db.session.add(image18)
    db.session.add(image19)
    db.session.add(image20)

def undo_product_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM product_images"))

    db.session.commit()
