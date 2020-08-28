import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ElectronService } from 'app/core/services';
import { PathLike } from 'fs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  value: string;
  userName: string;
  targetPath: string;
  start:Date;
  constructor(
    private router: Router,
    private electronService: ElectronService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {}

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

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
        console.log(file);

        const stats = this.electronService.fs.statSync(
          (sourcePath + file) as PathLike
        );
        if (stats.size > 300000&& this.start && this.start.getTime() < stats.mtime.getTime()) {
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
