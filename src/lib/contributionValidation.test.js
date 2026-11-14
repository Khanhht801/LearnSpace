import { test } from 'node:test';
import assert from 'node:assert/strict';
import { MAX_CONTRIBUTION_SIZE, validateContributionFile } from './contributionValidation.js';

test('contribution file accepts a PDF and rejects invalid type, size and header', async () => {
  await validateContributionFile(new File(['%PDF-1.7\n'], 'lesson.pdf', { type: 'application/pdf' }));
  await assert.rejects(validateContributionFile(null), /Chọn file PDF/);
  await assert.rejects(validateContributionFile(new File(['%PDF-'], 'lesson.txt')), /Chọn file PDF/);
  await assert.rejects(validateContributionFile(new File(['not a pdf'], 'lesson.pdf')), /định dạng PDF/);
  await assert.rejects(validateContributionFile(new File([new Uint8Array(MAX_CONTRIBUTION_SIZE + 1)], 'large.pdf')), /10 MB/);
});
