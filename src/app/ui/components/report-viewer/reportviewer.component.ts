import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {DomSanitizer, SafeHtml, SafeResourceUrl} from '@angular/platform-browser';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'cm-report-viewer',
  template: `
    <div class="iframe-container">
      <h3>Report Viewer</h3>
      @if(reportHtml) {
        <div [innerHTML]="reportHtml"></div>

        <!--{{sanitizer.bypassSecurityTrustHtml(reportHtml)}}-->


      }
    </div>
  `,
  styles: [`

  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class ReportViewerComponent implements OnChanges {

  @Input() reporturl: string;
  @Input() reportserver: string;
  @Input() showparameters?: string = "false";
  @Input() parameters?: any;
  @Input() language?: string = "en-us";
  @Input() width?: number = 100;
  @Input() height?: number = 100;
  @Input() toolbar?: string = "true";

  @Output('error') onError = new EventEmitter<any>();

  constructor(public sanitizer: DomSanitizer, private http: HttpClient, private cdr: ChangeDetectorRef) {
  }


  source: SafeResourceUrl;
  reportHtml: SafeHtml;

  ngOnChanges(changes: SimpleChanges) {
    if (!this.reporturl) {
      this.onError.emit("Src cannot be null");
    }

    if ('reporturl' in changes) {
      //this.source = this.sanitizer.bypassSecurityTrustResourceUrl(this.buildReportUrl());
      this.getReport().subscribe(
        (response: any) => {
          console.log(response)
          this.reportHtml = this.sanitizer.bypassSecurityTrustHtml(response.htmlContent);
          this.cdr.detectChanges(); // Trigger change detection
          //this.reportHtml = response.htmlContent;
        }
      );
    }
  }

  getReport() {
    return this.http.get(this.reporturl);
  }

  public buildParameterString(): string {

    var parameterString = "";

    for (var param in this.parameters) {
      if (param) {
        if (this.parameters[param] instanceof Array === true) {
          for (var arrayParam in this.parameters[param]) {
            if (arrayParam) {
              parameterString += "&" + param + "=" + this.parameters[param][arrayParam];
            }
          }
        }
        if (this.parameters[param] != null && this.parameters[param] instanceof Array === false) {
          parameterString += "&" + param + "=" + this.parameters[param];
        }
        if (this.parameters[param] == null) {
          parameterString += "&" + param + ":isnull=true";
        }
      }
    }
    return parameterString;
  }

  public buildReportUrl(): string {
    if (!this.reporturl) {
      return;
    }
    var parameters = this.buildParameterString();
    return this.reportserver + '?/'
      + this.reporturl + '&rs:Embed=true'
      + '&rc:Parameters=' + this.showparameters
      + parameters
      + '&rs:ParameterLanguage=' + this.language + "&rc:Toolbar=" + this.toolbar;
  }
}