from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text

def seed_products():
    face1 = Product(
        seller_id=1,
        name='Pro Filt\'r Soft Matte Longwear Liquid Foundation',
        price=40.00,
        description='The FENTY BEAUTY by Rihanna Pro Filt\'r Soft Matte Longwear Liquid Foundation is a soft matte, longwear foundation with buildable, medium to full coverage, in a boundary-breaking range of shades.',
        category='face',
        image='https://beauty-buzz-images.s3.us-east-2.amazonaws.com/fenty-foundation.png'
    )
    face2 = Product(
        seller_id=2,
        name='Radiant Creamy Concealer',
        price=32.00,
        description='NARS Radiant Creamy Concealer is an award-winning concealer that corrects, contours, highlights, and perfects up to 16 hours.',
        category='face',
        image='https://beauty-buzz-images.s3.us-east-2.amazonaws.com/nars-concealer.png'
    )
    face3 = Product(
        seller_id=3,
        name='Translucent Loose Setting Powder',
        price=47.00,
        description='Now with 24HR Shine Control, Laura Mercier\'s Translucent Loose Setting Powder is a cult-favorite, award-winning silky powder with a touch of sheer coverage to set and maintain makeup for up to 16 hours of wear with a soft-focus finish and zero flashback.',
        category='face',
        image='https://beauty-buzz-images.s3.us-east-2.amazonaws.com/laura-mercier-powder.png'
    )
    face4 = Product(
        seller_id=4,
        name='All Nighter Waterproof Makeup Setting Spray',
        price=36.00,
        description='#1 Setting Spray in the U.S.* for a reason. Urban Decay All Nighter Waterproof Setting Spray is a lightweight fixing mist that keeps makeup locked in place all day long.',
        category='face',
        image='https://beauty-buzz-images.s3.us-east-2.amazonaws.com/setting-spray.png'
    )
    eyes1 = Product(
        seller_id=2,
        name='Better Than Sex Volumizing & Lengthening Mascara',
        price=29.00,
        description='Too Faced Better Than Sex Volumizing Mascara is an intensely black volumizing and lengthening mascara for the sexiest, most defined lashes possible.',
        category='eyes',
        image='https://beauty-buzz-images.s3.us-east-2.amazonaws.com/mascara.png'
    )
    eyes2 = Product(
        seller_id=1,
        name='Brow Powder Duo Color Compact',
        price=23.00,
        description='Brow Powder Duo by Anastasia Beverly Hills is a versatile dual-sided brow powder that is easy to apply and blend to quickly create natural-looking brows. Featuring a finely milled, buildable formula, this compact can be used to perfect the ombré brow look or mixed together for customizable color.',
        category='eyes',
        image='https://beauty-buzz-images.s3.us-east-2.amazonaws.com/brow-duo.png'
    )
    eyes3 = Product(
        seller_id=3,
        name='Tartelette In Bloom Clay Eyeshadow Palette',
        price=47.00,
        description='Get your shadow skills bloomin\' with Tarte\'s cult-favorite Tartelette In Bloom eyeshadow palette packed with everyday essential shades!',
        category='eyes',
        image='https://beauty-buzz-images.s3.us-east-2.amazonaws.com/eye-palette.png'
    )
    eyes4 = Product(
        seller_id=4,
        name='Lash Couture The Muses Collection False Eyelashes, Legacy',
        price=7.99,
        description='Innovative refined faux silk fiber for the silkiest lashes, fluffiest softness, & the most comfortably pliable band ever! KISS Lash Couture The Muses Collection False Eyelashes, Legacy is inspired by royal core aesthetic, a regal trend with less title & more attitude that\'s gone viral.',
        category='eyes',
        image='https://beauty-buzz-images.s3.us-east-2.amazonaws.com/kiss-lashes.png'
    )
    lips1 = Product(
        seller_id=1,
        name='Addict Lip Glow Oil',
        price=40.00,
        description='Dior Addict Lip Glow Oil is a nourishing, glossy lip oil that protects and enhances the lips, bringing out their natural color.',
        category='lips',
        image='https://beauty-buzz-images.s3.us-east-2.amazonaws.com/dior-lip.png'
    )
    lips2 = Product(
        seller_id=2,
        name='Lipstick Matte',
        price=23.00,
        description='MAC Lipstick Matte is a creamy, rich lipstick formula with high-color payoff in a matte finish.',
        category='lips',
        image='https://beauty-buzz-images.s3.us-east-2.amazonaws.com/mac-lipstick.png'
    )
    lips3 = Product(
        seller_id=3,
        name='Slim Lip Pencil Creamy Long-Lasting Lip Liner',
        price=5.00,
        description='The best-selling NYX Professional Makeup Slim Lip Pencil is a creamy long-lasting lip liner that makes lip shaping & coloring easier than ever!',
        category='lips',
        image='https://beauty-buzz-images.s3.us-east-2.amazonaws.com/nyx-pencil.png'
    )
    lips4 = Product(
        seller_id=4,
        name='Lip Repair Stick',
        price=5.99,
        description='Aquaphor Lip Repair Stick, the ointment you love now in a Stick! From the Number 1 Dermatologist recommended lip care brand. Aquaphor Lip Repair Stick immediately relieves dryness and soothes chapped, cracked lips. It provides effective, long-lasting moisture, so lips look and feel healthier.',
        category='lips',
        image='https://beauty-buzz-images.s3.us-east-2.amazonaws.com/aquaphor.png'
    )
    cheeks1 = Product(
        seller_id=1,
        name='Blush',
        price=32.00,
        description='NARS Blush is an award-winning, powder blush that delivers healthy-looking color to flatter any skin tone.',
        category='cheeks',
        image='https://beauty-buzz-images.s3.us-east-2.amazonaws.com/nars-blush.png'
    )
    cheeks2 = Product(
        seller_id=2,
        name='Match Stix Contour Skinstick',
        price=32.00,
        description='The FENTY BEAUTY by Rihanna Match Stix Contour Skinstick is a contour stick in a longwear, light-as-air matte formula in a range of shades for all skin tones.',
        category='cheeks',
        image='https://beauty-buzz-images.s3.us-east-2.amazonaws.com/fenty-contour.png'
    )
    cheeks3 = Product(
        seller_id=3,
        name='Sun Stalk\'r Instant Warmth Bronzer',
        price=35.00,
        description='The FENTY BEAUTY by Rihanna Sun Stalk\'r Instant Warmth Bronzer is a longwear, transfer-resistant bronzing powder in 8 groundbreaking shades, each carefully curated to bring all skin tones to life with an instant sun-soaked glow.',
        category='cheeks',
        image='https://beauty-buzz-images.s3.us-east-2.amazonaws.com/fenty-bronzer.png'
    )
    cheeks4 = Product(
        seller_id=4,
        name='Killawatt Freestyle Highlighter',
        price=40.00,
        description='The FENTY BEAUTY by Rihanna Killawatt Foil Freestyle Highlighter is a lightweight, longwear cream-powder hybrid highlighter that ranges from subtle dayglow to insanely supercharged in solos and expertly paired duos.',
        category='cheeks',
        image='https://beauty-buzz-images.s3.us-east-2.amazonaws.com/fenty-highlighter.png'
    )
    bnt1 = Product(
        seller_id=1,
        name='Everyday Essentials Makeup Brush & Sponge Set',
        price=19.99,
        description='The Real Techniques Everyday Essentials Kit is your one and done brush set to create professional-styled looks for your face, cheeks, and eyes.',
        category='brushes&tools',
        image='https://beauty-buzz-images.s3.us-east-2.amazonaws.com/brushes.png'
    )
    bnt2 = Product(
        seller_id=2,
        name='Original Beautyblender',
        price=20.00,
        description='Beautyblender\'s Original Beautyblender is the #1-selling makeup sponge, the super-soft, exclusive, latex-free foam that quickly blends makeup for an easy application and flawless, skin-like finish.',
        category='brushes&tools',
        image='https://beauty-buzz-images.s3.us-east-2.amazonaws.com/blender.png'
    )
    bnt3 = Product(
        seller_id=3,
        name='Eyelash Curler',
        price=25.00,
        description='Shiseido\'s best-selling eyelash curler has an edge-free design that prevents pinching for an eye-opening, glamourous curl.',
        category='brushes&tools',
        image='https://beauty-buzz-images.s3.us-east-2.amazonaws.com/lash-curler.png'
    )
    bnt4 = Product(
        seller_id=4,
        name='Brush #14 Dual-Ended Firm Detail',
        price=18.00,
        description='Brush 14 by Anastasia Beverly Hills is an angled brush with firm, short synthetic fibers ideal for filling and detailing the eyebrows. The firm, tapered shape is perfect for creating ultra-thin hairlike strokes with precise detail. Use the spoolie end to blend for a soft, natural-looking finish.',
        category='brushes&tools',
        image='https://beauty-buzz-images.s3.us-east-2.amazonaws.com/brow-brush.png'
    )

    db.session.add(face1)
    db.session.add(face2)
    db.session.add(face3)
    db.session.add(face4)
    db.session.add(eyes1)
    db.session.add(eyes2)
    db.session.add(eyes3)
    db.session.add(eyes4)
    db.session.add(lips1)
    db.session.add(lips2)
    db.session.add(lips3)
    db.session.add(lips4)
    db.session.add(cheeks1)
    db.session.add(cheeks2)
    db.session.add(cheeks3)
    db.session.add(cheeks4)
    db.session.add(bnt1)
    db.session.add(bnt2)
    db.session.add(bnt3)
    db.session.add(bnt4)
    db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
