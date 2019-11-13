import { PipeTransform, Pipe } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({ name: 'joincomma' })
export class JoinComma implements PipeTransform {
  transform(values: object[], key: string = 'name') {
    if (!values) {
      return '';
    }
    values = values.map(v => v[key]);
    return values.join(', ');
  }
}


@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  constructor(protected sanitizer: DomSanitizer) { }

  public transform(value: any, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    switch (type) {
      case 'html': return this.sanitizer.bypassSecurityTrustHtml(value);
      case 'style': return this.sanitizer.bypassSecurityTrustStyle(value);
      case 'script': return this.sanitizer.bypassSecurityTrustScript(value);
      case 'url': return this.sanitizer.bypassSecurityTrustUrl(value);
      case 'resourceUrl': return this.sanitizer.bypassSecurityTrustResourceUrl(value);
      default: throw new Error(`Invalid safe type specified: ${type}`);
    }
  }
}

@Pipe({
  name: 'replace'
})
export class ReplacePipe implements PipeTransform {

  public transform(value: string, predecessor: string, replacement: string, regex: boolean = true) {
    if (regex) {
      return value.replace(new RegExp(predecessor, 'g'), replacement);
    }
    return value.replace(predecessor, replacement);
  }
}
