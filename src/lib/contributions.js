import { supabase } from '../../utils/supabase.js';
import { validateContributionFile } from './contributionValidation.js';

export async function finishContribution(id) {
  const { data, error } = await supabase.from('contributions').update({ status: 'pending' }).eq('id', id).eq('status', 'uploading').select('id').maybeSingle();
  if (error || !data) throw error || new Error('Chưa thể gửi tài liệu để duyệt.');
}

export async function uploadContribution(id, path, file) {
  await validateContributionFile(file);
  const { error } = await supabase.storage.from('contributions').upload(path, file, { contentType: 'application/pdf', upsert: false });
  if (error) throw error;
  await finishContribution(id);
}

export async function createContribution(userId, fields, file) {
  await validateContributionFile(file);
  const id = crypto.randomUUID();
  const path = `${userId}/${id}.pdf`;
  const { error } = await supabase.from('contributions').insert({ id, ...fields, file_path: path, rights_confirmed: true });
  if (error) throw error;
  try { await uploadContribution(id, path, file); }
  catch { throw new Error('Tài liệu đã được tạo nhưng chưa gửi xong. Mở “Tài liệu đã gửi” để hoàn tất hoặc tải lại file.'); }
}
