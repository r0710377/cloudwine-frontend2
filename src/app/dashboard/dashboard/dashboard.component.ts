import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Organisation } from 'src/app/super-admin/organisations/organisation';
import { Weatherstation } from 'src/app/super-admin/weatherstations/weatherstation';
import { WeatherstationService } from 'src/app/super-admin/weatherstations/weatherstation.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  closeModal: string = "";

  isSubmittedDataPublic: boolean = false;
  isSubmittedRelais: boolean = false;
  errorMessage: string = "";

  weatherstationId: number = 0;
  weatherstation$: Subscription = new Subscription();
  putWeatherstation$: Subscription = new Subscription();
  weatherstations$: Subscription = new Subscription();

  organisation: Organisation = { id: 0, name: "", address: "", postal_code: "", city: "", country: "", is_active: false };

  weatherstation: Weatherstation = { id: 0, organisation_id: 0, name: "", gsm: "", relais_name: "", latitude: "", longitude: "", is_active: false, is_public: false, is_location_alarm: false, is_no_data_alarm: false, number_of_cycles: null, is_manual_relais: false, organisation: this.organisation };

  weatherstations: Weatherstation[] = [];

  constructor(private router: Router, private modalService: NgbModal, private route: ActivatedRoute, private weatherstationService: WeatherstationService) {
    const weatherstationId2 = this.route.snapshot.paramMap.get('id');
    if (weatherstationId2 != null) {
      this.weatherstationId = +weatherstationId2;
      console.log(this.weatherstationId);
      this.getWeatherstationById(this.weatherstationId);
    }
  }

  ngOnInit(): void {
    this.getWeatherstations();

    // When parameter in route is changed
    this.route.params.subscribe(params => {
      let newWeatherstationId = +params['id'];

      // Refresh weatherstationId + reload weatherstation
      this.weatherstationId = newWeatherstationId;
      this.getWeatherstationById(newWeatherstationId);
    });
  }

  ngOnDestroy(): void {
    this.weatherstation$.unsubscribe();
    this.putWeatherstation$.unsubscribe();
    this.weatherstations$.unsubscribe();
  }

  getWeatherstationById(id: number) {
    this.weatherstation$ = this.weatherstationService.getWeatherstationById(id).subscribe(result => {
      this.weatherstation = result;
    });
  }

  putDataPublic() {
    this.isSubmittedDataPublic = true;

    this.weatherstation.is_public = !this.weatherstation.is_public;

    this.putWeatherstation$ = this.weatherstationService.putWeatherstation(this.weatherstationId, this.weatherstation).subscribe(result => {
      this.router.navigate(["/dashboard/" + this.weatherstationId]);
    },
      error => {
        this.errorMessage = error.message;
      });
  }

  putRelais() {
    this.isSubmittedRelais = true;

    this.weatherstation.is_manual_relais = !this.weatherstation.is_manual_relais;

    this.putWeatherstation$ = this.weatherstationService.putWeatherstation(this.weatherstationId, this.weatherstation).subscribe(result => {
      this.router.navigate(["/dashboard/" + this.weatherstationId]);
    },
      error => {
        this.errorMessage = error.message;
      });
  }

  triggerModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getWeatherstations() {
    this.weatherstations$ = this.weatherstationService.getWeatherstations().subscribe(result => {
      this.weatherstations = result;
    });
  }

  changeWeatherstation(newWeatherstationId: any) {
    this.router.navigate(['/dashboard', newWeatherstationId]);
  }
}
