import {FreeTrialTeacherEmailTemplateCriteria} from './FreeTrialTeacherEmailTemplateCriteria.model';
import {FreeTrialTeacherWhatsTemplateCriteria} from './FreeTrialTeacherWhatsTemplateCriteria.model';
import {StatutFreeTrialCriteria} from './StatutFreeTrialCriteria.model';
import {FreeTrialConfigurationCriteria} from './FreeTrialConfigurationCriteria.model';
import {FreeTrialStudentEmailTemplateCriteria} from './FreeTrialStudentEmailTemplateCriteria.model';
import {FreeTrialDetailCriteria} from './FreeTrialDetailCriteria.model';
import {TeacherCriteria} from './TeacherCriteria.model';
import {LevelCriteria} from './LevelCriteria.model';
import {FreeTrialStudentWhatsTemplateCriteria} from './FreeTrialStudentWhatsTemplateCriteria.model';

import {BaseCriteria} from './BaseCriteria.model';

export class FreeTrialCriteria  extends BaseCriteria {

    public id: number;
    public dateFreeTrial: Date;
    public dateFreeTrialFrom: Date;
    public dateFreeTrialTo: Date;
    public link: string;
    public linkLike: string;
    public dateFreeTrialPremierRappel: Date;
    public dateFreeTrialPremierRappelFrom: Date;
    public dateFreeTrialPremierRappelTo: Date;
    public dateFreeTrialPremierDeuxiemeRappel: Date;
    public dateFreeTrialPremierDeuxiemeRappelFrom: Date;
    public dateFreeTrialPremierDeuxiemeRappelTo: Date;
     public nombreStudentTotal: number;
     public nombreStudentTotalMin: number;
     public nombreStudentTotalMax: number;
     public nombreStudentAbonne: number;
     public nombreStudentAbonneMin: number;
     public nombreStudentAbonneMax: number;
     public nombreStudentPresent: number;
     public nombreStudentPresentMin: number;
     public nombreStudentPresentMax: number;
  public teacher: TeacherCriteria ;
  public level: LevelCriteria ;
  public freeTrialStudentWhatsTemplate: FreeTrialStudentWhatsTemplateCriteria ;
  public freeTrialStudentEmailTemplate: FreeTrialStudentEmailTemplateCriteria ;
  public freeTrialTeacherEmailTemplate: FreeTrialTeacherEmailTemplateCriteria ;
  public freeTrialTeacherWhatsTemplate: FreeTrialTeacherWhatsTemplateCriteria ;
  public freeTrialConfiguration: FreeTrialConfigurationCriteria ;
  public statutFreeTrial: StatutFreeTrialCriteria ;
      public freeTrialDetails: Array<FreeTrialDetailCriteria>;

}
