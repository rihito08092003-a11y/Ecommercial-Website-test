-- Ecommercial Website Supabase seed
-- Run supabase/schema.sql first, then run this in Supabase Dashboard > SQL Editor.
-- 30 products:
-- - OnSale products have exact discount math.
-- - Newest products use is_new = true.
-- - Trending products sort by sold_count.
-- - Some products have no sale and no new tag.

insert into public.categories (slug, name, description)
values
  ('serums', 'Serums', 'Treatment serums for daily skincare'),
  ('moisturizers', 'Moisturizers', 'Hydrating creams and lotions'),
  ('cleansers', 'Cleansers', 'Gentle face cleansers'),
  ('eye-care', 'Eye Care', 'Eye creams and treatments'),
  ('masks', 'Masks', 'Wash-off and overnight masks'),
  ('suncare', 'Suncare', 'Daily SPF protection'),
  ('toners', 'Toners', 'Balancing toners and essences'),
  ('treatments', 'Treatments', 'Targeted skincare treatments')
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description;

insert into public.products
  (category_id, slug, name, description, image_url, price_actual, price_old, is_new, stock, sold_count, active)
select c.id, p.slug, p.name, p.description, p.image_url, p.price_actual, p.price_old, p.is_new, p.stock, p.sold_count, true
from (
  values
    -- Sale products: exact discount = (price_old - price_actual) / price_old
    ('serums', 'premium-facial-serum', 'Premium Facial Serum', 'Advanced hyaluronic acid serum for daily hydration.', 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80', 710000, 1000000, true, 42, 1860),
    ('moisturizers', 'hydrating-face-cream', 'Hydrating Face Cream', 'Rich moisturizing cream for all skin types.', 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80', 540000, 750000, false, 45, 1510),
    ('cleansers', 'gentle-cleanser', 'Gentle Cleanser', 'pH-balanced facial cleanser for everyday use.', 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80', 657000, 900000, false, 70, 1190),
    ('suncare', 'spf-50-sunscreen', 'SPF 50 Sunscreen', 'Broad spectrum UV protection.', 'https://images.unsplash.com/photo-1521223344201-d169129f7b1f?auto=format&fit=crop&w=900&q=80', 600000, 800000, false, 58, 1320),
    ('masks', 'night-treatment-mask', 'Night Treatment Mask', 'Intensive overnight recovery mask.', 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=80', 390000, 500000, false, 27, 640),
    ('eye-care', 'eye-care-complex', 'Eye Care Complex', 'Anti-aging eye treatment cream.', 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80', 480000, 600000, true, 30, 760),
    ('serums', 'retinol-renewal-serum', 'Retinol Renewal Serum', 'Night serum for smoother-looking skin texture.', 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=900&q=80', 574000, 700000, false, 24, 620),
    ('toners', 'aha-bha-clarifying-toner', 'AHA BHA Clarifying Toner', 'Gentle exfoliating toner for clearer skin.', 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?auto=format&fit=crop&w=900&q=80', 340000, 400000, true, 33, 1170),
    ('treatments', 'dark-spot-corrector', 'Dark Spot Corrector', 'Targeted corrector for stubborn discoloration.', 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=80', 484000, 550000, false, 25, 470),
    ('cleansers', 'amino-foam-cleanser', 'Amino Foam Cleanser', 'Soft foam cleanser that does not leave skin tight.', 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=900&q=80', 270000, 300000, true, 55, 870),

    -- New products without sale
    ('serums', 'vitamin-c-glow-serum', 'Vitamin C Glow Serum', 'Brightening serum for uneven tone and dull skin.', 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=80', 399000, null, true, 38, 1430),
    ('moisturizers', 'ceramide-barrier-cream', 'Ceramide Barrier Cream', 'Comforting cream for a stronger skin barrier.', 'https://images.unsplash.com/photo-1629732097571-b042b44f654f?auto=format&fit=crop&w=900&q=80', 429000, null, true, 32, 820),
    ('eye-care', 'brightening-eye-gel', 'Brightening Eye Gel', 'Cooling eye gel for tired-looking eyes.', 'https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?auto=format&fit=crop&w=900&q=80', 359000, null, true, 36, 1120),
    ('masks', 'hydrating-sheet-mask-set', 'Hydrating Sheet Mask Set', 'Five-piece sheet mask set for a dewy finish.', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80', 249000, null, true, 80, 1580),
    ('suncare', 'mineral-sunscreen-fluid', 'Mineral Sunscreen Fluid', 'Light mineral sunscreen with a soft finish.', 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80', 389000, null, true, 44, 720),
    ('treatments', 'barrier-repair-ampoule', 'Barrier Repair Ampoule', 'Concentrated ampoule for compromised skin.', 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80', 499000, null, true, 21, 840),

    -- Regular products: no sale and no new tag
    ('serums', 'niacinamide-pore-serum', 'Niacinamide Pore Serum', 'Light serum that helps refine pores and balance oil.', 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=900&q=80', 329000, null, false, 50, 980),
    ('moisturizers', 'oil-free-gel-moisturizer', 'Oil-Free Gel Moisturizer', 'Light gel moisturizer for oily and combination skin.', 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?auto=format&fit=crop&w=900&q=80', 299000, null, false, 60, 1240),
    ('moisturizers', 'overnight-repair-cream', 'Overnight Repair Cream', 'Deep moisture cream for night recovery.', 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=80', 459000, null, false, 28, 540),
    ('cleansers', 'cleansing-balm', 'Cleansing Balm', 'Melting balm that removes sunscreen and makeup.', 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=900&q=80', 349000, null, false, 40, 700),
    ('eye-care', 'peptide-eye-cream', 'Peptide Eye Cream', 'Peptide-rich cream for smoother under-eye skin.', 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80', 469000, null, false, 22, 390),
    ('masks', 'clay-purifying-mask', 'Clay Purifying Mask', 'Mineral clay mask for oily skin and clogged pores.', 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?auto=format&fit=crop&w=900&q=80', 319000, null, false, 41, 910),
    ('masks', 'sleeping-water-mask', 'Sleeping Water Mask', 'Light overnight gel mask for thirsty skin.', 'https://images.unsplash.com/photo-1608979048467-6194dabc6a3d?auto=format&fit=crop&w=900&q=80', 379000, null, false, 34, 1010),
    ('suncare', 'daily-spf-moisturizer', 'Daily SPF Moisturizer', 'Moisturizer and SPF in one easy morning step.', 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80', 399000, null, false, 39, 890),
    ('suncare', 'sun-stick-clear', 'Clear Sun Stick', 'Portable clear SPF stick for reapplication.', 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=900&q=80', 299000, null, false, 47, 560),
    ('toners', 'rose-hydration-toner', 'Rose Hydration Toner', 'Alcohol-free toner that refreshes and softens.', 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=900&q=80', 269000, null, false, 62, 680),
    ('toners', 'cica-calming-essence', 'Cica Calming Essence', 'Soothing essence for sensitive skin days.', 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=900&q=80', 379000, null, false, 31, 520),
    ('toners', 'rice-brightening-essence', 'Rice Brightening Essence', 'Milky essence for a soft, luminous complexion.', 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=900&q=80', 409000, null, false, 29, 1460),
    ('treatments', 'spot-care-treatment', 'Spot Care Treatment', 'Targeted gel for occasional blemishes.', 'https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?auto=format&fit=crop&w=900&q=80', 229000, null, false, 52, 590),
    ('treatments', 'peeling-solution', 'Peeling Solution', 'Weekly exfoliating treatment for smoother texture.', 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=900&q=80', 329000, null, false, 26, 430)
) as p(category_slug, slug, name, description, image_url, price_actual, price_old, is_new, stock, sold_count)
join public.categories c on c.slug = p.category_slug
on conflict (slug) do update set
  category_id = excluded.category_id,
  name = excluded.name,
  description = excluded.description,
  image_url = excluded.image_url,
  price_actual = excluded.price_actual,
  price_old = excluded.price_old,
  is_new = excluded.is_new,
  stock = excluded.stock,
  sold_count = excluded.sold_count,
  active = true;
