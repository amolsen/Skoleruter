import { Pipe, PipeTransform} from '@angular/core';
import { Skole }  from './skole';


@Pipe({
    name: 'skoleListeFilter'
})

export class SkoleListeFilterPipe implements PipeTransform {

  /*transform(skoler: SkoleData[], args: string[]): SkoleData[]{
    let filter:string =args[0]?args[0].toLocaleLowerCase():null;
    return filter?skoler.filter((skolen:SkoleData)=> skolen.skole.toLocaleLowerCase().indexOf(filter)!=-1):skoler;
*/





     transform(skoler: Skole[], skolenavn: string): any {
       /*let filter:string =skolenavn[0]?skolenavn[0].toLocaleLowerCase():null;
       return filter?skoler.filter((skolen:SkoleData)=> skolen.skole.toLocaleLowerCase().indexOf(filter)!=-1):skoler;
*/
    
     if (skoler == undefined)
       return undefined;//Hvis filtret laster inn før skoler har blitt lastet inn

     return skoler.filter(skole => skole.Skolenavn.toLocaleLowerCase().indexOf(skolenavn) != -1 );
   }
}