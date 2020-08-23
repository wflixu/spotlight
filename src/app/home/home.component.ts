import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ElectronService } from 'app/core/services';
import { PathLike } from 'fs';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  value: string;
  userName: string;
  targetPath: string;
  constructor(
    private router: Router,
    private electronService: ElectronService,
    private message: NzMessageService
  ) {}
  ngOnInit(): void {}
  onClick(): void {
    console.log(this.userName);
    if (!this.userName) {
      this.message.create('error', `请输入计算机名`);
      return;
    }

    if (!this.targetPath) {
      this.targetPath = `C:\\Users\\${this.userName}\\Desktop\\spotlight\\`;
      this.message.create('warn', `文件保存在：${this.targetPath}`);
    }
    this.work();
  }
  work(): void {
    const sourcePath =
    `C:\\Users\\${this.userName}\\AppData\\Local\\Packages\\Microsoft.Windows.ContentDeliveryManager_cw5n1h2txyewy\\LocalState\\Assets\\`;
    this.electronService.fs.readdir(sourcePath, (err, files) => {
      if (err) {
        console.log(err);
        return;
      }
      files.forEach((file: string) => {
        const stats = this.electronService.fs.statSync(
          (sourcePath + file) as PathLike
        );
        if (stats.size > 300000) {
          console.log(stats.mtime.toISOString());
          this.electronService.fs.copyFileSync(
            sourcePath + file,
            this.targetPath + file
          );
          this.electronService.fs.rename(
            this.targetPath + file,
            this.targetPath + String(stats.mtime.getTime()) + '.jpg',
            (err) => {
              if (err) throw err;
              console.log('重命名完成');
            }
          );
        }
      });
    });
  }
}
