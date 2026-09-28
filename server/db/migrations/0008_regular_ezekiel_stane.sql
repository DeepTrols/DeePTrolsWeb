CREATE TABLE "showcase_lists" (
	"key" varchar(50) PRIMARY KEY NOT NULL,
	"label" varchar(100) DEFAULT '' NOT NULL,
	"items" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
