CREATE TABLE "solution_case_picks" (
	"key" varchar(50) PRIMARY KEY NOT NULL,
	"items" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
