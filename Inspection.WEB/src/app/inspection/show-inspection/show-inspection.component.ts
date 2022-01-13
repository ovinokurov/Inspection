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

  modalEdit(item:any){
    this.inspection = item;
    this.modaltitle = "Edit Inspection";
    this.activateAddEditInspectionComponent = true;
  }

  delete(item:any){
    if(confirm(`Are you sure you want to delte inspection ${item.id}?`))
    {
      this.service.deleteInspection(item.id).subscribe(res =>{
        var closeModelBtn = document.getElementById('add-edit-modal-close');
        if(closeModelBtn){
          closeModelBtn.click();
        }
  
        var showDeleteSuccess= document.getElementById('delete-success-alert');
        if(showDeleteSuccess){
          showDeleteSuccess.style.display = "block";
        }     
        setTimeout(function(){
          if(showDeleteSuccess){
            showDeleteSuccess.style.display = "none"
          }
        }, 4000); 
        this.inspectionList$ = this.service.getInspectionList();
      });
    }
  }
 

  modalClose(){
    this.activateAddEditInspectionComponent = false;
    this.inspectionList$ = this.service.getInspectionList();
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
