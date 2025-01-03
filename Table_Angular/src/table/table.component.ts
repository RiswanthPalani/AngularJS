import {AfterViewInit, Component, ViewChild , inject , Inject, DestroyRef ,ChangeDetectorRef , NgZone , OnInit, input , Input , signal} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormField, MatFormFieldControl, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import axios from 'axios';
import {BreakpointObserver, Breakpoints , LayoutModule } from '@angular/cdk/layout';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DataSource } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';  // <-- Import CommonModule
import { RouterLink } from '@angular/router';
import { InjectSetupWrapper } from '@angular/core/testing';
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox'
import {animate, state, style, transition, trigger} from '@angular/animations';
import users from './user-data.json';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';







var del_ind = -1;
var editIndex:string;




@Component({
  selector: 'app-table',
  styleUrl: 'table.component.css',
  templateUrl: 'table.component.html',
  imports: [MatTableModule, MatPaginatorModule , MatIconModule , MatButtonModule,MatMenuModule ,CommonModule, RouterLink , MatExpansionModule , FormsModule , MatFormFieldModule  , MatInputModule],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class TableComponent implements AfterViewInit , OnInit {

  dataSource = new MatTableDataSource<userTable>( userData);  
  dropDownClick = 0;
  // expandDetail = 0;
  pageSize=2;
  expandedUser:userTable;
   empty:userTable;
   sideBarOpen = 1;
   isHovering = false;
   isDivHover=false;

   divHover(){
     this.isDivHover=true;
    
   }
   divLeave(){
    this.isDivHover=false;
   }

  mouseHovering() {
    this.isHovering=true;
  }
  mouseLeaving() {
    this.isHovering=false;
  }

   currYear = new Date().getFullYear();

   sideBarChange() {
     this.sideBarOpen = Number(!this.sideBarOpen);
   }
   
    // startTime(){
    //   setTimeout(() => {
    //      alert('time check')
    //   }, 1000);
    // }

    
   reload() {
       window.location.reload();
   }

  swapIcon(){
    this.dropDownClick = Number(!this.dropDownClick);
    // alert("check");
    console.log(this.dropDownClick);
  }

  fetchData = async () => {
    const response = await axios.get("http://localhost:3000/");
   
    return response.data; 
  };

  deleteData = async(ID:number)=>{

    try {
      const response = await axios.delete(`http://localhost:3000/delete?ID=${ID}`);
      // console.log(response.data); 
      return response;
    } catch (error) {
      console.error('Error deleting data:', error);
      throw error; 
    }
  }

 

  removeData = async(ID:number)=>{
    // console.log('remove data is running ID='+ID);
    try {
      const result = await this.deleteData(ID);
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error removing data:', error);
    }
    
     this.cdr.detectChanges();
  }
  
  //console.log('checking user data :');
  loadData = async () => {
    // console.log('loadData is running');
    userData = await this.fetchData();  // Fetch data
    // console.log('userdata is ' + JSON.stringify(userData));

    // Run inside Angular's zone to ensure change detection is triggered
    this.ngZone.run(() => {
      setTimeout(() => {
        this.dataSource.data = userData;  // Update MatTableDataSource data
        // console.log("set time check + " + JSON.stringify(userData));
        this.dataSource.paginator = this.paginator; // Assign paginator to the dataSource
        this.cdr.markForCheck();
        this.cdr.detectChanges(); // Manually trigger change detection
        
      }, 0); // Delay the update to ensure Angular detects the changes
    });
  };
 
 
  updateForAddUser(){
    
      this.dataSource.data=[...userData];
  }

  onInputChange(event: Event){
      const target = event.target as HTMLInputElement;
      const result = userData.filter(item=>item.name.toLowerCase().includes(target.value.toLowerCase()));
      
      this.dataSource.data = [...result];
      this.pageSize=result.length;
  }
  
  deleteId=-1;
  readonly dialog = inject(MatDialog);

   constructor (
    private breakpointObserver: BreakpointObserver ,
     private destroyRef:DestroyRef , 
     private cdr:ChangeDetectorRef,
     private ngZone: NgZone
    ){}
  
   break1=false;
   displayedColumns: string[] = ['name','emailId','role','userGroup','createdBy','createdOn','action'];
    onAdd(){
      this.dialog.open(adduser, {
        maxWidth:'none',
        width:'80%',
        height:'500px'
      }).afterClosed().subscribe(result=>{
        //  alert("closed")
        this.dataSource.data = [...userData];
        
      });
    }

  @ViewChild(MatPaginator) paginator:  MatPaginator;
  ngOnInit(): void {
    // this.loadData();
    if(userData)
    this.dataSource.data=[...userData];
    this.dataSource.paginator=this.paginator;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }


   onDelete (index:string){
      // this.deleteId=index;
     // alert(userData[parseInt(index)].name);
      const removedItem = userData.splice(parseInt(index),1);
      this.dataSource.data = [...userData];
     const result  =  this.deleteData(parseInt(index));
      
   }
   openDialog(userID:number): void {
   
    this.expandedUser=this.empty;
    // console.log("Delete ID "+ userID);
     let index=0;
     for(let i=0;i<userData.length;i++){
      index = i;
           if(userData[i].ID === userID) break;
     }
     this.deleteId=index;
    const delUser = userData[index];
    // const delUsername = userData[parseInt(index)].name;
   

    this.dialog.open(DeleteConfirmation, {
      width: '25%',data: { onDeleteYes: () => this.onDeleteYes() , delUser:delUser},
    });
    // del_ind = parseInt(index);
   
  }
  onDeleteYes(){
    const removedItem = userData.splice(this.deleteId,1);
    this.dataSource.data = [...userData];
   
    
    //  this.removeData(this.deleteId);
    
     this.deleteId=-1;
   
  }

  openEdit(userID:number){

    let index=0;
    // editIndex = index;
    this.expandedUser=this.empty;

    for(let i=0;i<userData.length;i++){
           index=i;
           if(userData[i].ID == userID) break; 
    }

    editIndex = index.toString();
    const tempData = { ...userData[index] };
  
      this.dialog.open(editForm , {
        maxWidth: 'none' ,
        width:'70%',
        height:'400px',
        data:{ currentData : tempData}
      })
      .afterClosed().subscribe(result=>{
        //  alert("closed")
        this.dataSource.data = [...userData];
        
      });
  }     

  
  openExpand(index: string) {
     
       const expandedData = userData[parseInt(index)];
       this.dialog.open(expandForm , {
        maxWidth:'none',
        width:'80%',
         data:{expandedData:expandedData}
       });

      //  this.dialog.open(DeleteConfirmation, {
      //   width: '400px',data: { onDeleteYes: () => this.onDeleteYes() , delUsername:delUsername , delUser:delUser},
      // });
     
  }
}

@Component({
  selector: 'delete-confirm',
  templateUrl: 'deleteConfirmation.html',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent ,CommonModule]
})
export class DeleteConfirmation {
  readonly dialogRef = inject(MatDialogRef<DeleteConfirmation>);
  private snackBar = inject(MatSnackBar);

  delUsername: 'ben';
  delUser:userTable;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {this.delUsername = this.data.delUsername; this.delUser = this.data.delUser} 

  openSnackBar(message: string) {
    
  
    this.snackBar.open(message ,'',{duration:2000});
   

  }
   
   
  onDeleteYes() {
   
    if (this.data && this.data.onDeleteYes) {
      this.data.onDeleteYes(); 
      
    }

   this.openSnackBar('user has been deleted');
  }
 
}

@Component({
  selector:'edit-user',
  templateUrl:'edit-user.html',
  imports:[MatButtonModule, MatDialogActions, MatDialogContent, MatFormField , MatLabel,FormsModule]
})
export class editUserForm {
  readonly dialogRef = inject(MatDialogRef<editUserForm>);

  userData={
     name:'',
     emailId:'',
     role:'',
     userGroup:'',
  }

  onNoClick() {
    this.dialogRef.close();
  }
  onConfirm(){
  
     //alert(userData[parseInt(editIndex)].name);
     var i = parseInt(editIndex);
     if(this.userData.name!=='')
     userData[i].name = this.userData.name;
     if(this.userData.emailId!=='')
     userData[i].emailId = this.userData.emailId;
     if(this.userData.role!=='')
     userData[i].role = this.userData.role;
     if(this.userData.userGroup!=='')
     userData[i].userGroup = this.userData.userGroup;
     this.dialogRef.close();
  }

}


@Component({
  selector:'edit-form',
  templateUrl:'edit-form.html',
  imports:[MatButtonModule, MatDialogActions, MatDialogContent,FormsModule , MatFormFieldModule, MatInputModule, MatIconModule ,MatDialogClose],
  styleUrl:'edit-form.css'
})
export class editForm  {
  readonly dialogRef = inject(MatDialogRef<editForm>);
  private snackBar = inject(MatSnackBar);
 
      updateData =  {
            department:'',
            firstName:'',
            lastName:'',
            jobTitle:'',
            primaryNumber:'',
            secondaryNumber:'',
            fax:''
      }
   currentData =userData[0];

   constructor(@Inject(MAT_DIALOG_DATA) public data: any) {this.currentData = this.data.currentData}
    
      onNoClick() {
        this.dialogRef.close();
      }
      onConfirm(){
         var i = parseInt(editIndex);
         userData[i]=this.currentData;
          // console.log('udpated = '+JSON.stringify(userData[i]));
          // alert(JSON.stringify(this.currentData));
          
          
          this.dialogRef.close();
          this.snackBar.open('Userdata has been edited ','',{duration:2000});
         
      }
}

@Component({
  selector:'add-user',
  templateUrl:'add-user.html',
  styleUrl:'add-user.css',
  imports:[MatDialogContent , FormsModule , MatDialogActions,MatButtonModule , MatSelectModule ,MatFormFieldModule , MatInputModule , MatCheckboxModule , ReactiveFormsModule]
})
export class adduser implements AfterViewInit{
  readonly dialogRef = inject(MatDialogRef<adduser>);
 
  @Input() tableComponentRef!: TableComponent;
  private snackBar = inject(MatSnackBar);

  readonly addFirstName = new FormControl('', [Validators.required]);
  readonly addLastName = new FormControl('',[Validators.required]);
  readonly addUserName = new FormControl('',[Validators.required]);
  readonly addUserGroup = new FormControl('',[Validators.required]);
  readonly addEmailID = new FormControl('',[Validators.required]);
  readonly addRole = new FormControl('',[Validators.required]);
  readonly addDepartment = new FormControl('',[Validators.required]);

  firstNameErrorMessage = signal('');
  lastNameErrorMessage = signal('');
   userNameErrorMessage = signal('');
   userGroupErrorMessage = signal('');
   emailIDErrorMessage = signal('');
   roleErrorMessage = signal('');
   departmentErrorMessage = signal('');

  constructor( private cdr:ChangeDetectorRef) {
    merge(this.addFirstName.statusChanges, this.addFirstName.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateFirstNameErrorMessage());

    merge(this.addLastName.statusChanges, this.addLastName.valueChanges).pipe(takeUntilDestroyed())
    .subscribe(() => this.updateLastNameErrorMessage());

    merge(this.addUserName.statusChanges, this.addUserName.valueChanges).pipe(takeUntilDestroyed())
    .subscribe(() => this.updateUserNameErrorMessage());

    merge(this.addUserGroup.statusChanges, this.addUserGroup.valueChanges).pipe(takeUntilDestroyed())
    .subscribe(() => this.updateUserGroupErrorMessage());

    merge(this.addEmailID.statusChanges, this.addEmailID.valueChanges).pipe(takeUntilDestroyed())
    .subscribe(() => this.updateEmailIDErrorMessage());

    merge(this.addRole.statusChanges, this.addRole.valueChanges).pipe(takeUntilDestroyed())
    .subscribe(() => this.updateRoleErrorMessage());

    merge(this.addDepartment.statusChanges, this.addDepartment.valueChanges).pipe(takeUntilDestroyed())
    .subscribe(() => this.updateDepartmentErrorMessage());
  }

  updateFirstNameErrorMessage() {
    if (this.addFirstName.hasError('required')) {
      this.firstNameErrorMessage.set('First Name cannot be empty');
    } else {
      this.firstNameErrorMessage.set('');
    }
  }

  updateLastNameErrorMessage(){
    if (this.addLastName.hasError('required')) {
      this.lastNameErrorMessage.set('Last Name cannot be empty');
    } else {
      this.lastNameErrorMessage.set('');
    }
  }

  updateUserNameErrorMessage(){
    if (this.addUserName.hasError('required')) {
      this.userNameErrorMessage.set('Username cannot be empty');
    } else {
      this.userNameErrorMessage.set('');
    }
  }

  updateEmailIDErrorMessage(){
    if (this.addEmailID.hasError('required')) {
      this.emailIDErrorMessage.set('Email ID cannot be empty');
    } else {
      this.emailIDErrorMessage.set('');
    }
  }

  updateUserGroupErrorMessage(){
    if (this.addUserGroup.hasError('required')) {
      this.userGroupErrorMessage.set('User group cannot be empty');
    } else {
      this.userGroupErrorMessage.set('');
    }
  }

  updateDepartmentErrorMessage(){
    if (this.addDepartment.hasError('required')) {
      this.departmentErrorMessage.set('Department cannot be empty');
    } else {
      this.departmentErrorMessage.set('');
    }
  }

  updateRoleErrorMessage(){
    if (this.addRole.hasError('required')) {
      this.roleErrorMessage.set('Role cannot be empty');
    } else {
      this.roleErrorMessage.set('');
    }
  }

  

ngAfterViewInit(): void {
  if (this.tableComponentRef && this.tableComponentRef.dataSource) {
    // Now you can access tableComponentRef.dataSource.data
    alert(this.tableComponentRef.dataSource.data);
  } else {
    console.error('TableComponent or dataSource is not initialized yet');
  }
}


   newUser = {
         ID:0,
        name:'',
       department:'',
       firstName:'',
       lastName:'',
       userGroup:'',
       role:'',
       password:'',
       confirmPassword:'',
       emailId:'',
       jobTitle:'',
       primaryNumber:'',
       secondaryNumber:'',
       fax:'',
       createdBy:'Admin',
       createdOn:'',
       action:''
  }

  onNoClick(){
    this.dialogRef.close();
  }
  openSnackBar(message: string) {
    
  
    this.snackBar.open(message ,'',{duration:2000});
   

  }

  addData = async(newUserData:userTable)=>{
    try{
     const response=await axios.post('http://localhost:3000/addUsers',newUserData);
    //  console.log(response.data);
     this.cdr.detectChanges();
     return response;

    } catch(error){
      console.error('Error adding data',error);
      throw error;
    }
 }

 callAddData = async(newUserData:userTable)=>{
    try{
           const result = await this.addData(newUserData);
           this.cdr.detectChanges();
    }catch(error){
         console.error('Error calling adddata',error);
    }
 }

  onConfirm(){
      //  console.log(this.newUser);
      
       this.dialogRef.close();
       const {password , confirmPassword , ...newUserWithoutPassword} = this.newUser;
       //console.log(newUserWithoutPassword);
         const date = new Date();
         var noon='AM';
         var hours = date.getHours()%12;
        var hourstr = hours.toString();
        if(hours<10) hourstr = '0'+hourstr;
         if(hours!==date.getHours()) noon='PM';
         var min = date.getMinutes().toString();
         var sec = date.getSeconds().toString();
         if(date.getSeconds()<10) sec='0'+sec;
         if(date.getMinutes()<10) min='0'+min;
         var dateno = date.getDate().toString();
         if(date.getDate()<10) dateno='0'+dateno;
         var month = (date.getMonth()+1).toString();
         if(date.getMonth()<9) month='0'+month;
        
         const newUserCreatedOn = dateno+'/'+month+'/'+date.getFullYear()+' '+hourstr+':'+min+':'+sec+' '+noon;
      newUserWithoutPassword.createdOn = newUserCreatedOn;
       userData.unshift(newUserWithoutPassword);
      //  userData.push(newUserWithoutPassword);


    // this.callAddData(newUserWithoutPassword);

    
    userData[0].ID = userData.length;
      // userData[userData.length-1].ID = userData.length;

      this.openSnackBar('user has been added');  }

}

@Component ({
  selector:'expand-form',
  templateUrl:'expand-form.html',
  imports:[MatDialogContent],
  styleUrl:'expand-form.css'
})                                                /***************************/

export class expandForm {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {this.expandedData = this.data.expandedData; }
        expandedData = userData[0];

       
}
export interface userTable{
  ID:number;
  name: string ;
  emailId: string ;
  role: string;
  userGroup: string;
  createdBy: string;
  createdOn:string;
  action:string;
  department:string;
  firstName:string;
  lastName:string;
  jobTitle:string;
  primaryNumber:string;
  secondaryNumber:string;
  fax:string;

}

// export interface userTable {
//     ID:  number;
//     name: string ;
//   emailId: string ;
//   role: string;
//   userGroup: string;
//   createdBy: string;
//   createdOn:string;
//   action:string

// }

  var  userData : userTable[]=users;
 

//loadData();


