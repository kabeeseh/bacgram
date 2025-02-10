import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";

export const prisma = new PrismaClient();

export const supabase = createClient(
  "https://sqdwbsgrdgxijjhizivb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxZHdic2dyZGd4aWpqaGl6aXZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxNzYwNDAsImV4cCI6MjA1NDc1MjA0MH0.arNTeoW3Fl_62GN-hbu-MR5OwLEfIuD2qoddCL9T-ps"
);
