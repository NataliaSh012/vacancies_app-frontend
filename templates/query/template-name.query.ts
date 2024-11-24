import { useQuery } from '@tanstack/react-query';
import { client, QueryKeys } from '../shared';

export const useTemplateNameQuery = () => {
  return useQuery({
    queryKey: [QueryKeys.UserInfo],
    queryFn: ({ signal }) => {
    //   return client.GET('', { signal });
    },
  });
};
