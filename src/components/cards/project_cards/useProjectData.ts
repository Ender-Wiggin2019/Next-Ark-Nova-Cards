import { useContext } from 'react';

import { ProjectDataContext } from './ProjectDataContext';

export function useProjectData() {
  return useContext(ProjectDataContext);
}
