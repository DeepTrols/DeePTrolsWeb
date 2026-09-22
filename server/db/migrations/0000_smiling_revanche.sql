CREATE TYPE "public"."news_category" AS ENUM('company', 'media', 'insight');--> statement-breakpoint
CREATE TYPE "public"."news_status" AS ENUM('draft', 'published');--> statement-breakpoint
CREATE TABLE "news" (
	"id" integer PRIMARY KEY NOT NULL,
	"title" varchar(500) NOT NULL,
	"summary" text NOT NULL,
	"cover_image" varchar(1000) NOT NULL,
	"category" "news_category" NOT NULL,
	"published_at" date NOT NULL,
	"status" "news_status" DEFAULT 'published' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "news_details" (
	"news_id" integer PRIMARY KEY NOT NULL,
	"blocks" jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "news_details" ADD CONSTRAINT "news_details_news_id_news_id_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;