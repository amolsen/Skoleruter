import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Skole } from './skole';
import { BrukerPosisjonService } from './brukerPosisjon.service';


import { SkoleDataService } from './skoleData.service';
import { ValgteSkolerService } from '../valgteSkoler.service';
import { SkoleRuteData } from './skoleRuteData';

@Component({
  selector: 'skoleListe',
  templateUrl: 'app/velgSkole/html/skoleListe.component.html',
  styleUrls:['app/velgSkole/css/velgSkoleStyle.css'],
  providers: [ SkoleDataService, BrukerPosisjonService ],
})

export class SkoleListeComponent implements OnInit, OnDestroy {
  private errorMessage: string;              // Feilmelding som kan oppstå ved henting av data fra file eller server.
  private skoler: Array<Skole>;                   // Skole objekter som brukeren kan velge i mellom.
  private skolenavn: string = '';            // String som blir hentet fra søkefelt.
  private mineSkoler: Array<string>;         // Valgte skoler. Brukes ogå som boolean for visning av liste etc.
  private skoleRute: Array<SkoleRuteData>;        // Brukes til å hente ut skoleruter for valgte skoler.
  private valgteSkoleRuter: Array<any> = []; // Data som skal brukes i kalender og liste.
  private skoleruteKnapp = false;            // Boolsk variabel som styrer visning av knapper (Vis skolerute og Fjern Skoler).
  private brukerPosisjonLatutude: number;
  private brukerPosisjonLongitude: number;
  private skolerMedLokasjon: Array<Skole>;
  private sorterKnappTrykketPa = false;

  constructor (private skoledataService: SkoleDataService,
      private valgteSkolerService: ValgteSkolerService,
      private router: Router,
      private brukerPosisjonService: BrukerPosisjonService) {}

  ngOnInit() {

    this.getSkolerMedLokasjon();
    this.valgteSkolerService.getLagretData();
    if(this.valgteSkolerService.getSkoler() === null ){
      this.getSkolerData();
      this.getSkoleRuteData();
    }else{
      this.skoler = this.valgteSkolerService.getSkoler();
      this.mineSkoler = this.valgteSkolerService.getValgteSkoler();
      this.visEllerSkjulKnapper();
      this.skoleRute = this.valgteSkolerService.getSkoleRute();
    }
  }

  ngOnDestroy() {
    this.valgteSkolerService.setValgteSkoleRuter(this.valgteSkoleRuter);
    this.valgteSkolerService.setSkoler(this.skoler);
    this.valgteSkolerService.setSkoleRute(this.skoleRute);
    this.valgteSkolerService.setLagreDataLokalt();
  }
    public getSkoler() {
      return this.skoler;
    }
    public getSkoleRute() {
      return this.skoleRute;
    }

    private getSkolerData() {
    this.skoledataService.getSkoler()
                     .subscribe(
                       skoler => this.skoler = skoler,
                       error =>  this.errorMessage = <any>error);
    }

    private getSkoleRuteData() {
        this.skoledataService.getSkoleRuteData()
                         .subscribe(
                           skoleRute => this.skoleRute = skoleRute,
                           error =>  this.errorMessage = <any>error);
    }

    private getSkolerMedLokasjon() {
        this.skoledataService.getSkolerMedLokasjon()
                         .subscribe(
                           skolerMedLokasjon => this.skolerMedLokasjon = skolerMedLokasjon,
                           error =>  this.errorMessage = <any>error);
    }

    private getBrukerPosisjon() {
        if (navigator.geolocation) {
            this.brukerPosisjonService.getBrukerPosisjon().forEach(
                (position: Position) => {
                        this.brukerPosisjonLatutude = position.coords.latitude;
                        this.brukerPosisjonLongitude =  position.coords.longitude;
                        this.skoler = this.brukerPosisjonService.sorterSkolerEtterAvstand(this.brukerPosisjonLatutude,
                          this.brukerPosisjonLongitude, this.skolerMedLokasjon, this.skoler);
                          this.sorterKnappTrykketPa = true;
                          console.log(this.skoler);
            })
        } else {
            alert("Du må bruke en støttet nettleser for å sortere lokasjon");
        }
    }

    private leggTilSkole(skole: Skole) {
      if(!skole.TrykketPa){
        skole.TrykketPa = true;
      }else{
        skole.TrykketPa = false;
      }
      this.valgteSkolerService.leggTilSkole(skole.skole,
         this.skoler.indexOf(skole));
      this.valgteSkoler();
      this.visEllerSkjulKnapper();
      this.skolenavn = "";
    }

    private fjernValgteSkoler() {
      this.valgteSkolerService.nullstillVariabler();
      this.valgteSkolerService.fjernLagretData();
      this.nullstillVariabler();
      this.visEllerSkjulKnapper();
    }

    private valgteSkoler() {
      this.mineSkoler = this.valgteSkolerService.getValgteSkoler();
    }

    private visEllerSkjulKnapper() {
      if (this.mineSkoler === undefined || this.mineSkoler.length == 0) {
        this.skjulSkoleruteKnapp();
      }else{
        this.visSkoleruteKnapp();
      }
    }

    private gaVidereTilSkoleruter() {
      this.visSkolerute();
      this.router.navigate(['/skoleruter']);
      window.scrollTo(0,0); //Scroller window til toppen av siden
    }

    private visSkolerute () {
      for (let skole of this.skoleRute){
        for (let valgtSkole of this.mineSkoler){
          if(valgtSkole === skole.skole){
            this.valgteSkoleRuter.push(skole);
            }
          }
        }
    }

    private visSkoleruteKnapp() {
      this.skoleruteKnapp = true;
    }

    private skjulSkoleruteKnapp() {
      this.skoleruteKnapp = false;
    }

    private nullstillVariabler() {
      for(let skole of this.skoler){
        if(skole.TrykketPa === true){
          skole.TrykketPa = false;
        }
      }
      this.skolenavn = '';
      this.mineSkoler = [];
      this.valgteSkoleRuter = [];
      this.skoleruteKnapp = false;
    }
  }
