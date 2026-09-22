CREATE TYPE "public"."content_status" AS ENUM('draft', 'published');--> statement-breakpoint
CREATE TYPE "public"."report_type" AS ENUM('产品规格书', '电子书', '白皮书', '视频', '幻灯片', '基准测试报告');--> statement-breakpoint
CREATE TYPE "public"."solution_key" AS ENUM('data-infrastructure', 'knowledge-engineering', 'smart-manufacturing', 'smart-water', 'smart-education', 'fde', 'compute-power');--> statement-breakpoint
CREATE TABLE "case_details" (
	"case_slug" varchar(200) PRIMARY KEY NOT NULL,
	"title" varchar(500) NOT NULL,
	"category_key" "solution_key" NOT NULL,
	"hero_image" varchar(1000) NOT NULL,
	"blocks" jsonb NOT NULL,
	"related_products" jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cases" (
	"slug" varchar(200) PRIMARY KEY NOT NULL,
	"title" varchar(500) NOT NULL,
	"summary" text NOT NULL,
	"image" varchar(1000) NOT NULL,
	"solution_key" "solution_key",
	"sort_order" integer NOT NULL,
	"status" "content_status" DEFAULT 'published' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reports" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" "report_type" NOT NULL,
	"category" varchar(200) NOT NULL,
	"solution_key" "solution_key",
	"title" varchar(500) NOT NULL,
	"summary" text NOT NULL,
	"image" varchar(1000) NOT NULL,
	"href" varchar(500) NOT NULL,
	"sort_order" integer NOT NULL,
	"status" "content_status" DEFAULT 'published' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "reports_href_unique" UNIQUE("href")
);
--> statement-breakpoint
ALTER TABLE "case_details" ADD CONSTRAINT "case_details_case_slug_cases_slug_fk" FOREIGN KEY ("case_slug") REFERENCES "public"."cases"("slug") ON DELETE cascade ON UPDATE no action;