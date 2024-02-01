from app.models import db, ProductImage, environment, SCHEMA
from sqlalchemy.sql import text

def seed_product_images():
    image1 = ProductImage(
        product_id = 1,
        image = 'https://beauty-buzz-images.s3.us-east-2.amazonaws.com/fenty-foundation.png'
    )
    image2 = ProductImage(
        product_id = 2,
        image = 'https://beauty-buzz-images.s3.us-east-2.amazonaws.com/nars-concealer.png'
    )
    image3 = ProductImage(
        product_id = 3,
        image = 'https://beauty-buzz-images.s3.us-east-2.amazonaws.com/laura-mercier-powder.png'
    )
    image4 = ProductImage(
        product_id = 4,
        image = 'https://beauty-buzz-images.s3.us-east-2.amazonaws.com/setting-spray.png'
    )
    image5 = ProductImage(
        product_id = 5,
        image = 'https://beauty-buzz-images.s3.us-east-2.amazonaws.com/mascara.png'
    )
    image6 = ProductImage(
        product_id = 6,
        image = 'https://beauty-buzz-images.s3.us-east-2.amazonaws.com/brow-duo.png'
    )
    image7 = ProductImage(
        product_id = 7,
        image = 'https://beauty-buzz-images.s3.us-east-2.amazonaws.com/eye-palette.png'
    )
    image8 = ProductImage(
        product_id = 8,
        image = 'https://beauty-buzz-images.s3.us-east-2.amazonaws.com/kiss-lashes.png'
    )
    image9 = ProductImage(
        product_id = 9,
        image = 'https://beauty-buzz-images.s3.us-east-2.amazonaws.com/dior-lip.png'
    )
    image10 = ProductImage(
        product_id = 10,
        image = 'https://beauty-buzz-images.s3.us-east-2.amazonaws.com/mac-lipstick.png'
    )
    image11 = ProductImage(
        product_id = 11,
        image = 'https://beauty-buzz-images.s3.us-east-2.amazonaws.com/nyx-pencil.png'
    )
    image12 = ProductImage(
        product_id = 12,
        image = 'https://beauty-buzz-images.s3.us-east-2.amazonaws.com/aquaphor.png'
    )
    image13 = ProductImage(
        product_id = 13,
        image = 'https://beauty-buzz-images.s3.us-east-2.amazonaws.com/nars-blush.png'
    )
    image14 = ProductImage(
        product_id = 14,
        image = 'https://beauty-buzz-images.s3.us-east-2.amazonaws.com/fenty-contour.png'
    )
    image15 = ProductImage(
        product_id = 15,
        image = 'https://beauty-buzz-images.s3.us-east-2.amazonaws.com/fenty-bronzer.png'
    )
    image16 = ProductImage(
        product_id = 16,
        image = 'https://beauty-buzz-images.s3.us-east-2.amazonaws.com/fenty-highlighter.png'
    )
    image17 = ProductImage(
        product_id = 17,
        image = 'https://beauty-buzz-images.s3.us-east-2.amazonaws.com/brushes.png'
    )
    image18 = ProductImage(
        product_id = 18,
        image = 'https://beauty-buzz-images.s3.us-east-2.amazonaws.com/blender.png'
    )
    image19 = ProductImage(
        product_id = 19,
        image = 'https://beauty-buzz-images.s3.us-east-2.amazonaws.com/lash-curler.png'
    )
    image20 = ProductImage(
        product_id = 20,
        image = 'https://beauty-buzz-images.s3.us-east-2.amazonaws.com/brow-brush.png'
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
    db.session.commit()

def undo_product_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM product_images"))

    db.session.commit()
