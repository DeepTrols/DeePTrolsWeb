CREATE TYPE "public"."lead_status" AS ENUM('new', 'followed', 'closed');--> statement-breakpoint
CREATE TABLE "leads" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"company" varchar(100) DEFAULT '' NOT NULL,
	"phone" varchar(20) DEFAULT '' NOT NULL,
	"email" varchar(100) DEFAULT '' NOT NULL,
	"message" text NOT NULL,
	"source" varchar(200) DEFAULT '/contact' NOT NULL,
	"status" "lead_status" DEFAULT 'new' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
