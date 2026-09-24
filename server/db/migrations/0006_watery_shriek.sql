CREATE TABLE "component_states" (
	"key" varchar(50) PRIMARY KEY NOT NULL,
	"disabled" jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "news" ADD COLUMN "featured" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "reports" ADD COLUMN "featured" boolean DEFAULT false NOT NULL;