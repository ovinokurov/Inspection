import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InspectionApiService } from 'src/app/inspection-api.service';

@Component({
  selector: 'app-show-inspection',
  templateUrl: './show-inspection.component.html',
  styleUrls: ['./show-inspection.component.css']
})
export class ShowInspectionComponent implements OnInit {

  inspectionList$!:Observable<any[]>;
  inspectionTypesList$!:Observable<any[]>;
  inspectionTypeList:any=[];

  //Map to display data associate with foreing keys
  inspectionTypesMap:Map<number,string> = new Map()


  constructor(private service:InspectionApiService) { }

  ngOnInit(): void {
    this.inspectionList$ = this.service.getInspectionList();
    this.inspectionTypesList$ = this.service.getInspectionTypesList();
    this.refreshInspectionTypesMap();
  }

  // Variables (properties)
  modaltitle:string = '';
  activateAddEditInspectionComponent:boolean = false;
  inspection:any;

  modalAdd(){
    this.inspection = {
      id:0,
      status:null,
      comments:null,
      insectionTypeId:null
    }
    this.modaltitle = "Add Inspection";
    this.activateAddEditInspectionComponent = true;
  }

  refreshInspectionTypesMap(){
    this.service.getInspectionTypesList().subscribe(data =>{
      this.inspectionTypeList = data;

      for(let i = 0; i < data.length; i++)
      {
        this.inspectionTypesMap.set(this.inspectionTypeList[i].id, this.inspectionTypeList[i].inspectionName);
      }
    })
  }

}
