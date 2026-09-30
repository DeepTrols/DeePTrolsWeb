ALTER TABLE "cases" ADD COLUMN "metrics" jsonb DEFAULT '[]'::jsonb NOT NULL;--> statement-breakpoint
-- 015.19a：新增智慧储能行业分类（幂等，同 0010 惯例）
INSERT INTO "content_categories" ("scope", "key", "label", "sort_order") VALUES
	('solution', 'smart-energy-storage', '智慧储能', 7)
ON CONFLICT ("scope", "key") DO NOTHING;