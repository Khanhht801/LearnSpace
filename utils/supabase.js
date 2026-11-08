import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Missing build-time variables must not crash module loading before React renders.
export let supabase = null;
export let supabaseConfigError = null;
try {
  supabase = createClient(supabaseUrl, supabaseKey);
} catch {
  supabaseConfigError = 'Website chưa được cấu hình kết nối dữ liệu. Vui lòng liên hệ quản trị viên.';
}
