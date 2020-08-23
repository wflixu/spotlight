import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ElectronService } from 'app/core/services';
import { PathLike } from 'fs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private electronService: ElectronService
  ) {}

  ngOnInit(): void {}

  test(): void {
    console.log('!!!!!!!!!!');
    const sourcePath =
      'C:\\Users\\lx\\AppData\\Local\\Packages\\Microsoft.Windows.ContentDeliveryManager_cw5n1h2txyewy\\LocalState\\Assets\\';
    const targetPath = 'C:\\Users\\lx\\Desktop\\spotlight\\';
    // const sourcePath = './target/';
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
            targetPath + file
          );
          this.electronService.fs.rename(
            targetPath + file,
            targetPath + String(stats.mtime.getTime()) + '.jpg',
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
