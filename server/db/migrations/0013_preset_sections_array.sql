-- 015.19c：区块模板升级为多区块组合（section 单对象 → sections 数组，列原位改名）
-- 幂等可重跑：jsonb_typeof 守卫只把对象包成单元素数组，已是数组的行跳过
ALTER TABLE "section_presets" ALTER COLUMN "section" DROP NOT NULL;--> statement-breakpoint
UPDATE "section_presets" SET "section" = jsonb_build_array("section") WHERE jsonb_typeof("section") = 'object';--> statement-breakpoint
UPDATE "section_presets" SET "section" = '[]'::jsonb WHERE "section" IS NULL;--> statement-breakpoint
ALTER TABLE "section_presets" ALTER COLUMN "section" SET DEFAULT '[]'::jsonb;--> statement-breakpoint
ALTER TABLE "section_presets" ALTER COLUMN "section" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "section_presets" RENAME COLUMN "section" TO "sections";
