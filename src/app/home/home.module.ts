import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzMessageModule } from 'ng-zorro-antd/message';


@NgModule({
  imports: [CommonModule, SharedModule,
    NzLayoutModule,
    NzInputModule,
    NzButtonModule,
    NzMessageModule,
    NzGridModule,
    HomeRoutingModule],
  declarations: [HomeComponent]
})
export class HomeModule {}
