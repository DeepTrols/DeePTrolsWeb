CREATE TABLE "content_categories" (
	"scope" varchar(30) NOT NULL,
	"key" varchar(50) NOT NULL,
	"label" varchar(100) NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "content_categories_scope_key_pk" PRIMARY KEY("scope","key")
);
--> statement-breakpoint
-- 015.16：pgEnum→varchar 必须显式 USING ::text，否则 Postgres 报 "cannot be cast automatically"
ALTER TABLE "case_details" ALTER COLUMN "category_key" SET DATA TYPE varchar(50) USING "category_key"::text;--> statement-breakpoint
ALTER TABLE "cases" ALTER COLUMN "solution_key" SET DATA TYPE varchar(50) USING "solution_key"::text;--> statement-breakpoint
ALTER TABLE "news" ALTER COLUMN "category" SET DATA TYPE varchar(50) USING "category"::text;--> statement-breakpoint
ALTER TABLE "reports" ALTER COLUMN "type" SET DATA TYPE varchar(50) USING "type"::text;--> statement-breakpoint
ALTER TABLE "reports" ALTER COLUMN "solution_key" SET DATA TYPE varchar(50) USING "solution_key"::text;--> statement-breakpoint
DROP TYPE "public"."news_category";--> statement-breakpoint
DROP TYPE "public"."report_type";--> statement-breakpoint
DROP TYPE "public"."solution_key";--> statement-breakpoint
-- 现有枚举值全量入库（幂等）；sort_order 与静态回退数组顺序一致（data/news.ts newsCategoryTabs / data/reports.ts reportFilterTabs+reportTypeOptions）
INSERT INTO "content_categories" ("scope", "key", "label", "sort_order") VALUES
	('news-category', 'company', '公司动态', 0),
	('news-category', 'media', '新闻报道', 1),
	('news-category', 'insight', '技术洞见', 2),
	('solution', 'data-infrastructure', '数据设施', 0),
	('solution', 'knowledge-engineering', '知识工程', 1),
	('solution', 'smart-manufacturing', '智能制造', 2),
	('solution', 'smart-water', '智慧水利', 3),
	('solution', 'smart-education', '智慧教育', 4),
	('solution', 'fde', 'FDE', 5),
	('solution', 'compute-power', '算电协同', 6),
	('report-type', '产品规格书', '产品规格书', 0),
	('report-type', '电子书', '电子书', 1),
	('report-type', '白皮书', '白皮书', 2),
	('report-type', '视频', '视频', 3),
	('report-type', '幻灯片', '幻灯片', 4),
	('report-type', '基准测试报告', '基准测试报告', 5)
ON CONFLICT ("scope", "key") DO NOTHING;
