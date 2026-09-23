CREATE TABLE "nav_menus" (
	"key" varchar(50) PRIMARY KEY NOT NULL,
	"items" jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
