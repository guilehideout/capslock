import { createClient } from "@supabase/supabase-js";


const supabase = createClient("https://gwtahgrridzbvbmaarsr.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3dGFoZ3JyaWR6YnZibWFhcnNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxNzExMjksImV4cCI6MjA3MDc0NzEyOX0.F2Om3EBbEyAshY-tHOUp1XetyDGiBwIWpsp5WYMsa5o");
export default supabase;