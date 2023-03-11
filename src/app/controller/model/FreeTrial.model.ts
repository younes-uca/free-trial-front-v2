import {FreeTrialTeacherEmailTemplateDto} from './FreeTrialTeacherEmailTemplate.model';
import {FreeTrialTeacherWhatsTemplateDto} from './FreeTrialTeacherWhatsTemplate.model';
import {StatutFreeTrialDto} from './StatutFreeTrial.model';
import {FreeTrialConfigurationDto} from './FreeTrialConfiguration.model';
import {FreeTrialStudentEmailTemplateDto} from './FreeTrialStudentEmailTemplate.model';
import {FreeTrialDetailDto} from './FreeTrialDetail.model';
import {TeacherDto} from './Teacher.model';
import {LevelDto} from './Level.model';
import {FreeTrialStudentWhatsTemplateDto} from './FreeTrialStudentWhatsTemplate.model';



export class FreeTrialDto {

    public id: number;
 public reference: string;
    public dateFreeTrial: Date;
    public link: string;
    public dateFreeTrialPremierRappel: Date;
    public dateFreeTrialPremierDeuxiemeRappel: Date;
     public nombreStudentTotal: number;
     public nombreStudentAbonne: number;
     public nombreStudentPresent: number;
     public dateFreeTrialMax: string ;
     public dateFreeTrialMin: string ;
     public dateFreeTrialPremierRappelMax: string ;
     public dateFreeTrialPremierRappelMin: string ;
     public dateFreeTrialPremierDeuxiemeRappelMax: string ;
     public dateFreeTrialPremierDeuxiemeRappelMin: string ;
     public nombreStudentTotalMax: string ;
     public nombreStudentTotalMin: string ;
     public nombreStudentAbonneMax: string ;
     public nombreStudentAbonneMin: string ;
     public nombreStudentPresentMax: string ;
     public nombreStudentPresentMin: string ;
      public teacher: TeacherDto ;
      public level: LevelDto ;
      public freeTrialStudentWhatsTemplate: FreeTrialStudentWhatsTemplateDto ;
      public freeTrialStudentEmailTemplate: FreeTrialStudentEmailTemplateDto ;
      public freeTrialTeacherEmailTemplate: FreeTrialTeacherEmailTemplateDto ;
      public freeTrialTeacherWhatsTemplate: FreeTrialTeacherWhatsTemplateDto ;
      public freeTrialConfiguration: FreeTrialConfigurationDto ;
      public statutFreeTrial: StatutFreeTrialDto ;
      public freeTrialDetails: Array<FreeTrialDetailDto>;

}
