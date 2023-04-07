import { EmailSubjectsEnum } from '../enum/email-subjects.enum';
import { EmailTypesEnum } from '../enum/email-types.enum';
import { TemplateListEnum } from '../enum/template-list.enum';

export const EMAIL_CONFIG = {
  [EmailTypesEnum.CONFIRM_EMAIL]: {
    subject: EmailSubjectsEnum.CONFIRM_EMAIL_SUBJECT,
    template: TemplateListEnum.CONFIRM_EMAIL_TEMPLATE,
  },
  [EmailTypesEnum.PASSWORD_RESET_EMAIL]: {
    subject: EmailSubjectsEnum.PASSWORD_RESET_EMAIL_SUBJECT,
    template: TemplateListEnum.PASSWORD_RESET_EMAIL_TEMPLATE,
  },
};
