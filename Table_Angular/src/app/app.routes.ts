import { Routes } from '@angular/router';
import { TableComponent } from '../table/table.component';
import { AppComponent } from './app.component';
import { SettingComponent } from '../route-components/setting-component/setting-component.component';
import { OrganizationComponent } from '../route-components/organization/organization.component';
import { BautomateComponent } from '../route-components/bautomate/bautomate.component';
import { AccessManagementComponent } from '../route-components/access-management/access-management.component';

export const routes: Routes = [
    {path:'user', component:TableComponent},
    {path:'',component:TableComponent},
    {path:'setting',component:SettingComponent},
    {path:'organization',component:OrganizationComponent},
    {path:'bautomate',component:BautomateComponent},
    {path:'accessmanage',component:AccessManagementComponent}
];
// export const routes: Routes = [
//     {path:'user',component:TableComponent}
// ];
