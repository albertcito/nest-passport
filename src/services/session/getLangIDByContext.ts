import { UserSession } from '@/modules/people/auth/custom-context';

const getLangIDByContext = (langID?: string, user?: UserSession) => {
  if (langID) {
    return langID;
  }
  return user?.lang ?? 'EN';
};

export default getLangIDByContext;
