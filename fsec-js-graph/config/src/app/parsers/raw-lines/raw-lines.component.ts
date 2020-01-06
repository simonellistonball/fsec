import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import { ParserState } from '../state/parser.state';
import { RawLinesFileUploaded, RawLinesUpdateFromServer } from '../state/parser.actions';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-raw-lines',
  templateUrl: './raw-lines.component.html',
  styleUrls: ['./raw-lines.component.scss']
})
export class RawLinesComponent implements OnInit {

  @Select(ParserState.getRaw)
  lines: Observable<string[]>;

  editMode = false;
  editorOptions = {theme: 'vs-dark', language: 'text/plain'};
  code: string;

  isLoading = false;
  optionList: string[];

  constructor(private store: Store, private ngZone: NgZone, private msg: NzMessageService) { }

  ngOnInit() {
  }

  sourceSearch(searchEvent) {
    this.store.dispatch(new RawLinesUpdateFromServer(searchEvent));
  }

  handleUpload({ file, fileList }: { [key: string]: any }) {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      this.msg.success(`${file.name} file uploaded successfully.`);
      this.store.dispatch(new RawLinesFileUploaded());
    } else if (status === 'error') {
      this.msg.error(`${file.name} file upload failed.`);
    }
  }

}
