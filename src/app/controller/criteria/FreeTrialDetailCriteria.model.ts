import {FreeTrialCriteria} from './FreeTrialCriteria.model';
import {StudentCriteria} from './StudentCriteria.model';

import {BaseCriteria} from './BaseCriteria.model';

export class FreeTrialDetailCriteria  extends BaseCriteria {

    public id: number;
    public presence: null | boolean;
    public whatsUpMessageSent: null | boolean;
    public dateEnvoiwhatsUpMessage: Date;
    public dateEnvoiwhatsUpMessageFrom: Date;
    public dateEnvoiwhatsUpMessageTo: Date;
    public emailMessageSent: null | boolean;
    public dateEnvoiEmailMessage: Date;
    public dateEnvoiEmailMessageFrom: Date;
    public dateEnvoiEmailMessageTo: Date;
    public abonne: null | boolean;
  public freeTrial: FreeTrialCriteria ;
  public student: StudentCriteria ;

}
