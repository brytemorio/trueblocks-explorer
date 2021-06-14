import React, { useCallback } from 'react';
import { useCommand } from '../../../hooks/useCommand';
import { TagTable } from './TagTable';

export const Tags = () => {
  const [tag, loadingTag] = useCommand('names', { tags: true });
  const getData = useCallback((response) => (response.status === 'fail' ? [] : response.data), []);

  return (
    <>
      <TagTable getTag={() => getData(tag)} loadingTag={loadingTag} />
    </>
  );
};
