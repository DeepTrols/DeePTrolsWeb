CREATE TABLE "pages" (
	"slug" varchar(300) PRIMARY KEY NOT NULL,
	"title" varchar(500) NOT NULL,
	"seo_description" varchar(500) DEFAULT '' NOT NULL,
	"status" "content_status" DEFAULT 'draft' NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"sections" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
