export const MAX_CONTRIBUTION_SIZE = 10 * 1024 * 1024;

export async function validateContributionFile(file) {
  if (!file || !file.size || file.size > MAX_CONTRIBUTION_SIZE || !/\.pdf$/i.test(file.name)) throw new Error('Chọn file PDF có dung lượng từ 1 byte đến 10 MB.');
  const header = new Uint8Array(await file.slice(0, 5).arrayBuffer());
  if (String.fromCharCode(...header) !== '%PDF-') throw new Error('File không có định dạng PDF hợp lệ.');
}
