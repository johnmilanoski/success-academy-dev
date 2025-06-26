/*
  proc_commission.sql – distribute up to 5-level unilevel commissions

  Inputs : purchase_id, course_id, sale_total NUMERIC
  Logic  : 50% platform share (catalog)  OR 5% (direct instructor link)
           Pays up to 25% (5×5) to affiliates, level by level.
           Inserts rows into commissions table.
*/
CREATE OR REPLACE FUNCTION distribute_commission(
  p_purchase_id INT,
  p_course_id   INT,
  p_sale_total  NUMERIC,
  p_instructor  INT
) RETURNS VOID LANGUAGE plpgsql AS
$$
DECLARE
  v_student       INT;
  v_platform_share NUMERIC := p_sale_total * 0.50;  -- assume catalog sale
  v_paid           NUMERIC := 0;
  v_level          INT := 1;
  v_sponsor        INT;
BEGIN
  -- who bought the course?
  SELECT student_id INTO v_student FROM purchases WHERE id = p_purchase_id;

  -- walk the affiliate chain up to 5 levels
  v_sponsor := (SELECT sponsor_id FROM affiliates WHERE student_id = v_student);
  WHILE v_sponsor IS NOT NULL AND v_level <= 5 LOOP
    INSERT INTO commissions(purchase_id, instructor_id, level, amount, created_at)
    VALUES (p_purchase_id, v_sponsor, v_level, p_sale_total * 0.05, NOW());
    v_paid := v_paid + p_sale_total * 0.05;
    v_sponsor := (SELECT sponsor_id FROM affiliates WHERE student_id = v_sponsor);
    v_level  := v_level + 1;
  END LOOP;

  -- Anything left of platform share is platform income; no insert needed here.
END;
$$;
