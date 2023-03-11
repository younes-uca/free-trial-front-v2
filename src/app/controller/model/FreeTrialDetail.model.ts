import {FreeTrialDto} from './FreeTrial.model';
import {StudentDto} from './Student.model';


export class FreeTrialDetailDto {

    public id: number;
    public reference: string;

    public presence: null | boolean;
    public whatsUpMessageSent: null | boolean;
    public dateEnvoiwhatsUpMessage: Date;
    public emailMessageSent: null | boolean;
    public dateEnvoiEmailMessage: Date;
    public abonne: null | boolean;
    public dateEnvoiwhatsUpMessageMax: string;
    public dateEnvoiwhatsUpMessageMin: string;
    public dateEnvoiEmailMessageMax: string;
    public dateEnvoiEmailMessageMin: string;
    public freeTrial: FreeTrialDto;
    public student: StudentDto;

}
